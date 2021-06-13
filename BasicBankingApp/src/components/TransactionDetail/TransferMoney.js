import React, {useState, useContext} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {primary} from '../../themes/themes';
import {Context as CustomerContext} from '../../context/CurrentCustomerContext';

const TransferMoney = ({navigation}) => {
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');

  const minAmount = 10;

  const {
    getAmount,
    state: {sender},
  } = useContext(CustomerContext);

  const reset = () => {
    setModalVisible(!modalVisible);
    setAmount('');
    setError('');
  };

  const helper = () => {
    if (amount && amount >= minAmount && amount <= sender.balance) {
      getAmount(amount);
      navigation.navigate('Customers');
      reset();
    } else {
      setError(`Amount in between ${minAmount} - ${sender.balance}`);
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text h4 style={styles.modalText}>
              Transfer Amount
            </Text>
            <Input
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder={`Amount in between ${minAmount} - ${sender.balance}`}
              selectionColor={primary}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.okCancelBtnContainer}>
              <Pressable style={styles.okCancelButton} onPress={reset}>
                <Text style={styles.okCancelText}>Cancel</Text>
              </Pressable>

              <Pressable style={styles.okCancelButton} onPress={helper}>
                <Text style={styles.okCancelText}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Button
        iconRight
        raised
        buttonStyle={styles.transferButton}
        title="Transfer Amount"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transferButton: {
    marginHorizontal: 15,
    marginTop: 30,
    backgroundColor: primary,
    paddingVertical: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  okCancelBtnContainer: {flexDirection: 'row', alignSelf: 'flex-end'},
  okCancelButton: {backgroundColor: 'transparent', marginHorizontal: 15},
  okCancelText: {color: primary, fontSize: 18},
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
    marginBottom: 25,
    textAlign: 'center',
    color: primary,
  },
  error: {
    color: primary,
    marginBottom: 30,
  },
});

export default TransferMoney;
