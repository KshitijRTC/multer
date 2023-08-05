const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const path = require("path");
const File = require("./model/fileModel");
const multer = require("multer")


const app = express();

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})
app.post("/api/uploadFile",upload.single("myFile"), async (req, res) => {
    try{
        const newFile = await File.create({
            name: req.file.filename 
        })
        res.status(200).json({
            status: "success",
            message: "file uploaded successfully"
        })
    }
    catch(err){
        console.log(err)
    }
})



app.use("/", (req, res) => {
    res.status(200).render("index");
})

mongoose.connect("mongodb+srv://kshitijupmanyu101:Kshitij_01@cluster0.tiqebv1.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected");
    app.listen(4000)
})
.catch((err) => {
    console.log(err)
})