import React from 'react';
import axios from 'axios';
import {View, Alert} from 'react-native';
import {Camera} from 'expo-camera';
import {StatusBar} from 'expo-status-bar';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as Location from 'expo-location';
import {SERVER_URL, AUTHORIZATION_TOKEN} from 'react-native-dotenv';


import {Home, CameraPreview, DeseasePresentation, SkinCamera, ExpertsView} from './src/screens';

export default function App() {

  //let camera;

  const [camera, setCamera] = React.useState(null);
  const [startedCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState('off');
  const [desease, setDisease] = React.useState(null);
  const [experts, setExperts] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);


  const __goHome = () => {
    setCamera(null);
    setStartCamera(false);
    setPreviewVisible(false);
    setCapturedImage(null);
    setDisease(null);
    setExperts(null);
  }


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
    setCapturedImage(photo);
    //setStartCamera(false);
  }


  const __retakePicture = () => {
    setStartCamera(true);
    setDisease(null);
    setExperts(null);
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


  const __savePhoto = async () => {

    /*
    // ---------------------------------------------------------------------------
    // Used just for mockup
    let responseData = {
      name: "Mole",
      desc: "A benign (not cancer) growth on the skin that is formed by a cluster of melanocytes (cells that make a substance called melanin, which gives color to skin and eyes). A mole is usually dark and may be raised from the skin. Also called nevus."
    };

    setDisease(responseData);
    setCapturedImage(null);
    setPreviewVisible(false);
    setStartCamera(false);
    setCamera(null);
    // ---------------------------------------------------------------------------
    */
    
    // Resize image if the communication is slow
    /*
    let resizedImage = await manipulateAsync(
       capturedImage.uri,
       [{ resize: { width: 3024, height: 3024 } }],
       { compress: 0, format: SaveFormat.JPEG, base64: false }
    );
    */

    let data = new FormData();
    data.append("file", {
      uri: capturedImage.uri,
      type: "image/jpeg",
      name: "image.jpeg"
    });

    await axios({
      url    : SERVER_URL,
      method : 'POST',
      data   : data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': AUTHORIZATION_TOKEN,
      }
    })
    .then((res) => {
      let responseData = res.data;
      
      //console.log(JSON.stringify(responseData));
      
      setDisease(responseData);
      setCapturedImage(null);
      setPreviewVisible(false);
      setStartCamera(false);
      setCamera(null);
    })
    .catch((error) => {
     Alert.alert(`Server Error: ${error.message}`);
     //throw error;
   });
  }




  const __getExperts = async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
    let {latitude, longitude} = location.coords;
    setCurrentLocation({latitude, longitude, latitudeDelta: 0.009, longitudeDelta: 0.009}); 
    

    // ---------------------------------------------------------------------------
    // Used just for mockup
    /*setExperts([
      {name: "Luca", address: "Via Paoli, 12", website: "www.luca.it", latitude, longitude },
      {name: "Marco", address: "Via Pinco, 23", website: "www.uaaa.it", latitude: 44.60, longitude: 11.002 }
    ]);*/
    // ---------------------------------------------------------------------------

    
    await axios({
      url    : `${SERVER_URL}/experts`,
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': AUTHORIZATION_TOKEN,
      }
    })
    .then((res) => {
      console.log(res.data);
      setExperts(res.data);
    })
    .catch((error) => {
     Alert.alert(`Server Error: ${error.message}`);
     //throw error;
   });
   
  }

  


  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {desease ? (
        <View style={{ flex: 1, width: '100%' }}>
          {experts ? (
            <ExpertsView experts={experts} goHome={__goHome} currentLocation={currentLocation}/>
          ) : (
            <DeseasePresentation desease={desease} retakePicture={__retakePicture} getExperts={__getExperts}/>
          )}
        </View>
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          {startedCamera ? (
            <View style={{ flex: 1, width: '100%' }}>
              {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={ __savePhoto} retakePicture={__retakePicture} />
              ) : (
                <SkinCamera takePicture={__takePicture} handleFlashMode={__handleFlashMode} switchCamera={__switchCamera} cameraType={cameraType} setCamera={setCamera} flashMode={flashMode} />
              )}
            </View>
          ) : (
            <Home startCamera={__startCamera}/>
          )}
        </View>
      )}
      

      <StatusBar style="auto" />
    </View> 
  );
}
