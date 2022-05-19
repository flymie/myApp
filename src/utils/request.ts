import Taro, { request as taroRequest } from '@tarojs/taro';
import { stringify } from 'qs';

const SERVER = process.env.NODE_ENV === 'production'
  ? ''
  : '';

type Options<U extends string | Record<string, any> | ArrayBuffer = any> = Omit<taroRequest.Option<U>, 'method'> & {
  alertMessage?: string;
  alertTitle?: string;
  withoutToken?: boolean;
  noAlert?: boolean;
  needConfirm?: boolean;
};

type IResponse<T = any> = {
  code: 200 | 500 | 401 | 600;
  msg: string;
  result: T;
};

export const alertError = (msg?: string, title?: string, needConfirm?: boolean) => {
  if (!msg) return;

  if (!title && !needConfirm) return Taro.showToast({ title: msg, icon: 'none', duration: 1500 });

  // console.log(msg, title, needConfirm);

  Taro.showModal({
    title: title || '',
    content: msg,
    showCancel: false,
    confirmText: '确认',
    confirmColor: '#d9001b',
  });
};

type RequestResponse<T> = Promise<T> & { abort: () => void };

function request<T>(method: 'POST' | 'GET', options: Options): RequestResponse<T> {
  const { url, header, withoutToken, noAlert, needConfirm } = options;
  return taroRequest<IResponse<T>, any>({
    timeout: 30000,
    ...options,
    data: JSON.stringify(options.data),
    method,
    url: `${SERVER}/${url}`,
    header: {
      ...header,
    },
  })
    .then(rs => {
      if (rs.statusCode >= 300 || rs.statusCode < 200) {
        Taro.showToast({ title: '网络错误，请稍后重试。', icon: 'none' });
        throw rs;
      }

      const { code, msg, result } = rs.data;

      if (code !== 200) {
        noAlert || alertError(options.alertMessage || msg, options.alertTitle, needConfirm);
        throw rs;
      }

      console.log(url, options, rs.data);

      return result;
    })
    .catch(async e => {
      console.error(url, options, e);
      if (e.statusCode === 401 || e.status === 401) {
        // TODO: 授权失效
        // Taro.showToast({ title: '用户授权失效，请重新登录', icon: 'none', duration: 1500 });
        // await sleep(1500);

        Taro.clearStorage();

        const pages = Taro.getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const { route, options } = currentPage;

        Taro.reLaunch({ url: `/pages/login/index?redirectUrl=${route}&${stringify(options)}` });

      }
      throw e;
    }) as any;

}

export const requestBlob = (method: 'POST' | 'GET', options: Options) => {
  const { url, header, withoutToken, noAlert } = options;
  return taroRequest<any, any>({
    timeout: 30000,
    ...options,
    method,
    url: `${SERVER}/${url}`,
    header: {
      ...header,
    },
    responseType: 'arraybuffer',
    dataType: 'base64',
  })
    .then(async (rs) => {
      // console.log(rs);
      if (rs.statusCode >= 300 || rs.statusCode < 200) {
        Taro.showToast({ title: '网络错误，请稍后重试。', icon: 'none' });
        throw rs;
      }

      // 钉钉是小写
      if ((rs.header['Content-Type'] || rs.header['content-type'])?.includes('application/json')) {
        const { msg } = rs.data;
        noAlert || alertError(options.alertMessage || msg, options.alertTitle);
        throw rs;
      }

      return rs;
    })
    .catch(async e => {
      if (e.statusCode === 401 || e.status === 401) {
        // TODO: 授权失效
        Taro.showToast({ title: '用户授权失效，请重新登录', icon: 'none', duration: 1500 });
        // await sleep(1500);
        Taro.clearStorage();
        Taro.navigateTo({ url: '/pages/login/index' });
      }
      throw e;
    }) as any;
};

type UploadFileType = {
  filePath: string;
  watermark?: boolean;
  type?: string;
  imageSource?: 'PHOTOSHOOT' | 'ALBUM' | 'COMPANY_WATER_MK';
  returnAll?: boolean;
};

export const uploadFile = ({ filePath, watermark = false, type = 'image', imageSource = 'PHOTOSHOOT', returnAll = false }: UploadFileType) => Taro.uploadFile({
  url: type === 'video' ? `${SERVER}/file/uploadVideo?imageSource=${imageSource}` : `${SERVER}/file/uploadImage?imageSource=${imageSource}&watermark=${watermark}`,
  filePath,
  name: 'file',
  // @ts-ignore
  fileType: type, // 钉钉从非必填改为必填
})
  .then(rs => {
    if (rs.statusCode >= 300 || rs.statusCode < 200) {
      Taro.showToast({ title: '网络错误，请稍后重试。', icon: 'none' });
      throw rs;
    }

    const { code, msg, result } = JSON.parse(rs.data) as IResponse<{ id: string; url: string }>;

    if (code !== 200) {
      Taro.showToast({ title: msg, icon: 'none' });
    }

    if (imageSource === 'COMPANY_WATER_MK') return result;

    if (returnAll) {
      return result;
    }
    return result.url;
  })
  .catch(e => {
    if (e.statusCode === 401 || e.status === 401) {
    // TODO: 授权失效
    // Taro.showToast({ title: '用户授权失效，请重新登录', icon: 'none', duration: 1500 });
    // await sleep(1500);
    }
    throw e;
  });

export default {
  post: <T = any>(url: string, options?: Omit<Options, 'url'>) => request<T>('POST', { url, ...options }),
  get: <T = any>(url: string, options?: Omit<Options, 'url'>) => request<T>('GET', { url, ...options }),
  getBlob: (url: string, options?: Omit<Options, 'url'>) => requestBlob('GET', { url, ...options }),
};
