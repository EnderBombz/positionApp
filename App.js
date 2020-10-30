import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { ProgressBar, Colors, Button } from 'react-native-paper'


export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  return (
    <View style={styles.sensor}>

      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={_toggle} style={styles.button}>
          Pausar
  </Button>
 <Button mode="contained" onPress={_slow} style={styles.button}>
          Lento
  </Button>
   <Button mode="contained" onPress={_fast} style={styles.button}>
          Rapido
  </Button>

      </View>
      <View>
        <Text style={styles.text}>X</Text>
        <ProgressBar progress={round(x)} color={Colors.red800} style={styles.barra} />
        <Text style={styles.text}>Y</Text>
        <ProgressBar progress={round(y)} color={Colors.green800} style={styles.barra} />
        <Text style={styles.text}>Z</Text>
        <ProgressBar progress={round(z)} color={Colors.ble800} style={styles.barra} />

      </View>

    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5C89F0',
    padding: 2,
    margin: 5,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  barra: {
    margin: 20,
    height: 8,
  }
});
