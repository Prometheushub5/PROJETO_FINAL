require ('dotenv/config')
export default {
  secret:process.env.AUTH_SECRET,
  expiresIn:process.env.AUTH_EXPIRE,
  gatewayKey:process.env.GATEWAY_API_KEY
}