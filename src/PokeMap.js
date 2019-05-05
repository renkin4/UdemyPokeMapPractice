import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Header, Left, Button, Icon, Body, Title, Right, Fab } from "native-base";
import { MapView } from "expo";
import Meteor, {createContainer} from "react-native-meteor";

var mapStyle =
[
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c1fcb8"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#e0ffd3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#41ff82"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "-20"
            },
            {
                "saturation": "-67"
            },
            {
                "gamma": "1.32"
            },
            {
                "color": "#57aa9f"
            },
            {
                "weight": "2.00"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "1.00"
            },
            {
                "color": "#f1ff8a"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "weight": "2.12"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#4c98a8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4c98a8"
            },
            {
                "weight": "2.63"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f1ff8a"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            },
            {
                "color": "#1b89d9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1b87d9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

class PokeMap extends React.Component
{
    state = 
    {
        isReady: false,
        location : 
        {
            latitude: 3.049806,
            longitude: 101.429415,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    } 
    async componentWillMount() 
    {
        await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({isReady:true})
    }

    recordEvent = (loc) =>
    {
        console.log(loc);
        this.setState({location : loc});
    }

    render()
    {
        if (!this.state.isReady) 
        {
            return <Expo.AppLoading />;
        }
        return(
            <View style = {{flex : 1}}>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title> PokeMap </Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name = "power"/>
                        </Button>
                    </Right>
                </Header>
                <MapView
                    style ={{flex : 1}}
                    initialRegion= {this.state.location}
                    provider = {MapView.PROVIDER_GOOGLE}
                    customMapStyle = {mapStyle}
                    onRegionChangeComplete = {(loc) => this.recordEvent(loc)}
                >
                </MapView>
                <Fab
                    direction = "left"
                    position = "bottomRight"
                    style = {{backgroundColor : 'green'}}
                >
                    <Icon name = "add"/>
                </Fab>

                <Fab
                    direction = "right"
                    position = "bottomLeft"
                    style = {{backgroundColor : 'red'}}
                >
                    <Icon name = "remove"/>
                </Fab>
            </View>
        )
    }
}

export default PokeMap;