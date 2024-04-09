const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    year: {
        type: String,
    },
    story: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    }]
});

const storySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: [String]
    },
    image: {
        type: String,
        // Assuming the image is stored as a path or URL
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }],
    tap: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tap"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    dateCreate: {
        type: Date,
        default: Date.now
    },
});

const tapSchema = new mongoose.Schema({
    name: {
        type: String
    },
    content: {
        type: String
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
const userSchema = new mongoose.Schema({
    user:{
        type: String,
    },
    password:{
        type: String,
    },
    role:{
        type:Boolean,
    },
    comment_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    story_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null // Comment mẹ mặc định là null
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    level: {
        type: Number,
        default: 0
    }
});

const Story = mongoose.model("Story", storySchema);
const Author = mongoose.model("Author", authorSchema);
const Tap = mongoose.model("Tap", tapSchema);
const Comment = mongoose.model("Comment", commentSchema);
const User = mongoose.model("User", userSchema);
module.exports = { Story, Author, Tap, Comment,User };

