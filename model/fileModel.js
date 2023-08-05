const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
      name: {
        type: String,
        required: [true, "Uploaded file must have a name"],
      },
})

const File = mongoose.model("File", fileSchema);

module.exports = File