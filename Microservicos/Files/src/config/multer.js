import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'public'),
    filename: ( req, file, cb ) => {
      crypto.randomBytes(15, (err, res) => {
        if(err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      })
    }
  })
}