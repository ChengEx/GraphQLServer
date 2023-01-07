import categoryModel from '../../model/category';

const categoryResolvers = {
    Query: {
        async getAllCategory():Promise<Object | Error | null> {
            try {
                const categoryArray = await categoryModel.find();
                return categoryArray;
            }catch(err: any) {
                throw new Error(err);
            }
        },
        async getCategoryByPath(_: any, categoryNameEN: String):Promise<Object | Error | null> {
            try {
                const categoryObj = await categoryModel.findOne(categoryNameEN);
                return categoryObj;
            }catch(err: any) {
                throw new Error(err);
            }
        },

    }
}

export default categoryResolvers;