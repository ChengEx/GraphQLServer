import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema = new Schema({
    name: String,
    category: String,
    subcategory: String,
    productDetail:{
        images: [String],
        description: String,
        price: Number,
        status: String
    },
    createdBy: { 
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
    status: Boolean
},
    { timestamps: true }
)

export default mongoose.model('products',ProductSchema);
