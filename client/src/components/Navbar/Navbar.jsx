import React, { Fragment } from "react";
import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authoritarian";
import { suppliesList } from "../../actions/supplies";

const navbar = ({ logout }) => {
  const Logout = () => {
    logout();
    window.location.reload(false);
  };

  return (
    <Fragment>
      <Navbar fluid>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown
              style={{ fontSize: 20 }}
              title={localStorage.getItem("name")}
              id="basic-nav-dropdown-right"
            >
              <NavItem align="center" onClick={Logout} style={{ fontSize: 16 }}>
                <i className="fas fa-sign-out-alt"></i> Log out
              </NavItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};
navbar.prototype = {
  logout: PropTypes.func.isRequired
};
export default connect(null, { suppliesList, logout })(navbar);
