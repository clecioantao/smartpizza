import crypto from 'crypto'; // ja vem com o NodeJS
import multer from 'multer'; // Biblioteca instalada

import { extname, resolve } from 'path'; // ja vem com o NodeJS

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder ),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`
                    return callback(null, fileName)
                }
            })
        }
    }
}

