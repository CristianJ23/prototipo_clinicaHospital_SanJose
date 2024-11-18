import logo from './logo.svg';
import './App.css';
import { FirstComponent } from './components/firstComponent';
import Login from './components/Login';
import ResetPassword from './components/resetPassword';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo"></img> */}
        {/* <FirstComponent /> */}
        <Login/>
      </header>
    </div>  
  );
}

export default App;
