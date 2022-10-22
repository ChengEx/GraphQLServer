import mongoose, { Schema } from 'mongoose';

const CategorySchema: Schema = new Schema({
    categoryName: String,
    categoryNameEN: String,
    subCategory: [
        {
            subCategoryName: String ,
            subCategoryNameEN: String 
        }
    ]
})

export default mongoose.model('categories', CategorySchema); 