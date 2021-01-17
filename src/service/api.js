import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.18.201.211:3000',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
});

/*
 * ALUNO
 *
 * GET /aluno (Retorna uma lista de alunos)
 * GET /aluno/:id (Retorna um aluno do mesmo id)
 * POST /aluno (Salva um novo aluno)
 *
 */

export const getAlunos = async () => {
  const {data} = await api.get('/aluno').catch((err) => console.log(err));
  return data;
};

export const getAlunoById = async (id) => {
  return await api.get(`/aluno/${id}`).catch((err) => console.log(err));
};

export const getAlunoEmpresas = async (id) => {
  const {data} = await api
    .get(`/aluno/${id}/empresas`)
    .catch((err) => console.log(err));

  return data;
};

export const saveAluno = async (aluno) => {
  return await api.post('/aluno', aluno).catch((err) => console.log(err));
};

export const updateAluno = async (id, aluno) => {
  return await api.put(`/aluno/${id}`, aluno).catch((err) => console.log(err));
};

/*
 * EMPRESA
 *
 * GET /empresa (Retorna uma lista de empresas)
 * GET /empresa/:id (Retorna uma empresa do mesmo id)
 * POST /aluno (Salva uma nova empresa)
 *
 */

export const getEmpresas = async () => {
  return await api.post('/empresa').catch((err) => console.log(err));
};

export const getEmpresaById = async (id) => {
  return await api.post(`/empresa/${id}`).catch((err) => console.log(err));
};

export const saveEmpresa = async (empresa) => {
  return await api.post('/empresa', empresa).catch((err) => console.log(err));
};

/*
 * BLOG
 *
 * GET /blog (Retorna uma lista de postagens do blog)
 * GET /blog/:id (Retorna uma postagem do mesmo id)
 * POST /blog (Salva uma nova postagem)
 *
 */

export const getPostagens = async () => {
  const {data} = await api.get('/blog').catch((err) => console.log(err));
  return data;
};

export const getPostagemById = async (id) => {
  return await api.get(`/blog/${id}`).catch((err) => console.log(err));
};

export const savePostagem = async (postagem) => {
  return await api.post('/blog', postagem).catch((err) => console.log(err));
};
