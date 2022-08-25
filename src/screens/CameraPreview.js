import React from 'react';
import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';

export const CameraPreview = ({photo, retakePicture, savePhoto}) => {
    

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#14274e'
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20}}> NewPicture </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#14274e'
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20}}> Diagnosis </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }