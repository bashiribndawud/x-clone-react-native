import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment', 'follow', 'retweet', 'mention', 'reply'],
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    message: {
        type: String,
        required: false,
        maxLength: 280
    },
    read: {
        type: Boolean,
        default: false
    }
    
},{
    timestamps: true
})

export const Notification = mongoose.model('Notification', notificationSchema);