import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import { connect } from "react-redux";
import { logout } from "../../redux/actionCreators";
import { FiUser, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

const Header = (props) => {
  let authSection = null;
  if (props.authentication.userInfo === null) {
    authSection = (
      <NavLink className="header_navlink" to="/auth">
        <FiUser />
      </NavLink>
    );
  } else {
    authSection = (
      <div>
        <NavLink className="header_navlink" to="/">
          Welcome {props.authentication.userInfo.name}
        </NavLink>
        <NavLink
          className="header_navlink"
          to="/auth"
          onClick={() => {
            props.logout();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Logged out Successfully!",
            });
          }}
        >
          <FiLogOut />
        </NavLink>
      </div>
    );
  }
  return (
    <div className="header_container">
      <div>
        <NavLink className="header_navlink" to="/">
          <img src={logo} className="header_logo" alt="logo" />
          Mern Burger Builder
        </NavLink>

        {props.authentication.userInfo != null ? (
          <NavLink className="header_navlink" to="/dashboard">
            Dashboard
          </NavLink>
        ) : null}
      </div>
      {authSection}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
