import express from 'express';
import rotas from './router';
import cors from 'cors';
import config_index from './config/autoindex'
import index from 'mod_autoindex'

const dir = config_index.dir

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes(){
        this.server.use(rotas)
        this.server.use(index(dir, {
            sync: true,
          }));
    }
}

export default new App().server;