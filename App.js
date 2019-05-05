import React from 'react';
import { Text, View } from 'react-native';
import SignIn from "./src/SignIn.js";
import Meteor, {createContainer, Accounts} from 'react-native-meteor';

const SERVER_URL = "ws://localhost:3000/websocket";

class App extends React.Component 
{
  state = 
  {
    CurrentScreen : "",
  };

  signIn = (email, password) =>
  {
    Meteor.loginWithPassword(email,password,(error, data) => 
    {
      if(error)
      {
        //Creating new user
        if(error.reason === "User not found")
        {
          console.log("There is no Email Found");
          Accounts.createUser({email,password}, (error) => 
          {
            console.log(error);
          });
        }
      }
      else
      {
        console.log("Email Found");
        // TODO Sign In
      }
    });
    console.log(Meteor.userId());
  }

  render() 
  {
    return (
      <View style={style.Container}>
        <SignIn signIn = {this.signIn}/>
      </View>
    );
  }
}

const style = 
{
  Container: 
  {
    flex: 1,
    backgroundColor: '#FFF',
  },
};

export default App;