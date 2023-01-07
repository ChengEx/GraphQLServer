import productModel from '../../model/product'
import categoryModel from '../../model/category'

interface userId {
    _id: string
}
interface categoryInfo {
    category: string,
    subcategory: string
}
const productResolvers = {
    Query: {
        async getAllProduct():Promise<Object | Error | null> {
            try {
                const products = await productModel.find();
                return products;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getProductById(_:any, _id: String):Promise<Object | Error | null> {
            try {
                const product = await productModel.findOne({'_id':_id});
                return product;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getProductListByUserId(_:any, _id: userId) {
            try {
                const productList = await productModel.find({'createdBy': _id});
                return productList;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getProductListByCategory(_: any, categoryInfo: categoryInfo): Promise<Object | Error | null> {
            try {
               
                const categoryObj = await categoryModel.findOne({ 'categoryNameEN': categoryInfo.category }); 
                console.log(categoryObj)
                if(categoryInfo.subcategory == null) {
                    let productList = {};
                    if(categoryObj){
                        productList = await productModel.find({ 'category': categoryObj?.categoryName, 'status': true });
                    }
                    return productList;
                }else{
                    let categoryname = {};
                    categoryObj?.subCategory.filter((item: { subCategoryNameEN: any; subCategoryName: any }) => {
                        if(item.subCategoryNameEN === categoryInfo.subcategory) {
                            categoryname = item.subCategoryName;
                        }
                    })
                    const productList = await productModel.find({ 'category': categoryObj?.categoryName,'subcategory': categoryname, 'status': true });
                    return productList; 
                }
            }catch(err: any) {
                throw new Error(err);
            }
        },

    }
}
export default productResolvers;