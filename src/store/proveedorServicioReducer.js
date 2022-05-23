import * as actions from 'store/actions';
import * as proveedorServicioServices from 'services/proveedorServicio';

const proveedorServicioState = {
  servicios: [],
  currentProveedorService: {},
};

export const createProveedorServicio = (payload) => async (dispatch) => {
  try {
    const [currentProveedorService] =
      await proveedorServicioServices.createProveedorService(payload);
    dispatch({
      type: actions.CREATE_PROVEEDORSERVICE,
      payload: { currentProveedorService },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getServicesByUser = (idCorePersona) => async (dispatch) => {
  try {
    const [currentProveedorService] =
      await proveedorServicioServices.getProveedorService(idCorePersona);
    dispatch({
      type: actions.GET_PROVEEDORSERVICES_BY_ESTADO,
      payload: { currentProveedorService },
    });
  } catch (error) {
    console.log(error);
  }
};

const handlers = {
  [actions.CREATE_PROVEEDORSERVICE]: (state, { currentProveedorService }) => ({
    ...state,
    currentProveedorService,
  }),
  [actions.GET_PROVEEDORSERVICES_BY_ESTADO]: (
    state,
    { currentProveedorService },
  ) => ({
    ...state,
    currentProveedorService,
  }),
};

export const proveedorServicioReducer = (
  state = proveedorServicioState,
  action,
) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
