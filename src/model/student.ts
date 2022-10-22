import mongoose,{ Schema } from 'mongoose';

const StudentSchema: Schema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    gender: String,
    phone: String,
    description: String,
    photo: String,
    shippingAddress: {
        city: String,
        street: String
    },
    authority: String,
    productId: {
        type: [mongoose.Types.ObjectId],
        ref:'products' 
    },
    collectionProductId: {
        type: [mongoose.Types.ObjectId],
        ref:'products'
    }
})

export default mongoose.model('students', StudentSchema);