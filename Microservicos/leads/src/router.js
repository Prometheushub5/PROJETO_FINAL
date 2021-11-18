import {Router} from 'express';
import apiKey from './app/middeware/key'
import Porteiro from './app/middeware/auth';
import ControleLeads from './app/controllers/ControleLeads';

const rotas = new Router();

rotas.use(apiKey)
rotas.post('/leads', ControleLeads.criar);
// rotas.put('/me',ControleCadastro.update); 


export default rotas;