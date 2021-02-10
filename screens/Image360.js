import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import Image360Viewer from '@hauvo/react-native-360-image-viewer';
import colors from '../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const images = [
  require('../images/iris-1.jpg'),
  require('../images/iris-2.jpg'),
  require('../images/iris-3.jpg'),
  require('../images/iris-4.jpg'),
  require('../images/iris-5.jpg'),
  require('../images/iris-6.jpg'),
  require('../images/iris-7.jpg'),
  require('../images/iris-8.jpg'),
  require('../images/iris-9.jpg'),
  require('../images/iris-10.jpg'),
  require('../images/iris-11.jpg'),
  require('../images/iris-12.jpg'),
  require('../images/iris-13.jpg'),
  require('../images/iris-14.jpg'),
  require('../images/iris-15.jpg'),
  require('../images/iris-16.jpg'),
  require('../images/iris-17.jpg'),
  require('../images/iris-18.jpg'),
  require('../images/iris-19.jpg'),
  require('../images/iris-20.jpg'),
  require('../images/iris-21.jpg'),
  require('../images/iris-22.jpg'),
  require('../images/iris-23.jpg'),
  require('../images/iris-24.jpg'),
  require('../images/iris-25.jpg'),
  require('../images/iris-26.jpg'),
  require('../images/iris-27.jpg'),
  require('../images/iris-28.jpg'),
  require('../images/iris-29.jpg'),
  require('../images/iris-30.jpg'),
  require('../images/iris-31.jpg'),
  require('../images/iris-32.jpg'),
  require('../images/iris-33.jpg'),
  require('../images/iris-34.jpg'),
  require('../images/iris-35.jpg'),
  require('../images/iris-36.jpg'),
].reverse();
export default function Image360({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.button, styles.buttonActive]}>
          <Text style={styles.buttonText}>Exterior 360</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ImageInterior')}>
          <Text style={styles.buttonText}>Interior 360</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Images</Text>
        </TouchableOpacity>
      </View>
      <Image360Viewer srcset={images} width={width} height={height / 3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  buttonActive: {
    backgroundColor: '#A9B1F9',
    borderColor: 'transparent',
  },
});
