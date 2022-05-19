import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import { GenName } from '@/class/Names';

import './index.less';

type Props = Pick<GenName, 'name' | 'sentence'>;

const Index: FC<Props> = ({ name, sentence }) => {
  const strs = sentence.split('');

  return (
    <View>
      「
      {
        strs.map((v) => {
          if (name?.includes(v)) {
            return <Text className="text-lg font-black">{v}</Text>;
          } 
          return v;
        })
      }
      」
    </View>
  );
};

export default Index;
