// backend/models/Marksheet.js
const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    marksObtained: { type: Number, default: 0 },
    grade: { type: String, default: '' }
});

const subjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    maxMarks: { type: Number, default: 100 },
    term1: markSchema,
    term2: markSchema,
    total: markSchema
});

const gradeOnlySchema = new mongoose.Schema({
    name: { type: String, required: true },
    grade: { type: String, default: '' }
});

const MarksheetSchema = new mongoose.Schema({
    // 1. Student Details
    studentInfo: {
        fullName: { type: String, required: true },
        rollNo: { type: String, required: true },
        fathersName: { type: String },
        mothersName: { type: String },
        class: { type: String, default: 'LKG' }, // or 'UKG'
        section: { type: String, default: 'A' },
        dob: { type: Date },
        dobWords: { type: String },
        scholarNo: { type: String },
        aadhaarId: { type: String },
        samagraId: { type: String },
    },
    session: { type: String, default: '2024-2025' },

    // 2. Academic Assessment (3 Subjects for LKG/UKG)
    academicPerformance: [subjectSchema],

    // 3. Co-Curricular Activities
    coCurricular: [gradeOnlySchema],

    // 4. Personal Social Qualities
    personalQualities: [gradeOnlySchema],

    // Final Result Consolidation
    finalResult: {
        grandTotal: { type: Number, default: 0 },
        totalMaxMarks: { type: Number, default: 300 }, // 3 * 100
        overallPercentage: { type: Number, default: 0 },
        overallGrade: { type: String, default: '' },
        status: { type: String, default: 'PASS' }, // PASS/FAIL
        promotedTo: { type: String, default: 'UKG' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Marksheet', MarksheetSchema);