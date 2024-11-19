import logo from './logo.svg';
import './App.css';
import { FirstComponent } from './components/firstComponent';
import { Login } from './components/Login';
import ResetPassword from './components/resetPassword';
import { useState } from 'react';
import { Home } from './components/Home';


function App() {

  const [user, setUser] = useState([])

  return (
    <div className="App">

      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo"></img> */}
        {/* <FirstComponent /> */}
        {
        !user.length > 0
        ?<Login setUser = {setUser}/>
        :<Home/>
      }
      </header>
    </div>
  );
}


export default App;
