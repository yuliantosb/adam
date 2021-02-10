import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './screens/DetailsScreen';
import Image360 from './screens/Image360';
import ImageInterior360 from './screens/ImageInterior360';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={DetailsScreen} />
        <Stack.Screen name="Image" component={Image360} />
        <Stack.Screen name="ImageInterior" component={ImageInterior360} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
