import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.18.197.248:3000',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
});

export const saveAluno = async (aluno) => {
  return await api.post('/aluno', aluno).catch((err) => console.log(err));
};

export const saveEmpresa = async (empresa) => {
  return await api.post('/empresa', empresa).catch((err) => console.log(err));
};
