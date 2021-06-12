import { SUBCATEGORY_CREATE_FAIL, SUBCATEGORY_CREATE_REQUEST, SUBCATEGORY_CREATE_RESET, SUBCATEGORY_CREATE_SUCCESS, SUBCATEGORY_DELETE_FAIL, SUBCATEGORY_DELETE_REQUEST, SUBCATEGORY_DELETE_RESET, SUBCATEGORY_DELETE_SUCCESS, SUBCATEGORY_DETAILS_FAIL, SUBCATEGORY_DETAILS_REQUEST, SUBCATEGORY_DETAILS_SUCCESS, SUBCATEGORY_LIST_FAIL, SUBCATEGORY_LIST_REQUEST, SUBCATEGORY_LIST_SUCCESS, SUBCATEGORY_UPDATE_FAIL, SUBCATEGORY_UPDATE_REQUEST, SUBCATEGORY_UPDATE_RESET, SUBCATEGORY_UPDATE_SUCCESS } from "../constants/subcategoryConstants"

//// subcategories list for homescreen

export const subcategoryListReducer = (state = { loading: true, subcategories: [] }, action) => {
  switch (action.type) {
    case SUBCATEGORY_LIST_REQUEST:
      return { loading: true }
    case SUBCATEGORY_LIST_SUCCESS:
      return { loading: false, success: true, subcategories: action.payload }
    case SUBCATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

////subcategory details for single subcategory screen
export const subcategoryDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SUBCATEGORY_DETAILS_REQUEST:
      return { loading: true }
    case SUBCATEGORY_DETAILS_SUCCESS:
      return { loading: false, subcategory: action.payload }
    case SUBCATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

////creating new subcategory by admin

export const subcategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_CREATE_REQUEST:
      return { loading: true }
    case SUBCATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, subcategory: action.payload }
    case SUBCATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SUBCATEGORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

///editing subcategory reducer
export const subcategoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_UPDATE_REQUEST:
      return { loading: true }
    case SUBCATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case SUBCATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SUBCATEGORY_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

///deleting subcategory reducer

export const subcategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_DELETE_REQUEST:
      return { loading: true }
    case SUBCATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SUBCATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case SUBCATEGORY_DELETE_RESET:
      return {}
    default:
      return state
  }
}
