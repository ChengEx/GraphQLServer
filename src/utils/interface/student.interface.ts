import { Document } from 'mongoose';

export default interface IStudent{
    _id: string,
    username: string,
    password: string,
    name: string,
    email: string,
    gender: string,
    phone: string,
    shippingAddress:{
        city: string,
        street: string
    },
    productId: [string],
    collectionProductId: [string],
    token: string
}