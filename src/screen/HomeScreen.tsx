import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { MyButton } from '../components/MyButton';
import { styles } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Essa tela só pode ser vista por usuários autenticados
      </Text>
      <MyButton
        title="Ir para Configurações"
        onPress={() => navigation.navigate('Settings')}
      />
      <Text>
        by <Text style={styles.coffText}>Coffstack</Text>
      </Text>
    </View>
  );
}

export default Home;