import React from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Camera} from 'expo-camera';

import {CameraPreview} from './src/screens/CameraPreview';
import {styles} from './src/screens/Styles';


export default function App() {

  let camera;

  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState('off');
  const [desease, setDisease] = React.useState(null);

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted')
      setStartCamera(true);
    else 
      Alert.alert('Access to camera denied.');
  }


  const __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    //setStartCamera(false);
    setCapturedImage(photo);
  }


  const __savePhoto = async (image) => {
    await fetch( "http://192.168.0.10:8000" ,{
       method:'POST',
       headers: {
        'Accept':'application/json',
        'Content-Type': "multipart/form-data",
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Origin':'*',
        'crossDomain': 'true'
       },
       //body: JSON.stringify({image})
     }) 
      .then((res) => res.json())
      .then((res) => {
        console.log(JSON.stringify(res));
        //if(res.status == 200)
        //  console.log(JSON.stringify(res));
    })
    .catch((error) => {
        //console.log(JSON.stringify(error.message));
        Alert.alert('Server Error.');
        //throw error;
      });


  }


  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  }


  const __handleFlashMode = () => {
    if (flashMode === 'on')
      setFlashMode('off');
    else if (flashMode === 'off')
      setFlashMode('on');
    else 
      setFlashMode('auto');
  }


  const __switchCamera = () => {
    if (cameraType === 'back')
      setCameraType('front');
    else
      setCameraType('back');
  }


  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={() => __savePhoto(capturedImage)} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: 0.5,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: 50,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text style={{fontSize: 20}}>
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
