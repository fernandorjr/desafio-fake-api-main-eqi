import { api } from "../api/api.js";

export const getIndicadores = async () => {
  try {
    const response = (await api.get(`indicadores`)).data;
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getSimulacoes = async (indexacao, rendimento) => {
  try {
    const response = (
      await api.get(
        `simulacoes?tipoIndexacao=${indexacao}&tipoRendimento=${rendimento}`
      )
    ).data;
    return response;
  } catch (error) {
    console.error(error);
  }
};
