import * as actions from 'store/actions';
import * as servicioServices from 'services/servicio';

import { toast } from 'react-toastify';

const servicioState = {
  servicios: [],
  currentService: {},
};

export const createService = (payload) => async (dispatch) => {
  try {
    const [currentService] = await servicioServices.createService(payload);
    dispatch({
      type: actions.CREATE_SERVICE,
      payload: { currentService },
    });
    toast.success('Solicitud de servicio creada exitosamente', {
      theme: 'colored',
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateService = (payload) => async (dispatch) => {
  try {
    const [currentService] = await servicioServices.updateService(payload);
    dispatch({
      type: actions.UPDATE_SERVICE,
      payload: { currentService },
    });
    toast.success('Solicitud de servicio actualizada exitosamente', {
      theme: 'colored',
    });
  } catch (error) {
    console.log(error);
  }
};

export const listarDetalle = (idVocabulary) => async (dispatch) => {
  try {
    const [currentService] = await servicioServices.listarDetalle(idVocabulary);

    dispatch({
      type: actions.GET_VOCABULARYDETAILL_BY_ID,
      payload: { currentService },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getServicesByUser =
  (idCorePersona, idEstadoServicio) => async (dispatch) => {
    try {
      const [currentService] = await servicioServices.getServicesByUser(
        idCorePersona,
      );
      dispatch({
        type: actions.GET_SERVICES_BY_USER,
        payload: { currentService },
      });
    } catch (error) {
      console.log(error);
    }
  };

const handlers = {
  [actions.CREATE_SERVICE]: (state, { currentService }) => ({
    ...state,
    currentService,
  }),
  [actions.GET_SERVICES_BY_USER]: (state, { currentService }) => ({
    ...state,
    currentService,
  }),
  [actions.UPDATE_SERVICE]: (state, { currentService }) => ({
    ...state,
    currentService,
  }),
  [actions.GET_VOCABULARYDETAILL_BY_ID]: (state, { currentService }) => ({
    ...state,
    currentService,
  }),
};

export const servicioReducer = (state = servicioState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
