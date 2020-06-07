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

import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';

import Login from './components/user/Login'
import Register from './components/user/Register'
import Account from './components/user/Account'

import ListTasks from './components/tasks/List'

import NoMatch from './components/NoMatch'

function App(props) {
  // console.log(props)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    const token = localStorage.getItem('authToDoToken')
    if (token) {
      localStorage.removeItem('authToDoToken')
      window.location.href = '/'
    }
  }
  return (
    <div className="container-fluid">
      <BrowserRouter>

        <Navbar style={{ background: "rgba(0, 165, 224)" }} light expand="md">
          <NavbarBrand style={{ fontWeight: "bold", textTransform: "uppercase" }}>Tasks App</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {
                localStorage.getItem('authToDoToken') ? (
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
                        <NavLink tag={Link} to="/sign_in">Sign In</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} to="/sign_up">Sign Up</NavLink>
                      </NavItem>
                    </React.Fragment>
                  )
              }
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={true} component={Register} path="/sign_up" exact />
          <PublicRoute restricted={true} component={Login} path="/sign_in" exact />
          <PrivateRoute component={Account} path="/account" exact />

          <PrivateRoute component={ListTasks} path="/tasks" exact />

          <PublicRoute restricted={false} component={NoMatch} exact />

        </Switch>

      </BrowserRouter>
    </div>
  )
}

export default App;
