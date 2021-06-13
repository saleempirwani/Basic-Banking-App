import React, {useContext} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Image} from 'react-native-elements';

import {Context} from '../context/BankContext';
import {secondary} from '../themes/themes';
import {CustomerDetail, TransferMoney} from '../components';
import profile from '../assets/profile.png';

// Main Component
const DetailScreen = ({route, navigation}) => {
  const id = route.params.id;

  const {
    state: {users},
  } = useContext(Context);

  const item = users.find(user => user.id === id);

  const details = [
    {icon: 'envelope', name: item.email, type: 'font-awesome'},
    {icon: 'phone', name: item.phoneno, type: 'font-awesome'},
    {icon: 'account-balance', name: item.accno, type: 'material'},
    {icon: 'dollar', name: item.balance + ' dollars', type: 'font-awesome'},
  ];

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* Customer Image and Name */}
        <Image style={styles.image} resizeMode="contain" source={profile} />
        <Text h4 style={styles.name}>
          {item.name.toUpperCase()}
        </Text>

        {/* Customer Detail  */}
        <View style={styles.detail}>
          {details.map((detail, index) => (
            <CustomerDetail detail={detail} key={index} />
          ))}
        </View>

        <TransferMoney navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: secondary,
    paddingVertical: 30,
  },
  image: {
    width: '100%',
    height: 70,
    marginBottom: 10,
    borderRadius: 35,
  },
  detail: {marginTop: 10, marginBottom: 10},
  name: {alignSelf: 'center', marginTop: 5},
});
