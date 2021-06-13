import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as BankContext} from '../context/BankContext';
import {Table, Row, Rows} from 'react-native-table-component';

import {openDatabase} from 'react-native-sqlite-storage';

const TransactionScreen = ({navigation}) => {
  const {
    state: {history},
    addHistoryFromDB,
  } = useContext(BankContext);

  const [loading, setLoading] = useState(true);

  // DATABASE OBJECT CREATION
  const db = openDatabase({name: 'bank.db', createFromLocation: 1});

  // GETTING "HISTORY DATA "FROM DATABASE
  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 250);
    }

    const getHistoryFromDB = async () => {
      const query = 'SELECT * FROM History';
      const hist = [];
      try {
        await db.transaction(tx => {
          tx.executeSql(query, [], (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                hist.push(results.rows.item(i));
              }
              addHistoryFromDB(hist);
            }
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getHistoryFromDB();
  }, []);

  if (loading) {
    return (
      <View style={styles.noHistoryContainer}>
        <ActivityIndicator color="gray" size="large" />
      </View>
    );
  }

  if (!history.length) {
    return (
      <View style={styles.noHistoryContainer}>
        <Text h3 style={styles.noHistoryText}>
          No Transaction History Found
        </Text>
      </View>
    );
  }

  const tableHeader = ['Date', 'Sender', 'Receiver', 'Amount'];
  const tableData = history.map(hist => [
    new Date(hist.date).toLocaleDateString(),
    hist.senderName,
    hist.receiverName,
    hist.amount,
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text h4 style={styles.heading}>
        Transaction History
      </Text>
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHeader} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
      <View style={{marginBottom: 70}} />
    </ScrollView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  heading: {marginBottom: 20, alignSelf: 'center'},
  head: {height: 40, backgroundColor: 'rgba(220,20,60,0.3)'},
  text: {margin: 6, color: '#333'},
  tableBorder: {borderWidth: 2, borderColor: '#333'},
  noHistoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  noHistoryText: {textAlign: 'center', color: 'gray'},
});
