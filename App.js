import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera} from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === 'granted');
    })();

    (async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHaspermission(status === 'granted');
    })();
  }, []);

  if(hasPermission === null){
    return <View/>
  }

  if(hasPermission === false){
    return <Text>Acesso negado!</Text>
  }

 async function takePicture(){
  if(camRef){
    const data = await camRef.current.takePictureAsync();
    setCapturedPhoto(data.uri);
    setOpen(true);
    console.log(data);
  }
 }

 async function savePincture(){
  const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
  .then(()=> {
    alert('Salva com sucesso!');
  })
  .catch(error => {
    console.log('err', error);
  })
 }

  return (
   <SafeAreaView style={styles.container}>
      <Camera
        style={{flex: 1}}
        type={type}
        ref={camRef}
      >
    
      </Camera>

      <TouchableOpacity style = {styles.button} onPress={ takePicture }>
        <FontAwesome name="camera" size={23} color="#fff"/>
      </TouchableOpacity>

      { capturedPhoto &&
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
            
            <View style={{margin: 10, flexDirection: 'row'}}>
            <TouchableOpacity style={{ margin: 10}} onPress={ () => setOpen(false) }>
              <FontAwesome name="window-close" size={50} color="#FF0000"/>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 10}} onPress={ savePincture }>
              <FontAwesome name="upload" size={50} color="#121212"/>
            </TouchableOpacity>
            </View>

            <Image
              style={{ width: '100%', height: 450, borderRadius: 20}}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      }

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
  }
});
