import React , {Component} from 'react';
import Header from '../src/components/Header';
import Container from '../src/components/Container';
import Login from '../src/components/login';
import SignUp from '../src/components/signup';
import './style/App.scss'
import './style/LoginReg.scss'

class App extends Component  {
   

state = 
  {
  LoginToggle:'Register',
  LoginSucceed:false
  }

  // Change State Login\Register for required component view on the screen
LoginToggle() 
  {
    this.state.LoginToggle == 'Login' ? 
    this.setState({LoginToggle: 'Register'}) :
    this.setState({LoginToggle: 'Login'})
    }

// Flag for permit access to the next page
  LoginListener = () =>
    {
    this.setState({LoginSucceed:true})
    }

  
  LoginRegister() { return( 
  <div>
   {this.state.LoginToggle=='Register'? 
  <Login login={this.LoginListener}/> : 
  <SignUp/>}
  <button className="button button-block" onClick={this.LoginToggle.bind(this)}>{this.state.LoginToggle}</button>
   </div>);
   }

  Itunes() { return( <div> <Header /> <Container /> </div>);}
  
  render() { return (
    <div>
     {this.state.LoginSucceed? this.Itunes() :this.LoginRegister()}
    </div>
  );
  }
};

export default App;
