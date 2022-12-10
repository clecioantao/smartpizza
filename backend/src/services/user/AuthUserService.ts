import  { prismaClient }  from "../../prisma";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        //console.log(email);
        // verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuario nao encontrado")
        }

        // verificar se a senha esta correta
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch){
            throw new Error("Senha invalida")
        }

        // Estando tudo correto, gerar token JWT (Jason Web Token) e devolver os dados
        const token = sign({
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET, // desabilitar tsconfig.json "strict": false, // reiniciar vscode
        {
            subject: user.id,
            expiresIn: '30d'
        }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token 
        }

    }
}

export { AuthUserService }