import studentModel from '../../model/student'
import bcrypt from 'bcryptjs';
import token from '../../utils/token';
import Student from '../../utils/interface/student.interface';

// const checkAuth = require('../../util/check-auth');
// const { AuthenticationError, UserInputError } = require('apollo-server');
interface loginInfo {
    username: string,
    password: string       
}
interface registerInfo {
    registerInput:{
        username: string
        password: string
        name: string
        email: string
        gender: string
        phone: string
    }
}
interface updateInformationInfo {
    updateInformationInput: {
        _id: string,
        photo: string,
        name: string,
        email: string,
        phone: string,
        description: string
    }
}
interface changePasswordInfo {
    changePasswordInput: {
        _id: string,
        oldPassword: string,
        newPassword: string
    }
}
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
        async getPersonalInformation(_: any, _id: String) {
            try {
                const studentInfo = await studentModel.findOne({'_id': _id}).populate('productId').populate('collectionProductId');
                return studentInfo;
            }catch(err:any){
                throw new Error(err);
            }
        },
        // async getProductListByUserId(_:any, _id: String) {
        //     try {
        //         const productList = await studentModel.findOne({'_id': _id}).populate('productId').populate('collectionProductId');
        //         return productList;
        //     }catch(err:any){
        //         throw new Error(err);
        //     }
        // },
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
        async login(_:any, loginInfo: loginInfo):Promise<Object | Error | null> {
            try {
                let oldUser: Student | null;
                oldUser = await studentModel.findOne({'username': loginInfo.username});
                if(!oldUser) throw new Error("Student doesn't exist");
                 
                const comparedPassword = await bcrypt.compare(loginInfo.password, oldUser.password);
                if(!comparedPassword) throw new Error("wrong password!");

                oldUser.token = token.createToken(oldUser);               
                return oldUser;
            }catch(err: any) {
                throw new Error(err);
            }
        },
        async register(_: any, registerInfo: registerInfo):Promise<Object | Error | null> {
            try {
                let oldUser: Student | null;
                oldUser = await studentModel.findOne({'username': registerInfo.registerInput.username});
                if(oldUser) throw new Error("Username exist");

                const hashedPassword = await bcrypt.hash(registerInfo.registerInput.password, 12);

                const authority = "0";
                const user = await studentModel.create({
                    username: registerInfo.registerInput.username,
                    password: hashedPassword,
                    name: registerInfo.registerInput.name,
                    email: registerInfo.registerInput.email,
                    gender: registerInfo.registerInput.gender,
                    phone: registerInfo.registerInput.phone,
                    authority
                });
                return user;          
            }catch(err: any) {
                throw new Error(err);
            }
        },
        async updateInformation(_: any, updateInformationInfo: updateInformationInfo):Promise<Object | Error | null> {
            try {
                await studentModel.findByIdAndUpdate(
                    updateInformationInfo.updateInformationInput._id, {
                        photo: updateInformationInfo.updateInformationInput.photo,
                        name: updateInformationInfo.updateInformationInput.name,
                        email: updateInformationInfo.updateInformationInput.email,
                        phone: updateInformationInfo.updateInformationInput.phone,
                        description: updateInformationInfo.updateInformationInput.description
                    }
                )
                const studentInfo = await studentModel.findOne({
                    '_id':updateInformationInfo.updateInformationInput._id
                }).populate('productId')
                .populate('collectionProductId');
                return studentInfo;
            }catch(err: any) {
                throw new Error(err);
            }
        },
        async changePassword(_: any, changePasswordInfo: changePasswordInfo): Promise<Object | Error | null> {
            try {
                const changePasswordUser = await studentModel.findById(changePasswordInfo.changePasswordInput._id);
                if(!changePasswordUser) throw new Error("User doesn't exist");

                const comparePassword = await bcrypt.compare(changePasswordInfo.changePasswordInput.oldPassword, changePasswordUser?.password);
                if(!comparePassword) throw new Error("Your password is not correct !");

                const hashedPassword = await bcrypt.hash(changePasswordInfo.changePasswordInput.newPassword, 12)
                const newPasswordObj = await studentModel.findByIdAndUpdate(
                    changePasswordInfo.changePasswordInput._id,{
                        password: hashedPassword
                    }
                )
                return newPasswordObj;
            }catch(err: any) {
                throw new Error(err);
            }
        }
    }
}
export default studentResolvers;