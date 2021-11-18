import authConfig from '../../config/auth';

export default async ( req, res, next ) => {
  const apiKey = req.headers.apikey
  if (!apiKey){
    return res.status(401).json({ Mensagem: 'Disponivel apenas para serviços registrados'})
  }
  
  if (apiKey == authConfig.gatewayKey){
    next();
  }
  else return res.status(401).json({ Mensagem: 'ApiKey inválida'})


}