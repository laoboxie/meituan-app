import mongoose from "mongoose"

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,    
  },
  parentCode: {
    type: String,
    required: false
  },
  provinceCode: {
    type: String,
    required: false
  },
  cityCode: {
    type: String,
    required: false
  },
})

const Region = mongoose.model('Region', RegionSchema)

export default Region