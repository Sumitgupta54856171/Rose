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
      default: 'A',        
    },
    roll_number: {
      type: String,
      required: true,
      trim: true,
    },
    scholar_no: {
      type: String,
      required: true,
      unique: true, // Scholar No. unique hona theek hai
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
      // unique: true HATA DIYA HAI, kyunki bohot se bacchon ka "N/A" hai
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
    
    // ==========================================
    // NAYE FIELDS (MARKS AUR REMARKS KE LIYE)
    // ==========================================
    scholastic_marks: {
      type: Object, // 'Object' type se hum isme dynamic subjects (Hindi, English, etc.) save/fetch kar sakte hain
      default: {}
    },
    attendance: {
      type: String,
      trim: true,
      default: "N/A"
    },
    class_teacher_remark: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('student_details', studentSchema);