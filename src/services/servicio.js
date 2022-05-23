import { httpClient } from 'helpers/httpClient';

export const createService = async (payload) => {
  try {
    const { data } = await httpClient.post('vocabulary', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateService = async (payload) => {
  try {
    const { data } = await httpClient.put(
      'vocabulary/' + payload.idServicio,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getServicesByUser = async (idCorePersona, idEstadoServicio) => {
  try {
    console.log(idCorePersona + '-' + idEstadoServicio);
    const { data } = await httpClient.get('vocabulary', {
      params: { idCorePersona, idEstadoServicio },
    });
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};
