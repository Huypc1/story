const {Author, Story, Tap} = require("../model/model");

const tapController ={
    addTap: async (req, res) => {
        try {
            const newTap = new Tap(req.body);
            const saveTap = await newTap.save();

            if (req.body.story) {
                const story = await Story.findById(req.body.story);
                if (story) {
                    story.tap.push(saveTap._id);
                    await story.save();
                }
            }
            res.status(200).json(saveTap);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllTap: async (req, res) => {
        try {
            const findAllTap = await Tap.find();
            res.status(200).json(findAllTap);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = tapController;