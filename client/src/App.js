import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import Home from './components/Home'
import Account from './components/user/Account'

import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';

import Login from './components/user/Login'
import Register from './components/user/Register'

import NoMatch from './components/NoMatch'

function App(props) {
  // console.log(props)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      localStorage.removeItem('authToken')
      window.location.href = '/'
    }
  }
  return (
    <div className="container-fluid">
      <BrowserRouter>

        <Navbar color="light" light expand="md">
          <NavbarBrand style={{ fontWeight: "bold", textTransform: "uppercase" }}>Tasks App</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {
                localStorage.getItem('authtoken') ? (
                  <React.Fragment>
                    <NavItem>
                      <NavLink tag={Link} to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/tasks">Tasks</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="#" onClick={handleLogout}>Logout</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/account">Account</NavLink>
                    </NavItem>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <NavItem>
                        <NavLink tag={Link} to="/">Home</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} to="/register">Register</NavLink>
                      </NavItem>
                    </React.Fragment>
                  )
              }
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={true} component={Register} path="/register" exact />
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PrivateRoute component={Account} path="/account" exact />

          {/* <PrivateRoute component={Task} path="/task" exact /> */}

          <PublicRoute restricted={false} component={NoMatch} exact />

        </Switch>

      </BrowserRouter>
    </div>
  )
}

export default App;
