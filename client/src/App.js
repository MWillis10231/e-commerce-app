import './App.css';
import Products from './components/Products';
import NavBar from './components/NavBar';
import NavBarMini from './components/NavBarMini';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Home from './components/Home';
import { useEffect, useState } from 'react';


function App(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [username, setUsername] = useState('No user');
  const [cartTotalItems, setcartTotalItems] = useState(0);

  useEffect(() => {
    if (loggedIn === false) {
      setUsername('No user')
    }
  }, [loggedIn]);

  return (
    <Router>
      <div className="App">
        <header className="Nav-header">
          <NavBar loggedIn={loggedIn} username={username} cartnumber={cartTotalItems}/>
          <NavBarMini/>
        </header>
        <main>
          <div className="background"></div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/cart">
              <Cart loggedIn={loggedIn} username={username} />
            </Route>
            <Route path="/profile" >
              <Profile loggedIn={loggedIn} username={username} />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
