import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const bgColor = '#171414';
const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(prevToggle => !prevToggle);

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const handlePhoneShake = RNShake.addListener(() => {
      setToggle(prevToggle => !prevToggle);
    });

    return () => handlePhoneShake.remove;
  }, []);
  const bulb = toggle
    ? require('./assets/bulb_on.png')
    : require('./assets/bulb_off.png');

  const style = StyleSheet.create({
    btnBorder: {
      borderColor: toggle ? 'red' : 'green',
      borderWidth: 1,
    },
    textColor: {
      color: toggle ? 'red' : 'green',
    },
  });

  return (
    <>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      <View style={styles.container}>
        <Image style={styles.img} source={bulb} />
        <TouchableOpacity onPress={handleChangeToggle}>
          <View style={[styles.btn, style.btnBorder]}>
            <Text style={[styles.text, style.textColor]}>
              {toggle ? 'OFF' : 'ON'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgColor,
  },

  btn: {
    backgroundColor: '#000',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 80,

    justifyContent: 'center',
    padding: 5,

    //Its for IOS
    shadowColor: 'white',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,

    // its for android
    elevation: 20,
    position: 'relative',
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  img: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
  },
});
export default App;
