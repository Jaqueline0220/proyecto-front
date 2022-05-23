import { httpClient } from 'helpers/httpClient';

export const createProveedorService = async (payload) => {
  try {
    console.log('llego');
    console.log(payload);
    const { data } = await httpClient.post('proveedorServicio', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateProveedorService = async (payload) => {
  try {
    const { data } = await httpClient.put('proveedorServicio', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getProveedorService = async (idServicio) => {
  try {
    const { data } = await httpClient.get('proveedorServicio', {
      params: { idServicio },
    });
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};
