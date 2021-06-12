import Axios from "axios"
import { CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_SUCCESS } from "../constants/categoryConstants"

const url = "https://elever-store.herokuapp.com"
//// sending request to get our categories

export const listCategories = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_REQUEST,
  })
  try {
    const { data } = await Axios.get(`${url}/categories`)
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message })
  }
}

//// getting category details by id

export const detailsCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: categoryId })
  try {
    const { data } = await Axios.get(`${url}/categories/${categoryId}`)
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

////new CATEGORY creation by ADMIN

export const createCategory = (category) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_CREATE_REQUEST })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const { data } = await Axios.post(`${url}/categories`, category, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data.category,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: message })
  }
}

////Sending updated or new CATEGORY data

export const updateCategory = (category) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const data = await Axios.put(`${url}/categories/${category._id}`, category, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CATEGORY_UPDATE_FAIL, error: message })
  }
}

///deleting category by admin
export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const { data } = Axios.delete(`${url}/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: message })
  }
}
