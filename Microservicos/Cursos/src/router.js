import {Router} from 'express';
import ControleCurso from './app/controllers/ControleCurso';
import apiKey from './app/middeware/key'
import Porteiro from './app/middeware/auth';
import axios from 'axios';

const rotas = new Router();


rotas.use(apiKey);
rotas.get('/cursos',ControleCurso.listar); //listar cursos
rotas.get('/cursos/:id',ControleCurso.listar); //listar curso
rotas.use(Porteiro); //apartir daqui somente logado
rotas.post('/cursos',ControleCurso.criar); //criar cursos
rotas.put('/cursos/:id',ControleCurso.update); //update cursos
rotas.delete('/cursos/:id',ControleCurso.delete);

export default rotas;