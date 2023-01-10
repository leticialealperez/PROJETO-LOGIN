import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// GET
const apiGet = async (rota: string) => {
    const resposta: AxiosResponse = await axios.get(rota);

    return resposta;
}

// POST
const apiPost = async (rota:string, dados: any) => {
    const resposta: AxiosResponse = await axios.post(rota, dados);

    return resposta;
}

// PUT
// /users/id/contacts/id
const apiPut = async (rota: string, dados: any) => {
    const resposta: AxiosResponse = await axios.put(rota, dados);
    return resposta;
}


// DELETE
const apiDelete = async (rota: string) => {
    const resposta: AxiosResponse = await axios.delete(rota);
    return resposta;
}

export { apiGet, apiPost, apiPut, apiDelete };