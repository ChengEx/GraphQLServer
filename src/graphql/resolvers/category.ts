import categoryModel from '../../model/category';

const categoryResolvers = {
    Query: {
        async getAllCategory() {
            try {
                const categoryArray = await categoryModel.find();
                return categoryArray;
            }catch(err: any) {
                throw new Error(err);
            }
        },
        async getCategoryByPath(_: any, path: String) {
            try {

            }catch(err: any) {
                throw new Error(err);
            }
        }
    }
}

export default categoryResolvers;