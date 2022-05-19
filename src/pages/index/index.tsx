import { FC } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
// import { observer, inject } from 'mobx-react';

import './index.less';

const Index: FC = () => {

  const links = [
    {
      id: 0,
      title: '起名字',
      des: '通过诗句选取，可能有经验，也可能很扯淡。',
      url: '/pages/getName/index',
    },
    {
      id: 0,
      title: '起名字',
      des: '通过诗句选取，可能有经验，也可能很扯淡。',
      url: '/pages/getName/index',
    },
    {
      id: 0,
      title: '起名字',
      des: '通过诗句选取，可能有经验，也可能很扯淡。',
      url: '/pages/getName/index',
    },
    {
      id: 0,
      title: '起名字',
      des: '通过诗句选取，可能有经验，也可能很扯淡。',
      url: '/pages/getName/index',
    },
    {
      id: 0,
      title: '起名字',
      des: '通过诗句选取，可能有经验，也可能很扯淡。',
      url: '/pages/getName/index',
    },
    {
      id: 0,
      title: '起名字',
      des: '通过诗句选取，可能惊艳，也可能很扯淡。',
      url: '/pages/getName/index',
    }
  ];

  return (
    <View className="flex flex-wrap -mx-1 px-4 py-2">
      {
        links.map(({ id, title, des, url }) => {
          return (
            <View key={id} className=" flex-initial w-1_3 px-1 box-border">
              <View 
                className="min-h-40 bg-white p-1 mb-2 shadow-primary shadow-sm border-1 rounded-sm " 
                onClick={() => {
                  Taro.navigateTo({
                    url,
                  });
                }}
              >
                <View className=" text-primary mb-1">
                  {title}
                </View>
                <View className=" text-text-minor">
                  {des}
                </View>
              </View>
            </View>
          );
        })
      }
    </View>
  );
};

export default Index;
