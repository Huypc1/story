const {Author,Story,Comment, Tap,User,Reply} = require('../model/model');


const replyController ={
    addReply: async (req ,res) =>{
        try {
            const commentNew = new Reply(req.body);
            const saveComment= await commentNew.save();
            if(req.body.user){
                const user = await User.findById(req.body.user);
                if (user) {
                    user.comment.push(saveComment._id);
                    await user.save();
                }
            }

            res.status(200).json(saveComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    getReply: async (req, res) => {
        try {
            const comments = await Reply.find().populate('user');
            res.status(200).json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    // getCommentReplies: async (req, res) => {
    //     try {
    //         const { commentId } = req.params;
    //         const comment = await Comment.findById(commentId).populate('replies');
    //         if (!comment) {
    //             return res.status(404).json({ message: "Comment not found" });
    //         }
    //         res.status(200).json(comment.replies);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Server Error" });
    //     }
    // }
};

module.exports = replyController;