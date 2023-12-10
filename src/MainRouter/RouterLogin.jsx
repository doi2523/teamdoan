import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './SignIn'; // Correct case

const RouterLogin = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/singin">Sign In</Link>
            </li>
            <li>
              <Link to="/singup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Route path="/singin" component={SingIn} />
        <Route path="/singup" component={SingUp} />
      </div>
    </Router>
  );
};

export default RouterLogin;
