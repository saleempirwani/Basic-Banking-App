import React, {useContext, useEffect} from 'react';
import {FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {Context as BankContext} from '../context/BankContext';
import {Context as CustomerContext} from '../context/CurrentCustomerContext';
import profile from '../assets/profile.png';
// import {getAllCustomersFromDB} from '../database/index';
import {openDatabase} from 'react-native-sqlite-storage';

const HomeScreen = ({navigation}) => {
  // CONTEXT APIs
  const {
    state: {users},
    getAllCustomers,
  } = useContext(BankContext);

  const {getCurrentCustomer} = useContext(CustomerContext);

  // DATABASE OBJECT CREATION
  const db = openDatabase({name: 'bank.db', createFromLocation: 1});

  useEffect(() => {
    const getAllCustomersFromDB = async () => {
      const query = 'SELECT * FROM Bank';
      const customers = [];
      try {
        await db.transaction(tx => {
          tx.executeSql(query, [], (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                customers.push(results.rows.item(i));
              }
              getAllCustomers(customers);
            }
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllCustomersFromDB();
  }, []);

  // List Render Item Sub-Component
  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() => {
        getCurrentCustomer(item);
        navigation.navigate('Detail', {id: item.id});
      }}>
      <Avatar rounded source={profile} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>${item.balance}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={users}
      renderItem={renderItem}
    />
  );
};

export default HomeScreen;
