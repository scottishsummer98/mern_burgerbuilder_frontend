import { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import Dashboard from "../sub/Dashboard";
import Checkout from "../sub/Checkout";
import Auth from "../sub/Auth";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { authCheck } from "../../redux/actionCreators";
import Shipping from "../sub/Shipping";

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};

const Root = (props) => {
  const { authCheck } = props;
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
