import React from "react";
import Ingredients from "./Ingredients";

const Burger = (props) => {
  let ingredientsArr = props.ingredients
    .map((item) => {
      let amountArr = [...Array(item.amount).keys()];
      return amountArr.map((_) => {
        return <Ingredients type={item.type} key={Math.random()}></Ingredients>;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);
  if (ingredientsArr.length === 0) {
    ingredientsArr = (
      <p className="burger_builder_text">Please add some ingredients</p>
    );
  }
  return (
    <div className="burger_container">
      <Ingredients type="breadtop"></Ingredients>
      {ingredientsArr}
      <Ingredients type="breadbottom"></Ingredients>
    </div>
  );
};

export default Burger;
