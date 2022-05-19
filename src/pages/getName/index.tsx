import { FC, useState } from 'react';
import { View, Radio, RadioGroup, Label, Text, Input } from '@tarojs/components';
// import { observer, inject } from 'mobx-react';
import { books } from '@/lib';
import Names, { GenName } from '@/class/Names';
import DoSentence from './doSentence';

import './index.less';

const names = new Names();

const Index: FC = () => {
  const [radioVal, setRadioVal] = useState(books[0].value);
  const [surname, setSurName] = useState<string>('赵');
  const [lists, setLists] = useState<GenName[]>([]);

  const getNameFn = (bookName) => {
    names.loadBook(bookName);
    const res = [] as any;

    while(res.length < 10) {
      const temp = names.genName();
      if (temp) {
        res.push(temp);
      }
    }
    
    setLists(res);
  };

  return (
    <View className=" px-4 py-2 flex flex-col h-screen ">
      <View>
        <RadioGroup onChange={({ detail }) => {
          setRadioVal(detail.value);
        }}
        >
          <View className="flex flex-wrap -mx-1">
            {
              books.map((v) => {
                return (
                  <View className="mb-1 w-1_2 px-1 flex-initial " key={v.value}>
                    <Label 
                      className=" bg-primary rounded-sm p-2 flex justify-between items-center "
                    >
                      <View className={`transition-all ${v.value === radioVal ? 'text-white' : ''}`}>
                        {v.name}
                      </View>
                      <View>
                        <Radio color="red" value={v.value} checked={v.value === radioVal} />
                      </View>
                    </Label>
                  </View>
                );
              })
            }
          </View>
        </RadioGroup>
        <View className="border-1 border-solid border-hover my-1"></View>
        <View className="flex items-center py-1">
          <View>姓：</View>
          <View>
            <Input 
              className="border-1 border-solid border-primary rounded-sm px-1"
              placeholder="请输入姓氏"
              maxlength={2} 
              value={surname} 
              onInput={({ detail }) => {
                setSurName(detail.value?.trim());
              }}
            />
          </View>
        </View>
        <View
          className="bg-btnBg p-2 rounded-nm text-center text-white mt-1"
          hoverClass="bg-btnHover"
          onClick={() => {
            getNameFn(radioVal);
          }}
        >
        起名
        </View>
      </View>
      <View className="mt-1 flex-1 flex-shrink-0 overflow-y-auto">
        {
          lists?.map(({ sentence, name, title, author, book, dynasty }) => {
            return (
              <View 
                key={sentence}
                className=" px-1 py-4 bg-primary text-white mb-1 rounded-sm "
              >
                <View className=" text-lg font-bold text-center ">
                  {
                    `${surname}${name}`
                  }
                </View>
                <View className="my-3">
                  <DoSentence
                    sentence={sentence}
                    name={name}
                  />
                </View>
                <View className="flex items-center justify-between ">
                  <View>{book} • {title}</View>
                  <View>[{dynasty}] {author || '佚名'}</View>
                </View>
              </View>
            );
          })
        }
      </View>
    </View>
  );
};

export default Index;
