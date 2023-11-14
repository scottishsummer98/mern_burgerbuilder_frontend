import React, { useState } from "react";
import dateFormat from "dateformat";

const SingleOrder = (props) => {
  const ingredientsSummary = props.order.ingredients.map((item) => {
    return (
      <span className="single_order_container_ingredients" key={item.type}>
        <span
          className="text-uppercase"
          style={{ marginLeft: "auto", marginRight: "0" }}
        >
          {item.amount} X {item.type} = {item.amount * item.price} Tk.
        </span>
      </span>
    );
  });
  return (
    <div className="single_order_container">
      <div className="table-responsive">
        <table className="table table-dark table-bordered">
          <tbody>
            <tr>
              <th className="text-center">Transaction Id</th>
              <td className="text-center">{props.order.transaction_id}</td>
              <th className="text-center">Ordered At</th>
              <td className="text-center">
                {dateFormat(props.order.createdAt, "dd/mm/yyyy, h:MM TT")}
              </td>
              <th className="text-center">Payment Status</th>
              <td className="text-center">{props.order.paymentStatus}</td>
              <th className="text-center">SSL Status</th>
              <td className="text-center">{props.order.sslStatus}</td>
            </tr>
            <tr>
              <th className="text-center" colspan={8}>
                {props.order.paymentStatus === "Paid"
                  ? "Shipping Address"
                  : "Delivered At"}
              </th>
            </tr>
            <tr>
              <th colspan={2}>Name</th>
              <th colspan={2}>Address</th>
              <th colspan={2}>Contact No</th>
              <th>City</th>
              <th>Country</th>
            </tr>
            <tr>
              <td colspan={2}>{props.order.user.name}</td>
              <td colspan={2}>
                {props.order.address.address1}, {props.order.address.address2},{" "}
                {props.order.address.state}-{props.order.address.postcode}
              </td>
              <td colspan={2}>{props.order.address.phone}</td>
              <td>{props.order.address.city}</td>
              <td>{props.order.address.country}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="single_order_container_ingredients_container">
        <div>
          {ingredientsSummary}
          <span className="single_order_container_ingredients">
            <span
              className="text-uppercase"
              style={{ marginLeft: "auto", marginRight: "0" }}
            >
              2 X Brioche Buns = 80 Tk.
            </span>
          </span>
        </div>
        <div>
          <span className="single_order_container_ingredients">
            <span
              className="text-uppercase"
              style={{ marginLeft: "auto", marginRight: "0" }}
            >
              Subtotal ={" "}
              {props.order.ingredients.reduce((accumulator, item) => {
                const ingredientTotal = item.amount * item.price;
                return accumulator + ingredientTotal;
              }, 80)}{" "}
              Tk.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
