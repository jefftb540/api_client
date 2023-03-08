import * as types from '../types';

const initialState = {
  clicked: false,
};

// eslint-disable-next-line no-unused-vars, default-param-last
export default function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case types.CLICKED_BUTTON_SUCCESS:
      newState.clicked = !newState.clicked;
      return newState;
    case types.CLICKED_BUTTON_REQUEST:
      console.log(state);
      console.log('Request');
      return state;
    case types.CLICKED_BUTTON_FAILURE:
      console.log('Failure');
      return state;
    default:
      return state;
  }
}
