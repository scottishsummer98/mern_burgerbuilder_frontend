import React from "react";
import breadTop from "../../images/top.png";
import cheese from "../../images/cheese.png";
import meat from "../../images/meat.png";
import salad from "../../images/salad.png";
import breadbottom from "../../images/bottom.png";

const Ingredients = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "breadtop":
      ingredient = <img src={breadTop} alt="" />;
      break;
    case "cheese":
      ingredient = <img src={cheese} alt="" />;
      break;
    case "meat":
      ingredient = <img src={meat} alt="" />;
      break;
    case "salad":
      ingredient = <img src={salad} alt="" />;
      break;
    case "breadbottom":
      ingredient = (
        <img
          style={{ borderRadius: "0 0 1.5rem 1.5rem" }}
          src={breadbottom}
          alt=""
        />
      );
      break;
    default:
      break;
  }
  return <div className="ingredient">{ingredient}</div>;
};

export default Ingredients;
