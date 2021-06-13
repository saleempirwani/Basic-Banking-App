import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {light, primary} from '../themes/themes';
import {Context as BankContext} from '../context/BankContext';
import {Context as CustomerContext} from '../context/CurrentCustomerContext';
import Congrats from '../components/TransactionDetail/Congrats';

function CustomerList({navigation}) {
  const {
    state: {users},
  } = useContext(BankContext);

  const {
    state: {sender},
  } = useContext(CustomerContext);

  const [list, setList] = useState([]);

  let new_users = users.filter(user => user.id !== sender.id);

  const addSelectedItem = () => {
    new_users.map(user => (user['selected'] = false));
    setList([...new_users]);
  };

  useEffect(() => addSelectedItem(), []);

  const [receiver, setReceiver] = useState(null);
  const keyExtractor = (item, index) => index.toString();

  //   Customer Checked Toggle
  const isSelected = (index, item) => {
    const new_list = list.map((lst, i) => {
      let single = true;
      if (index === i) {
        lst.selected = !lst.selected;
        single = lst.selected;
        setReceiver({id: item.id, name: item.name});
      } else {
        lst.selected = !single;
      }
      return lst;
    });
    setList(new_list);
  };

  // VISIBILITY OF SEND BUTTON (fab)
  const isAllUnSelected = () => list.find(l => l.selected);

  return (
    <>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={({item, index}) => (
          <ListItem bottomDivider onPress={() => isSelected(index, item)}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name={item.selected ? 'checkcircle' : 'checkcircleo'}
              color={item.selected ? light : primary}
              type="ant-design"
            />
          </ListItem>
        )}
      />
      <Congrats
        navigation={navigation}
        isAllUnSelected={isAllUnSelected}
        receiver={receiver}
      />
    </>
  );
}

export default CustomerList;
