const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      trim: true,
      default: null,        
    },
    roll_number: {
      type: String,
      required: true,
      trim: true,
    },
    scholar_no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    student_name: {
      type: String,
      required: true,
      trim: true,
    },
    mother_name: {
      type: String,
      required: true,
      trim: true,
    },
    father_name: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      trim: true,
      default:'N/A'
    },
    dob_in_words: {
      type: String,
      trim: true,
      default: 'N/A',         
    },
    caste: {
      type: String,
      required: true,
      trim: true,
    },
    aadhar_number: {
      type: String,
      unique: true,
      trim: true,
      default:"N/A"
    },
    appar_id: {
      type: String,
      trim: true,
      default: "N/A",
    },
    samagra_id: {
      type: String,
      trim: true,
      default: "N/A",
    },
    dis_code: {
      type: String,
      trim: true,
      default: 'N/A',        
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', studentSchema);