import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Icon} from 'react-native-elements';
import {primary} from '../themes/themes';

const CustomerDetail = ({detail}) => {
  return (
    <Card>
      <View style={styles.customerDetail}>
        <Icon
          iconStyle={{marginRight: 15}}
          name={detail.icon}
          type={detail.type}
          size={25}
          color={primary}
        />
        <Text style={styles.detailText}>{detail.name}</Text>
      </View>
    </Card>
  );
};

export default CustomerDetail;

const styles = StyleSheet.create({
  detailText: {fontSize: 20, alignContent: 'center', display: 'flex'},
  customerDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
