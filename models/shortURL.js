import mongoose from "mongoose";
import shortid from  'shortid'

mongoose.connect("mongodb://localhost:27017/URL_shortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const m = mongoose.connection

m.on('open', ()=> {
    console.log("connected")
})

const shortURLSchema = new mongoose.Schema({
    full : {type: String, required: true},
    short: {type: String, required: true, default: shortid.generate}
})



export const shortURL = mongoose.model('shortURL',shortURLSchema)