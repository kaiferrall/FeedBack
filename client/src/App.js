import React, { Component } from "react";
import "./styles/App.css";
import "./styles/loginStyles.css";
import "./styles/dashboardStyles.css";
import "./styles/lectureStyles.css";
import "./styles/formStyles.css";
import "./styles/studentForm.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";

//Components
import PrivateRoute from "./utilities/PrivateRoute";
import LoginProtected from "./utilities/LoginProtected";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import LoginContainer from "./components/Login/LoginContainer";
import Form from "./components/Students/Form";
import LandingContainer from "./components/Landing/LandingContainer";
import Landing2Container from "./components/Landing/Landing2Container";
import NavBar from "./components/NavBar";
import Page404 from "./components/Page404";

//Functions
import { setLoggedInUser } from "./actions/authActions";
import { setAuthHeader } from "./utilities/setAuthHeader";

if (localStorage.FeedBack_Auth) {
  setAuthHeader(localStorage.FeedBack_Auth);
  //Decode jwt token
  let user = jwt_decode(localStorage.FeedBack_Auth);
  let auth = true;
  //Setting the user and auth status
  store.dispatch(setLoggedInUser(user, auth));
  //Check if the token has expired (Expires in one hour rn)
  let currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    store.dispatch(setLoggedInUser({}, false));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Switch>
              <LoginProtected exact path="/" component={LandingContainer} />
              <LoginProtected path="/login" component={LoginContainer} />
              <LoginProtected path="/signup" component={LoginContainer} />
              <PrivateRoute path="/dashboard" component={DashboardContainer} />
              <LoginProtected path="/form" component={Form} />
              <Route exact path="/error/404" component={Page404} />
              <Redirect to="/error/404" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
