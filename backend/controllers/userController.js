const {Author,Story,Comment,User, Tap} = require('../model/model');
const bcrypt = require('bcrypt');
const userController ={
    addUser: async (req ,res) =>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);
            const newUser = await new User({
                user: req.body.user,
                password:hashed,
                role: false
            })
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getLogin: async (req, res) => {
        try {
          const user = await User.findOne({user:req.body.user});
          if(!user){
            res.status(404).json("wrong username!");
          }
          const vailPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if(!vailPassword){
            res.status(404).json("wrong username!");
          }
          if(user && vailPassword){
            res.status(200).json(user);
          }
        } catch (error) {
            // Xử lý lỗi bằng cách log ra console và trả về lỗi 500
            console.error("Error in getLogin:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
};

module.exports = userController;