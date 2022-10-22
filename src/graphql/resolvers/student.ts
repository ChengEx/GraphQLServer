import studentModel from '../../model/student'

// const checkAuth = require('../../util/check-auth');
// const { AuthenticationError, UserInputError } = require('apollo-server');

const studentResolvers = {
    Query: {
        async getAllStudent(){
            try{
                const students = await studentModel.find();
                return students;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getStudentInfoByUserId(_: any, _id: String) {
            try {
                const studentInfo = await studentModel.findOne({'_id': _id}).populate('productId').populate('collectionProductId');
                return studentInfo;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getProductListByUserId(_:any, _id: String) {
            try {
                const productList = await studentModel.findOne({'_id': _id}).populate('productId');
                return productList;
            }catch(err:any){
                throw new Error(err);
            }
        },
        async getCollectionListByUserId(_: any, _id: String) {
            try {
                const collectionList = await studentModel.findOne({'_id': _id}).populate('collectionProductId');
                return collectionList;
            }catch(err: any){
                throw new Error(err);
            }
        }
    },
    Mutation: {

    }
}
export default studentResolvers;