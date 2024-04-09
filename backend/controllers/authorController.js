const {Author, Story, Tap} = require("../model/model");

const authorController ={
    addAuthor: async (req,res)=>{
        try{
            const newAuthor = new Author(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor);
        }catch(err){
            res.status(500).json(err);
        }
   },
   getAuthor: async (req,res)=>{
    try{
        const newAuthor = await Author.find();
        res.status(200).json(newAuthor);
    }catch(err){
        res.status(500).json(err);
    }
},
getAnAuthor:async (req,res)=>{
    try{
      const findAnAuthor = await Author.findById(req.params.id).populate("story");
      res.status(200).json(findAnAuthor);
    }
    catch(err){
        res.status(500).json(err);
    }
},
updateAuthor:async(req,res)=>{
    try{
       const author = await Author.findById(req.params.id);
       await author.updateOne({$set : req.body});
       res.status(200).json("Updated Successfully!");
    }catch(err){
        res.status(500).json(err);
    }
}
}
module.exports = authorController;