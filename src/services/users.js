import { httpClient } from 'helpers/httpClient';

export const findUsers = async () => {
  try {
    const { data } = await httpClient.get('corePersona');
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};
