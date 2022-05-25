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
      'vocabulary/' + payload.idVocabulary,
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
    const { data } = await httpClient.get(
      idCorePersona == null
        ? 'vocabulary'
        : 'vocabulary/listAll/' + idCorePersona,
    );
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const listarDetalle = async (idVocabulary) => {
  try {
    console.log(idVocabulary);
    const { data } = await httpClient.get(
      'vocabularyDetail/vocabularyDetail/' + idVocabulary,
    );
    console.log(data);
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};
