import "./App.css";
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Component imports
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import NavBarMini from "./components/NavBarMini";
import About from "./components/About";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Home from "./components/Home";

// Stripe Imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "./features/userSlice";

const stripePromise = loadStripe("pk_test_51IbOboGITdPUUpVmMjcdBywJ4CuabkY2Jxy0uySMlBvYUuxlpBh3rZ5lgSHYihc3PPvgbCmkvWTTIapgihweClu10031A4LojP");

function App() {
  const loggedIn = useSelector(selectLoggedIn)

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <header className="Nav-header">
            <NavBar
            />
            <NavBarMini />
          </header>
          <main>
            <div className="background"></div>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                {loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Login />
                )}
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/profile">
                <Profile />
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
    </Elements>
  );
}

export default App;
