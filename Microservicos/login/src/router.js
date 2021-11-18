import {Router} from 'express';
import controleSessao from './app/controllers/controleSessao';

const rotas = new Router();

rotas.post('/auth', controleSessao.verificar);

export default rotas;