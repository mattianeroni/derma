import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';


export function Home ({startCamera}) {

    return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        
          <Text style={{
                color: '#14274e',
                fontWeight: 'bold',
                fontSize: 30,
                position:'absolute', 
                top:'25%'
          }}>
            Derma
          </Text>
          <TouchableOpacity
            onPress={startCamera}
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

          <Text style={{
                color: '#14274e',
                position:'absolute', 
                bottom:'15%'
          }}>
            Explore your skin
          </Text>
        </View>
    );
}