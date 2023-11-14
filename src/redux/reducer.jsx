import * as actionTypes from "./actionTypes";
import { combineReducers } from "redux";

const authReducer = (
  authState = {
    userInfo: null,
    authLoading: false,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...authState,
        userInfo: action.payload.userInfo,
        authLoading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...authState,
        userInfo: null,
        authLoading: false,
      };
    case actionTypes.AUTH_LOADING:
      return {
        ...authState,
        authLoading: action.payload,
      };
    default:
      return authState;
  }
};

const ingredientReducer = (
  ingredientState = {
    ingredients: [
      {
        type: "salad",
        amount: 0,
        price: 20,
      },
      {
        type: "cheese",
        amount: 0,
        price: 40,
      },
      {
        type: "meat",
        amount: 0,
        price: 90,
      },
    ],
    totalPrice: 80,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      for (let item of ingredientState.ingredients) {
        if (item.type === action.payload) {
          item.amount++;
        }
      }
      return {
        ...ingredientState,
        ingredients: ingredientState.ingredients,
        totalPrice:
          ingredientState.totalPrice +
          ingredientState.ingredients.find(
            (item) => item.type === action.payload
          ).price,
      };
    case actionTypes.REMOVE_INGREDIENTS:
      for (let item of ingredientState.ingredients) {
        if (item.type === action.payload) {
          if (item.amount <= 0) {
            return ingredientState;
          }
          item.amount--;
        }
      }
      return {
        ...ingredientState,
        ingredients: ingredientState.ingredients,
        totalPrice:
          ingredientState.totalPrice -
          ingredientState.ingredients.find(
            (item) => item.type === action.payload
          ).price,
      };

    case actionTypes.RESET_INGREDIENTS:
      return {
        ...ingredientState,
        ingredients: [
          {
            type: "salad",
            amount: 0,
            price: 20,
          },
          {
            type: "cheese",
            amount: 0,
            price: 40,
          },
          {
            type: "meat",
            amount: 0,
            price: 90,
          },
        ],
        totalPrice: 80,
      };
    default:
      return ingredientState;
  }
};

const orderReducer = (
  orderState = {
    isLoading: false,
    order: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ORDER_LOADING:
      return {
        ...orderState,
        isLoading: true,
        order: [],
      };
    case actionTypes.LOAD_ORDER:
      return {
        ...orderState,
        isLoading: false,
        order: action.payload,
      };

    default:
      return orderState;
  }
};

const userDetailsReducer = (
  userDetailsState = {
    isLoading: false,
    userDetails: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.USER_DETAILS_LOADING:
      return {
        ...userDetailsState,
        isLoading: true,
        userDetails: [],
      };
    case actionTypes.LOAD_USER_DETAILS:
      return {
        ...userDetailsState,
        isLoading: false,
        userDetails: action.payload,
      };

    default:
      return userDetailsState;
  }
};

const paymentReducer = (
  paymentState = {
    gatewayPageURL: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_GATEWAY_URL:
      return {
        ...paymentState,
        gatewayPageURL: action.payload,
      };
    default:
      return paymentState;
  }
};

export const Reducer = combineReducers({
  authentication: authReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  userDetails: userDetailsReducer,
  payment: paymentReducer,
});
