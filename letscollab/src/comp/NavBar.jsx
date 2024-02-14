import React from "react";
import "../css/Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, userLogOut } from "../redux/actions/authActions";
import { Link } from "react-router-dom";

const NavBar = ({  }) => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.authReducer);

  const logout = async () => {
    await dispatch(userLogOut());
    dispatch(loadUser());
  };

  return (
    <div className="Nav">
      <div>
        <h2 className="title">CollabSync</h2>
      </div>

      {!isAuthenticated ? (
        <div className="auth">
          <Link to={"/signUp"}>
            <div className="signUp butt">Sign Up</div>
          </Link>
          <Link to={"/signIn"}>
            <div className="signIn butt">Sign In</div>
          </Link>
        </div>
      ) : (
        <div className="signIn butt" onClick={logout}>
          logOut
        </div>
      )}
    </div>
  );
};

export default NavBar;
