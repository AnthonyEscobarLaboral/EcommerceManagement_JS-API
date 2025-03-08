import { Schema, model } from "mongoose";

const cartSchema = Schema({
    client: {
        type: Schema.Types.ObjectId,
        required: [true, "Client is required"],
        ref: "User",
        unique: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            purchased: {
                type: Number
            }
        }
    ],
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["EMPTY", "HOLD", "BOUGHT"],
        default: "EMPTY"
    },
    expiresAt: { type: Date, required: false }
},
    {
        versionKey: false,
        timestamps: true
    });

cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

cartSchema.methods.toJSON = function () {
    const { _id, ...cartDb } = this.toObject();
    cartDb.sip = _id;
    return cartDb;
};

export default model("Cart", cartSchema);
