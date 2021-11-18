import express from 'express';
import rotas from './router';
import cors from 'cors';
import './database';
import apiKey from './app/middeware/apikey';

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(cors())
        this.server.use(apiKey)
    }

    routes(){
        this.server.use(rotas)
    }
}

export default new App().server;