import * as actions from 'store/actions';
import * as userServices from 'services/users';

const userState = {
  users: [],
};

export const findUsers = () => async (dispatch) => {
  try {
    const [users] = await userServices.findUsers();
    dispatch({
      type: actions.GET_ALL_USER,
      payload: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const handlers = {
  [actions.GET_ALL_USER]: (state, { users }) => ({
    ...state,
    users,
  }),
};

export const userReducer = (state = userState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
