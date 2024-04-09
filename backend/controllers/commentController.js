const {Author,Story,Comment, Tap,User} = require('../model/model');


const commentController ={
    addComment: async (req, res) => {
        try {
            const { content, user, story_id, parentComment } = req.body;
            
            // Kiểm tra xem parentComment có tồn tại không để xác định cấp độ của bình luận mới
            let level = 0;
            if (parentComment) {
                const parent = await Comment.findById(parentComment);
                if (!parent) {
                    return res.status(404).json({ error: "Parent comment not found" });
                }
                level = parent.level + 1;
            }
    
            const comment = new Comment({
                content,
                user,
                story_id,
                parentComment,
                level
            });
    
            await comment.save();
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    getComments: async (req, res) => {
        try {
            // Lấy tất cả các bình luận, bao gồm cả thông tin về người dùng và các phản hồi
            const allComments = await Comment.find().populate("user").populate("replies");
    
            // Sắp xếp lại các bình luận theo thứ tự mong muốn
            const sortedComments = [];
    
            // Hàm đệ quy để xử lý các cấp bình luận
            const processComments = (parentComment, level) => {
                const childComments = allComments.filter(comment => comment.parentComment && comment.parentComment.toString() === parentComment._id.toString());
                
                childComments.forEach(comment => {
                    comment.level = level;
                    sortedComments.push(comment);
                    processComments(comment, level + 1);
                });
            };
    
            // Bắt đầu với các bình luận cấp độ 0 (cha level 0)
            const level0Comments = allComments.filter(comment => !comment.parentComment);
    
            level0Comments.forEach(comment => {
                comment.level = 0; // Gán cấp độ 0 cho bình luận cha
                sortedComments.push(comment); // Thêm bình luận cấp độ 0 vào mảng đã sắp xếp
                processComments(comment, 1); // Xử lý các bình luận con với cấp độ 1
            });
            res.status(200).json(sortedComments);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
    

    

    
    



};

module.exports = commentController;