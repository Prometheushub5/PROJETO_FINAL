import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import fs from 'fs'

export default async ( req, res, next ) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders){
    return res.status(401).json({ Mensagem: 'Para Acessar esta rota é necessário estar logado'})
    }
    const [, token] = authHeaders.split(' ');
    const publicKey  = fs.readFileSync('./public.key', 'utf8');
    try {
      const decoded = await promisify(jwt.verify)(token, publicKey, {algorithm: ["RS256"]});
      req.consultorID = decoded.id;
      next();
  } catch (err) {
    return res.status(401).json({ Mensagem: 'Token inválido'})
  }  
}