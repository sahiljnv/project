import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import {LIST_DATA} from '../utils';
import DragableList from '../dragable_list';

const DragableNestedList = () => {
  type ItemProps = {
    name: string;
    description: string;
    color: string;
    itemList: {
      name: string;
      description: string;
      color: string;
    }[];
  };
  const [listData, setListData] = useState(LIST_DATA);

  const RenderItem = ({item, drag, isActive}: RenderItemParams<ItemProps>) => {
    const [isExpand, setExpand] = useState(false);
    return (
      //   <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        onPress={() => setExpand(!isExpand)}
        style={[
          styles.rowItem,
          {
            backgroundColor: item.color,
            height: isExpand ? 500 : 100,
            paddingVertical: isExpand ? 50 : 0,
          },
        ]}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        {isExpand ? <DragableList itemData={item.itemList} /> : <></>}
      </TouchableOpacity>
      //   </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={listData}
      onDragEnd={({data}) => setListData(data)}
      keyExtractor={item => item.name}
      renderItem={RenderItem}
    />
  );
};

export default DragableNestedList;

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
