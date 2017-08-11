import { combineReducers } from 'redux';

import {
  SEARCH_RESULTS_GET_REQUEST,
  SEARCH_RESULTS_GET_SUCCESS,
  SEARCH_FORM_UPDATE,
} from '../../constants/actions';

const initialForm = {
  query: '',
  results: [],
};

const form = (state = initialForm, action) => {
  switch (action.type) {
    case SEARCH_FORM_UPDATE: {
      const { changes } = action;
      return Object.assign({}, state, changes);
    }
    default: return state;
  }
};

const isGetting = (state = false, action) => {
  switch (action.type) {
    case SEARCH_RESULTS_GET_REQUEST: return true;
    case SEARCH_RESULTS_GET_SUCCESS: return false;
    case SEARCH_FORM_UPDATE: return false;
    default: return state;
  }
};

const results = (state = [], action) => {
  switch (action.type) {
    case SEARCH_RESULTS_GET_REQUEST: return [];
    case SEARCH_RESULTS_GET_SUCCESS: return action.res.hits;
    case SEARCH_FORM_UPDATE: return [];
    default: return state;
  }
};

export default combineReducers({
  form,
  results,
  isGetting,
});
