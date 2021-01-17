import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';

const {height, width} = Dimensions.get('screen');

export default function LoginPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.Container}>
      <View style={styles.Content}>
        <Image
          resizeMode="contain"
          style={{width: width - 50}}
          source={require('../../assets/logo.png')}
        />
        <Button
          info
          block
          style={styles.Button}
          onPress={() => navigation.navigate('Empresa')}>
          <Text style={styles.Text}>Acessar como Empresa</Text>
        </Button>
        <Button
          info
          block
          style={styles.Button}
          onPress={() => navigation.navigate('Aluno')}>
          <Text style={styles.Text}>Acessar como Aluno</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height,
    marginHorizontal: 20,
  },
  Content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  Button: {
    marginVertical: 10,
  },
  Text: {
    fontSize: 20,
    color: '#FFF',
  },
});
