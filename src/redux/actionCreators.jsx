import * as actionTypes from "./actionTypes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { API } from "../utils/config";

//Authentication
export const auth = (user) => (dispatch) => {
  dispatch(authLoading(true));
  let authURL = null;
  if (user.mode === "Register") {
    authURL = `${API}/user/registration`;
  } else {
    authURL = `${API}/user/login`;
  }
  axios
    .post(`${authURL}`, user.values, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authLoading(false));
      dispatch(authSuccess(res.data.token));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });
    })
    .catch((err) => {
      dispatch(authLoading(false));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data,
      });
    });
};
export const authSuccess = (token) => {
  localStorage.setItem("jwt", JSON.stringify(token));
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const decoded = jwtDecode(jwt);
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      userInfo: decoded,
    },
  };
};
export const authLoading = (isLoading) => {
  return {
    type: actionTypes.AUTH_LOADING,
    payload: isLoading,
  };
};
export const authCheck = () => (dispatch) => {
  const tokenExists = JSON.parse(localStorage.getItem("jwt"));
  if (!tokenExists) {
    dispatch(logout());
  } else {
    const { exp } = jwtDecode(tokenExists);
    if (new Date().getTime() < exp * 1000) {
      dispatch(authSuccess(tokenExists));
    } else {
      dispatch(logout());
    }
  }
};
export const logout = () => {
  localStorage.removeItem("jwt");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// Ingredient
export const addIngredient = (igtype) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    payload: igtype,
  };
};
export const removeIngredient = (igtype) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    payload: igtype,
  };
};
export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS,
  };
};

//Shipping
const userDetailsLoading = () => ({
  type: actionTypes.USER_DETAILS_LOADING,
});
const loadUserDetails = (info) => ({
  type: actionTypes.LOAD_USER_DETAILS,
  payload: info,
});
export const fetchUserDetails = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return (dispatch) => {
    dispatch(userDetailsLoading());
    axios
      .get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((info) => dispatch(loadUserDetails(info)))
      .catch((error) => console.log(error));
  };
};
export const addUserDetails = (values) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  axios
    .post(`${API}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .then((info) => {
      dispatch(fetchUserDetails());
      Swal.fire({
        icon: "success",
        title: "Success",
        text: info.message,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error.response.data,
      });
    });
};
export const updateUserDetails = (uid, values) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  axios
    .put(`${API}/profile/${uid}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .then((info) => {
      dispatch(fetchUserDetails());
      Swal.fire({
        icon: "success",
        title: "Success",
        text: info.message,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Something went wrong!",
      });
    });
};

//SSL
const setGatewayPageURL = (url) => ({
  type: actionTypes.SET_GATEWAY_URL,
  payload: url,
});
export const initPayment = (ingredients) => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${API}/payment`,
          { ingredients },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "SUCCESS") {
            dispatch(setGatewayPageURL(response.data.GatewayPageURL));
            resolve(response.data.GatewayPageURL);
          } else {
            reject(new Error("Payment initialization failed"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

// Order
// Order
const orderLoading = () => ({
  type: actionTypes.ORDER_LOADING,
});
const loadOrder = (order) => ({
  type: actionTypes.LOAD_ORDER,
  payload: order,
});
export const fetchOrders = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return (dispatch) => {
    dispatch(orderLoading());
    axios
      .get(`${API}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((order) => dispatch(loadOrder(order)))
      .catch((error) => console.log(error));
  };
};
export const createOrderCOD = (ingredients) => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    axios
      .post(
        `${API}/order`,
        { ingredients },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .then((order) => {
        dispatch(fetchOrders());
        dispatch(resetIngredients());
        Swal.fire({
          icon: "success",
          title: "Success",
          text: order.message,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "error",
          text: error.response.data,
        });
      });
  };
};
