const mongoose = require('mongoose');


const ChapterSchema = new mongoose.Schema({
    chapterName: {
      type: String,
      required: true,
    },
    pageNumber: {
        type: Number,
        // required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

ChapterSchema.pre('save', async function (next) {
   
    try {
      if (this.isNew) {
        const lastChapter = await Chapter.findOne({}, {}, { sort: { 'pageNumber': -1 } });
        if (lastChapter) {
          this.pageNumber = (lastChapter?.pageNumber && lastChapter.pageNumber + 1);
        } else {
          this.pageNumber = 1; // If no chapters exist, start with 1
        }
      }
      next();
    } catch (error) {
        console.log(error);     
        next();
    }
});

module.exports = mongoose.model("Chapter", ChapterSchema);
