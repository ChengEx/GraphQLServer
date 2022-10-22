import productModel from '../../model/product'

const productResolvers = {
    Query: {
        async getAllProduct(){
            try {
                const products = await productModel.find().populate('createdBy');
                return products;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getProductById(_:any, _id: String) {
            try {
                console.log("productId", _id);
                const product = await productModel.findOne({'_id':_id}).populate('createdBy');
                return product;
            }catch(err:any){
                throw new Error(err);
            }
        },
        // async getProductListByUserId(_:any, _id: String) {
        //     try {
        //         console.log("Userid", _id);
        //         const productList = await productModel.find({'createdBy': _id})
        //         return productList;
        //     }catch(err:any){
        //         throw new Error(err);
        //     }
        // }
    }
}
export default productResolvers;