import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';




export function DeseasePresentation ({desease, retakePicture, getExperts}) {

    
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            width: "100%",
            height: "100%"
        }}>
            <Text style={{
                color: '#14274e',
                fontWeight: 'bold',
                fontSize: 20,
                top:'25%'
            }}>
                {desease.name}
            </Text>
            <Text style={{
                color: '#14274e',
                fontSize: 16,
                textAlign: 'justify',
                borderWidth: 0,
                top:'35%'
            }}>
                {desease.desc}
            </Text>

            
            <View style={{
                flex: 1,
                padding: 15,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity
                        onPress={retakePicture}
                        style={{
                        width: 160,
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
                        onPress={getExperts}
                        style={{
                        width: 160,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        backgroundColor: '#14274e'
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 20}}> Find an expert </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}