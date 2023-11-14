import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";
import SingleOrder from "./SingleOrder";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    order: state.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

const Dashboard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.authentication.userInfo) {
      navigate("/");
    }
  }, [props.authentication.userInfo, navigate]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  if (!props.authentication.userInfo) {
    return null;
  }
  let orderHistory;
  if (props.order.isLoading) {
    orderHistory = <Spinner />;
  } else if (props.order.order.length === 0) {
    orderHistory = "No order history available!";
  } else {
    orderHistory = props.order.order.map((order) => (
      <SingleOrder order={order} key={order._id} />
    ));
  }
  return <div className="dashboard_container">{orderHistory}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
