import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import colors from '../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PanoramaView} from '@lightbase/react-native-panorama-view';

const {width, height} = Dimensions.get('window');

export default function ImageInterior360({navigation, params}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Image')}>
          <Text style={styles.buttonText}>Exterior 360</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonActive]}>
          <Text style={styles.buttonText}>Interior 360</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Images</Text>
        </TouchableOpacity>
      </View>

      <PanoramaView
        style={{height: 230}}
        dimensions={{height: 230, width}}
        inputType="mono"
        enableTouchTracking
        imageUrl="https://images.pixexid.com/ltx1q23-a-car-parked-in-a-parking-lot.jpeg?w=1300&dpr=2.0"
      />
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
