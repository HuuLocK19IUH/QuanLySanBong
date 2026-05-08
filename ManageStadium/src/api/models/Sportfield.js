import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SportFieldSchema = new Schema({
    sportfield_id: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    sportfield_type: {
        type: String
    },
    state: {
        type: Boolean
    },
    img_url: {
        type: String
    },
    total_rating: {
        type: Number
    },
    avg_rating: {
        type: Number
    },
    img_descrip: [{
        type: String
    }],
    keywords: [{
        type: String
    }],
    description: {
        short_description: String,
        loaimatsan: String,
        hethongchieusang: String,
        giothuhoatdong: String,
        dieukhoan_quydinh: String
    },
    pricing: [{
        startTime: Number,
        endTime: Number,
        price: Number,
        days: [String]
    }]
}, {
    timestamps: true
});

export default model('SportField', SportFieldSchema);