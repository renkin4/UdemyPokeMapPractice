import React from 'react';
import { Text, View } from 'react-native';
import SignIn from "./src/SignIn.js";
import Meteor, {createContainer, Accounts} from 'react-native-meteor';
import PokeMap from "./src/PokeMap.js";

const SERVER_URL = "ws://192.168.0.102:3000/websocket";

class App extends React.Component 
{
  state = 
  {
    loggedIn : false,
  };

  componentWillMount()
  {
    Meteor.connect(SERVER_URL);

    if(Meteor.userId())
    {
      this.flipLogIn(true);
    }
  }

  flipLogIn = (bLoggedIn) =>
  {
    this.setState({loggedIn : bLoggedIn});
  }

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
            console.log("Error : " + error);
          });
        }
      }
      else
      {
        console.log("Email Found");
        this.flipLogIn(true);
      }
    });
    console.log(Meteor.userId());
  }

  renderView = () => 
  {
    if(!this.state.loggedIn)
    {
      return(
        <SignIn signIn = {this.signIn} />
      )
    }
    else
    {
      return(
        <PokeMap flipLogIn = {this.flipLogIn}/>
      )
    }
  }

  render() 
  {
    return (
      <View style={style.Container}>
        {this.renderView()}
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