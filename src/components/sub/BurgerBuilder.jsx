import React from "react";
import cheese from "../../images/cheese.png";
import meat from "../../images/meat.png";
import salad from "../../images/salad.png";

const controls = [
  { label: "Salad", type: "salad", img: salad },
  { label: "Cheese", type: "cheese", img: cheese },
  { label: "Meat", type: "meat", img: meat },
];

const BuildControl = (props) => {
  return (
    <div className="burger_builder_control_container">
      <div className="burger_builder_control_container_ingredients">
        <p className="burger_builder_control_container_text">{props.label}</p>
        <div>
          <img
            style={
              props.img === cheese
                ? { width: "7rem", height: "1rem", marginLeft: ".5rem" }
                : { width: "7rem", height: "1rem", marginLeft: "1rem" }
            }
            src={props.img}
            alt=""
          />
        </div>
      </div>
      <div className="burger_builder_control_container_buttons">
        <button className="btn btn-danger btn-sm " onClick={props.removed}>
          Less
        </button>
        <button className="btn btn-success btn-sm " onClick={props.added}>
          More
        </button>
      </div>
    </div>
  );
};

const BurgerBuilder = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="burger_builder_container">
        <p className="burger_builder_container_text">Add Ingredients</p>
        <hr />
        {controls.map((item) => {
          return (
            <div className="burger_builder_control_container">
              <BuildControl
                label={item.label}
                type={item.type}
                img={item.img}
                key={Math.random()}
                added={() => props.ingredientAdded(item.type)}
                removed={() => props.ingredientRemoved(item.type)}
              />
            </div>
          );
        })}
        <hr />
        <p className="burger_builder_container_text">
          Subtotal: <strong>{props.price}</strong> BDT
        </p>
        <br />
      </div>
      <button
        className="btn btn-secondary"
        disabled={props.price <= 80}
        onClick={props.toggleModal}
      >
        Order Now
      </button>
    </div>
  );
};

export default BurgerBuilder;
