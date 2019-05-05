import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Form, Item, Label, Input, Button } from "native-base";

var MyBackground = require("../assets/icons/landing.jpg");

class SignIn extends React.Component
{
    state = 
    {
        email : "",
        password : "",
    }

    logIn = () => 
    {
        var email = this.state.email;
        var password = this.state.password;

        this.props.signIn(email,password);
    }

    render() 
    {
        return (
        <View style = {{flex : 1}}>
            <ImageBackground  source={MyBackground} style = {style.BackgroundImage}>
                <View style = {style.InputStyle}>
                    <Form>
                        <Item floatingLabel>
                            <Label> Email </Label>
                            <Input 
                                autoCorrect = {false}
                                onChangeText = {(e) => this.setState({email : e})}
                            />
                        </Item>
                        
                        <Item floatingLabel>
                            <Label> Password </Label>
                            <Input 
                                autoCorrect = {false}
                                onChangeText = {(p) => this.setState({password : p})}
                                secureTextEntry
                            />
                        </Item>
                    </Form>
                    <View style = {{marginTop : 10}}>
                        <Button
                            primary
                            block
                            onPress = {this.logIn}
                        >
                            <Text style = {{color : '#FFF'}}>Sign In / Sign Up</Text>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        </View>
        );
    }
}

const style = 
{
    BackgroundImage : 
    {
        flex : 1,
        resizeMode : 'cover',
        width : '100%',
        height : '100%',
    },

    InputStyle :
    {
        flex : 1,
        flexDirection : 'column',
        margin : 15,
        justifyContent : 'center',
    },
}

export default SignIn;