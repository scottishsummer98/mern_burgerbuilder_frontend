import React, { useEffect, useState } from "react";
import {
  createOrderCOD,
  fetchUserDetails,
  initPayment,
} from "../../redux/actionCreators";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../sub/Spinner";

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    ingredient: state.ingredient,
    userDetails: state.userDetails,
    payment: state.payment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrderCOD: (ingredients) => dispatch(createOrderCOD(ingredients)),
    fetchUserDetails: () => dispatch(fetchUserDetails()),
    initPayment: (ingredients) => dispatch(initPayment(ingredients)),
  };
};

const Checkout = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
  useEffect(() => {
    if (!props.authentication.userInfo) {
      navigate("/");
    }
  }, [props.authentication.userInfo, navigate]);

  if (!props.authentication.userInfo) {
    return null;
  }
  let cartList = null;
  props.ingredient.ingredients.length > 0
    ? (cartList = props.ingredient.ingredients.map((cartItem) => {
        return (
          <>
            <tr key={cartItem.type}>
              <td>
                {cartItem.amount} X {cartItem.type}
              </td>
              <td
                style={{
                  textAlign: "right",
                }}
              >
                {cartItem.amount * cartItem.price} Tk
              </td>
            </tr>
          </>
        );
      }))
    : (cartList = (
        <>
          <tr>
            <td colSpan={2}>Cart is empty!</td>
          </tr>
        </>
      ));
  let checkoutDetails = null;
  {
    props.userDetails.isLoading
      ? (checkoutDetails = <Spinner />)
      : (checkoutDetails = (
          <>
            <div className="card text-white bg-secondary checkout_shipping_details_container">
              <h5 className="card-header text-center">Shipping Details</h5>
              <table className="table table-dark">
                <tbody style={{ textAlign: "left" }}>
                  <tr>
                    <th style={{ width: "40%" }}>Name</th>
                    <td>{props.authentication.userInfo.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{props.authentication.userInfo.email}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{props.userDetails.userDetails.phone}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>
                      {props.userDetails.userDetails.address1},{" "}
                      {props.userDetails.userDetails.address2}
                    </td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{props.userDetails.userDetails.city}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{props.userDetails.userDetails.state}</td>
                  </tr>
                  <tr>
                    <th>Post Code</th>
                    <td>{props.userDetails.userDetails.postcode}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{props.userDetails.userDetails.country}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card text-white bg-secondary checkout_order_details_container">
              <h5 className="card-header text-center">Order Details</h5>

              <table className="table table-dark">
                <tbody>{cartList}</tbody>
                <tfoot>
                  <tr>
                    <td>2 X Brioche Buns</td>
                    <td style={{ textAlign: "right" }}>80 Tk</td>
                  </tr>
                  <tr>
                    <th>Sub Total</th>
                    <th style={{ textAlign: "right" }}>
                      {props.ingredient.totalPrice} Tk
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="form-group"
              >
                <label className="form-control">Payment Method</label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  className="form-control "
                  onChange={handlePaymentMethod}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Pay Now">Pay Now</option>
                </select>
              </div>
              {paymentMethod === "Pay Now" ? (
                <button
                  className="btn btn-success"
                  onClick={async () => {
                    try {
                      let gatewayPageURL = "";
                      gatewayPageURL = await props.initPayment(
                        props.ingredient.ingredients
                      );
                      window.location = gatewayPageURL;
                    } catch (error) {
                      console.error("Error:", error);
                    }
                  }}
                >
                  Make Payment
                </button>
              ) : (
                <button
                  className="btn btn-info"
                  onClick={async () => {
                    try {
                      await props.createOrderCOD(props.ingredient.ingredients);
                      navigate("/");
                    } catch (error) {
                      console.error("An error occurred:", error);
                    }
                  }}
                >
                  Order Now
                </button>
              )}
              <button
                className="btn btn-warning"
                onClick={() => navigate("/shipping")}
              >
                Go Back
              </button>
            </div>
          </>
        ));
  }
  return <div className="checkout_container">{checkoutDetails}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
