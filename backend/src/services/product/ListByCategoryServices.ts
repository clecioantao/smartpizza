import { prismaClient } from '../../prisma';

interface ProductRequest{
    category_id: string
}

class ListByCategoryServices{
    async execute({ category_id }: ProductRequest){
        // exemplo: id das bebidas
        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }
        })
        
        return findByCategory;

    }
}

export { ListByCategoryServices }