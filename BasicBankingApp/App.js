import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Provider as BankProvider} from './src/context/BankContext';
import {Provider as CustomerProvider} from './src/context/CurrentCustomerContext';
import {
  SplashScreen,
  HomeScreen,
  DetailScreen,
  TransactionScreen,
  CustomerListScreen,
} from './src/screens';
import {primary, secondary, dark} from './src/themes/themes';

// Screens Names
const appName = 'Basic Banking App';
const home = 'HOME';
const transactions = 'TRANSACTION HISTORY';
const detail = 'Detail';
const customers = 'Customers';

// Tab Screen Icons
const tabIcons = ({route}) => ({
  tabBarIcon: ({color, size}) => {
    let iconName;

    if (route.name === home) {
      iconName = 'home';
    } else if (route.name === transactions) {
      iconName = 'arrow-swap';
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
});

const options = {
  headerStyle: {backgroundColor: primary},
  headerTintColor: secondary,
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Screen Navigation
const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={tabIcons}
      tabBarOptions={{
        activeTintColor: primary,
        inactiveTintColor: dark,
      }}>
      <Tab.Screen name={home} component={HomeScreen} />
      <Tab.Screen name={transactions} component={TransactionScreen} />
    </Tab.Navigator>
  );
};

const BBA = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name={appName}
            component={TabScreens}
            options={options}
          />
          <Stack.Screen
            name={detail}
            component={DetailScreen}
            options={options}
          />
          <Stack.Screen
            name={customers}
            component={CustomerListScreen}
            options={options}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

// Main Components
function App() {
  return (
    <CustomerProvider>
      <BankProvider>
        <BBA />
      </BankProvider>
    </CustomerProvider>
  );
}

export default App;
