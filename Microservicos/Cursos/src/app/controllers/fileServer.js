import axios from "axios";
import FormData from "form-data";
import  * as fsPromisses from 'fs/promises'
import * as fs from 'fs'
import { resolve, extname} from 'path'
import crypto from 'crypto'
import authConfig from '../../config/auth';

const tempDir = resolve(__dirname, '..', '..', '..','tmp')+'/'

class fileServer   {
    async upload(url, token, arquivos) {
        const form = new FormData();
        form.append('files', fs.createReadStream(tempDir+arquivos.html.nome));
        form.append('files', fs.createReadStream(tempDir+arquivos.jpg.nome));
        const post = await axios({
            method: 'post',
            url: url,
            data: form,
            headers: {
                'apikey': authConfig.gatewayKey,
                'authorization': 'Bearer '+token,
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            },
        })
       const data = post.data
        await this.delete(arquivos)
        return data
    }
    async tmphold(req,res){
        const arquivos={};
        arquivos.html=req.files.arquivohtml
        arquivos.jpg=req.files.arquivojpg
        arquivos.html.nome = crypto.randomBytes(20).toString('hex') + extname(arquivos.html.name)
        arquivos.jpg.nome = crypto.randomBytes(20).toString('hex') + extname(arquivos.jpg.name)
        await arquivos.html.mv(tempDir+arquivos.html.nome, function(err) {
        if (err)
         console.log("erro com o arquivo")
        });
        await arquivos.jpg.mv(tempDir+arquivos.jpg.nome, function(err) {
        if (err)
            console.log("erro com o arquivo")
        });
        return arquivos
    }
    async delete(arquivos){
        await fsPromisses.unlink(tempDir + arquivos.html.nome, (err) => {
            if (err)
                throw err;
        });
        await fsPromisses.unlink(tempDir + arquivos.jpg.nome, (err) => {
            if (err)
                throw err;
        });
    }
}
export default new fileServer();