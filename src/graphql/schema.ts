import { gql } from 'apollo-server';
const schema = gql(`
    type Student {
        id: ID
        username: String
        password: String
        name: String
        email: String
        gender: String
        phone: String
        description: String
        photo: String
        productId: [Product]
        collectionProductId: [Product]
        token: String
    }

    type Product {
        id: ID
        name: String
        category: Category
        subcategory: String
        productDetail: ProductDetail
        createdBy: Student
    }

    type ProductDetail {
        images: [String]
        description: String
        price: Int
        status: String
    }
    
    type Category {
        categoryName: String,
        categoryNameEN: String,
        subCategory: [SubCategory]
    }

    type SubCategory {
        subCategoryName: String
        subCategoryNameEN: String 
    }

    type Query {
        getAllStudent: [Student]
        getPersonalInformation(_id: String): Student
        getProductListByUserId(_id: String): Student
        getCollectionListByUserId(_id: String): Student
       

        getAllProduct: [Product]
        getProductById(_id: String): Product
        getProductListByCategory(category: String, subcategory: String): [Product]

        getAllCategory: [Category]
        getCategoryByPath(categoryNameEN: String): Category
    }

    type Mutation {
        login(username: String!, password: String!): Student
        register(registerInput: RegisterInput): Student
        updateInformation(updateInformationInput: UpdateInformationInput): Student
        changePassword(changePasswordInput: ChangePasswordInput): Student
    }

    input RegisterInput {
        username: String
        password: String
        name: String
        email: String
        gender: String
        phone: String
    }

    input UpdateInformationInput {
        _id: String
        photo: String
        name: String
        email: String
        phone: String
        description: String
    }

    input ChangePasswordInput {
        _id: String
        oldPassword: String
        newPassword: String
    }

`)

export default schema;