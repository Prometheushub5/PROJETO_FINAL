import {Router} from 'express';
import apiKey from './app/middeware/key'
import Porteiro from './app/middeware/auth';
import ControleCadastro from './app/controllers/ControleCadastro';

const rotas = new Router();

rotas.use(apiKey)
rotas.use(Porteiro)
rotas.post('/cadastro', ControleCadastro.criar); 
rotas.put('/me',ControleCadastro.update); 


export default rotas;