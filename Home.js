import React from 'react';
import { StyleSheet,
  Image,
  Button,
  Alert,
  Text,
  View 
} from 'react-native';

export default function Home({ navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.imagem} source={require('./logo_sampa.png')}/>
      <Button 
      title="ENTRAR"
      onPress={ () => navigation.navigate('Camera')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem:{
    width:200,
    height: 200
  }

});