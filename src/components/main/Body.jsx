import React, { useState } from "react";
import Burger from "../sub/Burger";
import BurgerBuilder from "../sub/BurgerBuilder";
import OrderSummary from "../sub/OrderSummary";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import { addIngredient, removeIngredient } from "../../redux/actionCreators";
import { Navigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    ingredient: state.ingredient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
  };
};

const Body = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [doCheckout, setDoCheckout] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const goCheckout = () => {
    setDoCheckout(true);
  };
  return (
    <>
      <div className="body_container">
        <Burger ingredients={props.ingredient.ingredients} />
        <BurgerBuilder
          ingredientAdded={(type) => props.addIngredient(type)}
          ingredientRemoved={(type) => props.removeIngredient(type)}
          price={props.ingredient.totalPrice}
          toggleModal={toggleModal}
          purchasable={props.purchasable}
        />
      </div>
      <Modal isOpen={modalOpen}>
        <ModalHeader>Your Order Summary</ModalHeader>
        <ModalBody>
          <OrderSummary ingredients={props.ingredient.ingredients} />
          <h5>Total Price : {props.ingredient.totalPrice} BDT</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={goCheckout}>
            Continue to Shipping
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
        {doCheckout && <Navigate to="/shipping" replace={true} />}
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
