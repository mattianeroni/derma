import React from 'react';
import {Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import {Marker} from "react-native-maps";


export function ExpertsView ({experts, goHome, currentLocation}) {
    const [region, setRegion] = React.useState(currentLocation);

    return (
        <View style={{ 
            flex: 1, 
            width: "100%", 
            height: "100%", 
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <MapView 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: "15%",
                }}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}>
            
                {experts && experts.map((expert, index) => (
                    <Marker key={expert.name} 
                        title={expert.name} 
                        description={ `Address: ${expert.address}  Website: ${expert.website}`} 
                        coordinate={{latitude: expert.latitude, longitude: expert.longitude}} 
                        pinColor={"red"}/>
                ))}
            </MapView>
            
            <View style={{position: 'absolute', bottom: "5%"}}>
                <TouchableOpacity
                    onPress={goHome}
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
                    Home
                    </Text>
                </TouchableOpacity>
                
            </View>

        </View>
    );
}