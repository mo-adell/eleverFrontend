import Axios from "axios"
import { SUBCATEGORY_CREATE_FAIL, SUBCATEGORY_CREATE_REQUEST, SUBCATEGORY_CREATE_SUCCESS, SUBCATEGORY_DELETE_FAIL, SUBCATEGORY_DELETE_REQUEST, SUBCATEGORY_DELETE_SUCCESS, SUBCATEGORY_DETAILS_FAIL, SUBCATEGORY_DETAILS_REQUEST, SUBCATEGORY_DETAILS_SUCCESS, SUBCATEGORY_LIST_FAIL, SUBCATEGORY_LIST_REQUEST, SUBCATEGORY_LIST_SUCCESS, SUBCATEGORY_UPDATE_FAIL, SUBCATEGORY_UPDATE_REQUEST, SUBCATEGORY_UPDATE_SUCCESS } from "../constants/subcategoryConstants"

const url = "https://elever-store.herokuapp.com"

//// sending request to get our categories

export const listSubcategories = () => async (dispatch) => {
  dispatch({
    type: SUBCATEGORY_LIST_REQUEST,
  })
  try {
    const { data } = await Axios.get(`${url}/subcategories`)
    dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: SUBCATEGORY_LIST_FAIL, payload: error.message })
  }
}

//// getting subcategory details by id

export const detailsSubcategory = (subcategoryId) => async (dispatch) => {
  dispatch({ type: SUBCATEGORY_DETAILS_REQUEST, payload: subcategoryId })

  try {
    const { data } = await Axios.get(`${url}/subcategories/${subcategoryId}`)
    dispatch({ type: SUBCATEGORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

////new subcategory creation by ADMIN

export const createSubcategory = (subcategory) => async (dispatch, getState) => {
  dispatch({ type: SUBCATEGORY_CREATE_REQUEST })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const { data } = await Axios.post(`${url}/subcategories`, subcategory, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({
      type: SUBCATEGORY_CREATE_SUCCESS,
      payload: data.subcategory,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SUBCATEGORY_CREATE_FAIL, payload: message })
  }
}

////Sending updated or new subcategory data

export const updateSubcategory = (subcategory) => async (dispatch, getState) => {
  dispatch({ type: SUBCATEGORY_UPDATE_REQUEST, payload: subcategory })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const data = await Axios.put(`${url}/subcategories/${subcategory._id}`, subcategory, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: SUBCATEGORY_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SUBCATEGORY_UPDATE_FAIL, error: message })
  }
}

///deleting subcategory by admin
export const deleteSubcategory = (subcategoryId) => async (dispatch, getState) => {
  dispatch({ type: SUBCATEGORY_DELETE_REQUEST, payload: subcategoryId })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const { data } = Axios.delete(`${url}/subcategories/deletesub/${subcategoryId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: SUBCATEGORY_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SUBCATEGORY_DELETE_FAIL, payload: message })
  }
}

///deleting subcategory when its category is deleted by admin
export const deleteRelatedSubs = (subcategoryId) => async (dispatch, getState) => {
  dispatch({ type: SUBCATEGORY_DELETE_REQUEST, payload: subcategoryId })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const { data } = Axios.delete(`${url}/subcategories/deleterelsubs/${subcategoryId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: SUBCATEGORY_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SUBCATEGORY_DELETE_FAIL, payload: message })
  }
}
