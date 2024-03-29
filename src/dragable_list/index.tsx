import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
type ItemProps = {
  name: string;
  description: string;
  color: string;
};
type DragableList = {
  itemData: ItemProps[];
};
const DragableList = (props: DragableList) => {
  const [listData, setListData] = useState(props.itemData);
  const renderItem = ({item, drag, isActive}: RenderItemParams<ItemProps>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem, {backgroundColor: item.color}]}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.description}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };
  return (
    <DraggableFlatList
      style={{width: '100%'}}
      data={listData}
      onDragEnd={({data}) => setListData(data)}
      keyExtractor={item => item.name}
      renderItem={renderItem}
    />
  );
};

export default DragableList;

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
