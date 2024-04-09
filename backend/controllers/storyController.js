const {Author, Story, Tap} = require("../model/model");
const multer = require('multer');
const path = require('path');

// Cài đặt lưu trữ multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Tệp được tải lên sẽ được lưu trong thư mục 'uploads'
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Khởi tạo multer upload
const upload = multer({ storage: storage });
const storyController ={
    addStory: async (req, res) => {
        try {
            // Xử lý tệp được tải lên trước khi tạo Story mới
            upload.single('image')(req, res, async function (err) {
                if (err) {
                    // Xử lý lỗi multer nếu có
                    return res.status(500).json(err);
                }

                // Tạo mới đối tượng Story
                const newStory = new Story(req.body);

                // Kiểm tra xem tệp đã được tải lên chưa
                if (req.file) {
                    newStory.image = req.file.path;
                }

                // Lưu câu chuyện mới vào cơ sở dữ liệu
                const savedStory = await newStory.save();

                // Cập nhật tác giả nếu được cung cấp trong request body
                if (req.body.author) {
                    const author = await Author.findById(req.body.author);
                    if (author) {
                        author.story.push(savedStory._id);
                        await author.save();
                    }
                }

                // Trả về câu chuyện vừa tạo thành công
                res.status(200).json({story:savedStory, imageUrl: `http://localhost:8000/uploads\\${req.file.filename}`});
            });
        } catch (err) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình xử lý request
            res.status(500).json(err);
        }
    },
    getStory:async (req,res)=>{
        try{
          const findStory = await Story.find();
          res.status(200).json(findStory);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    
    getAnStory:async (req,res)=>{
        try{
            const findAnAuthor = await Story.findById(req.params.id).populate("author");
            res.status(200).json(findAnAuthor);
          }
          catch(err){
              res.status(500).json(err);
          }
    },
    getTapAnStory: async (req, res) => {
        try {
            const findTapStory = await Story.findById(req.params.id);
            res.status(200).json(findTapStory);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateStory: async (req,res)=>{
        try{
          const story = await Story.findById(req.params.id);
          await story.updateOne({$set: req.body});
          res.status(200).json("updated successfully!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteStory:async (req,res)=>{
        try{
            await Author.updateMany({story: req.params.id}, {$pull: {story: req.params.id}});
            await Tap.deleteMany({story: req.params.id})
          await Story.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted successfully!");
        }catch(err){
            res.status(500).json(err);
        }
    },
}
module.exports = storyController;