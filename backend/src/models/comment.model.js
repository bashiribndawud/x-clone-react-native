import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 280
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    unlike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    retweetOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    retweetBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    retweetCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    replyCount: {
        type: Number,
        default: 0
    },
    isReply: {
        type: Boolean,
        default: false
    },
    isRetweet: {
        type: Boolean,
        default: false
    },
    isQuote: {
        type: Boolean,
        default: false
    },
    quoteOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    quoteBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    quoteCount: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isRetweeted: {
        type: Boolean,
        default: false
    },
    isQuoted: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
