import React from "react";

const OrderSummary = (props) => {
  const ingredientsSummary = props.ingredients.map((item) => {
    return (
      <li key={item.type}>
        <span style={{ textTransform: "capitalize" }}>
          {item.amount} x {item.type}
        </span>
      </li>
    );
  });
  return (
    <div>
      <ul>{ingredientsSummary}</ul>
    </div>
  );
};

export default OrderSummary;
