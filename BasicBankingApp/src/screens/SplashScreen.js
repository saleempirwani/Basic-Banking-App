import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {primary, secondary} from '../themes/themes';
import logo from '../assets/logo.png';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 100, height: 100}} />
      <Text
        h3
        style={{color: primary, marginVertical: 10, alignSelf: 'center'}}>
        Basic Banking App
      </Text>

      <View style={{marginTop: 20, position: 'absolute', bottom: 25}}>
        <Text style={{color: 'gray', marginBottom: 10, alignSelf: 'center'}}>
          Created By
        </Text>
        <Text style={{color: primary, alignSelf: 'center'}}>
          Muhammad Saleem Raza
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondary,
  },
});

export default SplashScreen;
