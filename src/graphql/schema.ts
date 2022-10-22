import { gql } from 'apollo-server';
const schema = gql(`
    type Student {
        id: ID!
        username: String!
        password: String!
        name: String!
        email: String!
        gender: String!
        phone: String!
        description: String
        photo: String
        productId: [Product]
        collectionProductId: [Product]
    }

    type Product {
        id: ID
        name: String
        category: String
        subcategory: String
        productDetail: ProductDetail
        createdBy: Student
    }

    type ProductDetail {
        images: [String]
        description: String!
        price: Int!
        status: String!
    }
    
    type Category {
        categoryName: String,
        categoryNameEN: String,
        subCategory: [SubCategory]
    }

    type SubCategory {
        subCategoryName: String ,
        subCategoryNameEN: String 
    }

    type Query{
        getAllStudent: [Student]!
        getStudentInfoByUserId(_id: String): Student
        getProductListByUserId(_id: String): Student
        getCollectionListByUserId(_id: String): Student

        getAllProduct: [Product]!
        getProductById(_id: String): Product

        getAllCategory: [Category]
        getCategoryByPath(categoryNameEN: String): Category
    }

`)

export default schema;