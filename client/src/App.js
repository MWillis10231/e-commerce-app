import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";

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

const stripePromise = loadStripe("pk_test_51IbOboGITdPUUpVmMjcdBywJ4CuabkY2Jxy0uySMlBvYUuxlpBh3rZ5lgSHYihc3PPvgbCmkvWTTIapgihweClu10031A4LojP");

function App(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  // I think we just want to save customerdata as a more simple object (maybe not so much info/data)
  const [customerData, setCustomerData] = useState({});
  const [navCounter, setNavCounter] = useState(0);
  const [search, setSearch] = useState();

  function findSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (loggedIn === false) {
      setCustomerData({});
    }
  }, [loggedIn]);

  function updateCustomerData(data) {
    setCustomerData(data);
  }

  function signOut() {
    if (loggedIn === true) {
      setloggedIn(false);
    }
  }

  function signIn() {
    if (loggedIn === false) {
      setloggedIn(true);
    }
  }

  function addCartItem() {
    setCartTotalItems(cartTotalItems + 1);
  }

  function updateCart(number) {
    setCartTotalItems(number);
  }

  function navigationCounter() {
    setNavCounter(navCounter + 1);
  }

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <header className="Nav-header">
            <NavBar
              loggedIn={loggedIn}
              username={customerData.firstName}
              cartnumber={cartTotalItems}
              signOut={signOut}
              findSearch={findSearch}
              search={search}
            />
            <NavBarMini navigationCounter={navigationCounter} />
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
                  <Login
                    loggedIn={loggedIn}
                    updateCustomerData={updateCustomerData}
                    signIn={signIn}
                  />
                )}
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/cart">
                <Cart
                  loggedIn={loggedIn}
                  username={customerData.firstName}
                  userId={customerData.id}
                  cartTotalItems={cartTotalItems}
                  updateCart={updateCart}
                />
              </Route>
              <Route path="/profile">
                <Profile loggedIn={loggedIn} customerData={customerData} />
              </Route>
              <Route path="/products">
                <Products addCartItem={addCartItem} search={search} />
              </Route>
              <Route path="/">
                <Home loggedIn={loggedIn} />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </Elements>
  );
}

export default App;
