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
          <Route path="/" component={Home} exact={true} />

          <Route path="/login" component={Login} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/account" component={Account} exact={true} />
          <Route component={NoMatch} />

        </Switch>

      </BrowserRouter>
    </div>
  )
}

export default App;
