import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string; // busca id do usuario no token
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    // receber o token
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ")
    try{
        // validar o token - sub pega o id do usuario
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

        // recuperar id do token e colocar na variavel user_id dentro do req (express)
        req.user_id = sub;
        //console.log(sub);
        return next();
    }catch{
        return res.status(401).end();
    }
    

}