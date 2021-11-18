import {Router} from 'express';
import FileController from './app/controllers/FileController';
import multer from 'multer';
import config_multer from './config/multer'
import apiKey from './app/middeware/key'
import Porteiro from './app/middeware/auth'

const updloads = multer(config_multer)
const rotas = new Router();

rotas.use(apiKey)
// rotas.use(Porteiro);
rotas.post('/files',updloads.array('files',2),FileController.store);

export default rotas;