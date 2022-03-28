import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {MyButton} from '../components/MyButton';
import {MyTextInput} from '../components/MyTextInput';
import {styles} from './styles';

import logo from '../assets/logo.png';
import { useAuth } from '../contexts/Auth';

export function SignInScreen() {
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Image
        resizeMode="contain"
        source={logo}
        style={{width: 100, height: 100}}
      />
      <MyTextInput placeholder="e-mail" value={email} onChangeText={setEmail} />
      <MyTextInput
        placeholder="senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <MyButton onPress={() => signIn(email, password)} title="Entrar no App" />
    </View>
  );
}