import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Product name is needed"],
        maxLength: [50, "The product name cannot exceed 50 characters"],
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number    ,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
    },
    totalProduct: {
        type: Number,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

productSchema.pre('save', function (next) {
    if (this.isModified('sold')) {
        this.totalProduct = this.totalProduct - this.sold;
    }
    next();
});

productSchema.methods.toJSON = function () {
    const { _id, ...productDb } = this.toObject()
    productDb.pid = _id
    return productDb
}

export default model("Product", productSchema)