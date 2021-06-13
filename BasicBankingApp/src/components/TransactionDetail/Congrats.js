import React, {useContext, useState} from 'react';
import {StyleSheet, Modal, Pressable, View} from 'react-native';
import {Text, Icon, FAB, Button} from 'react-native-elements';
import {primary} from '../../themes/themes';
import {Context as CustomerContext} from '../../context/CurrentCustomerContext';
import {Context as BankContext} from '../../context/BankContext';
import {TouchableOpacity} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const Congrats = ({navigation, isAllUnSelected, receiver}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {getReceiver, state} = useContext(CustomerContext);
  const bankContext = useContext(BankContext);

  const db = openDatabase({name: 'bank.db', createFromLocation: 1});

  const helper = () => {
    getReceiver(receiver);
    bankContext.getTransactionDetail({...state, receiver});

    const date = new Date().getTime();
    const senderName = state.sender.name;
    const receiverName = receiver.name;
    const amount = state.amount;

    //  ADD TRANSACTION HISTORY INTO APP STATE

    bankContext.addHistory({date, senderName, receiverName, amount});

    // ADD TRANSACTION HISTORY INTO "HISTORY TABLE"
    const INSERT_QUERY =
      'INSERT INTO History (date, senderName, receiverName, amount) VALUES (?, ?, ?, ?)';
    try {
      db.transaction(tx => {
        tx.executeSql(
          INSERT_QUERY,
          [date, senderName, receiverName, amount],
          (tx, results) => {
            if (results.rowsAffected > 0) {
            }
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }

    // GETTING CURRENT BALANCE AFTER TRANSACTION
    const record = [];
    const users = bankContext.state.users;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === state.sender.id) {
        record.push([users[i].balance, users[i].id]);
      } else if (users[i].id === receiver.id) {
        record.push([users[i].balance, users[i].id]);
      }
    }

    // UPDATE TRANSACTION IN DATABASE
    const UPDATE_QUERY = 'UPDATE Bank SET balance=? WHERE id=?';
    try {
      db.transaction(tx => {
        for (let i = 0; i < record.length; i++) {
          tx.executeSql(UPDATE_QUERY, record[i], (tx, results) => {
            if (results.rowsAffected > 0) {
              setModalVisible(!modalVisible);
            }
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="checkcircle"
              type="ant-design"
              size={50}
              color="#4caf50"
            />

            <Text h4 style={styles.modalText}>
              Congrats
            </Text>

            <Text>Money has been successfully transferred</Text>
            <Pressable
              style={styles.okButton}
              onPress={() => {
                navigation.pop();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.okBtnText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {isAllUnSelected() ? (
        <TouchableOpacity
          onPress={() => {
            helper();
          }}
          style={styles.fab}>
          <Icon name="send" type="font-awesome" color="#fff" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  modalText: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#4caf50',
  },
  okButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 5,
  },
  okBtnText: {color: '#fff'},
  fab: {
    padding: 15,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default Congrats;
