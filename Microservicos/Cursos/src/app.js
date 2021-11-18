import express from 'express';
import rotas from './router';
import cors from 'cors';
import './database';
import fileUpload from 'express-fileupload';
class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(fileUpload({
            useTempFiles : true,
            tempFileDir : './tmp/'
        })),
        this.server.use(express.json()),
        this.server.use(cors())
    }

    routes(){
        this.server.use(rotas)
    }
}

export default new App().server;