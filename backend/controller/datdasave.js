const express = require("express")
const router= express.Router()
const Student = require('../model/Student')
const Marksheet = require("../model/Marksheet")
const  {RecalculateMarksheet} = require('../utils/calculator')
const path = require('path')

router.use(express.static(path.join(__dirname,'../views')))
router.post('/student', async (req, res) => {
  try {
    console.log(req.body)
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json({
      success: true,
      message: 'Student saved successfully',
      data: saved,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

router.get('/hello',(req,res)=>{
  return res.json({message:"hello world"})  
})

// ─────────────────────────────────────────────
// @route   GET /api/students
// @desc    Get all students
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    console.log("code is running")
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ─────────────────────────────────────────────
// @route   GET /marksheet
// @desc    Get marksheet view
// ─────────────────────────────────────────────
const LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmSdkQA9QICwPUB0LIGepSKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAABxjcHJ0AAABDAAAAAx3dHB0AAABGAAAABRyWFlaAAABLAAAABRnWFlaAAABQAAAABRiWFlaAAABVAAAABRyVFJDAAABaAAAAGBnVFJDAAABaAAAAGBiVFJDAAABaAAAAGBkZXNjAAAAAAAAAAV1UkdCAAAAAAAAAAAAAAAAdGV4dAAAAABDQzAAWFlaIAAAAAAAAPNUAAEAAAABFslYWVogAAAAAAAAb6AAADjyAAADj1hZWiAAAAAAAABilgAAt4kAABjaWFlaIAAAAAAAACSgAAAPhQAAtsRjdXJ2AAAAAAAAACoAAAB8APgBnAJ1A4MEyQZOCBIKGAxiDvQRzxT2GGocLiBDJKwpai5+M+s5sz/WRldNNlR2XBdkHWyGdVZ+jYgskjacq6eMstu+mcrH12Xkd/H5////2wBDAAkGBwgHBgkICAgKCgkLDhcPDg0NDhwUFREXIh4jIyEeICAlKjUtJScyKCAgLj8vMjc5PDw8JC1CRkE6RjU7PDn/wAARCAKKAooDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oAMBAAIRAxEAPwD3+ii";
router.get("/marksheet/:id",async(req,res)=>{
  try{
    console.log("code is running")
   const student = await Student.findById(req.params.id);
   if (!student || student.length === 0) {
     return res.status(404).json({
       success: false,
       message: 'No students found',
     });
   }
   console.log(student)
   const data = {
        logo: LOGO,
        session: "2025 - 2026",
        student: {
            name: student[0].student_name,
            rollNo: student[0].roll_number,
            fathersName: student[0].father_name,
            mothersName: student[0].mother_name,
            classSection: `${student[0].class} — ${student[0].section || 'A'}`,
            dob: student[0].dob,
            dobWords: student[0].dob_in_words,
            scholarNo: student[0].scholar_no,
            aadhaarId: student[0].aadhar_number,
            aparId: student[0].appar_id,
            samagraId: student[0].samagra_id,
            caste: student[0].caste,
            diseCode: student[0].dis_code,
            promotedTo: 'UKG' // Default or calculate based on class
        },
        // 3 MAIN SUBJECTS FOR LKG-UKG
        marks: [
            { subject: "English (First Lang.)", test: 8, half: 17, annual: 48, project: 9 },
            { subject: "Hindi (Second Lang.)", test: 9, half: 18, annual: 52, project: 9 },
            { subject: "Mathematics", test: 10, half: 19, annual: 55, project: 10 },
            {subject: "EVS", test: 9, half: 18, annual: 50, project: 9 }
        ],
        coCurricular: [
            { activity: "🎭 Literary", grade: "A", gradeLevel: 80 },
            { activity: "🎨 Cultural", grade: "A+", gradeLevel: 95 },
            { activity: "🔭 Scientific", grade: "A+", gradeLevel: 90 },
            { activity: "✏️ Creative Arts", grade: "A", gradeLevel: 82 },
            { activity: "⚽ Sports & Games", grade: "B+", gradeLevel: 70 },
            { activity: "🌟 Club / Ojas", grade: "A", gradeLevel: 78 }
        ],
        personalQualities: [
            { quality: "Regularity & Punctuality", grade: "A+", gradeLevel: 90 },
            { quality: "Cleanliness", grade: "A+", gradeLevel: 95 },
            { quality: "Discipline / Diligence", grade: "A", gradeLevel: 80 },
            { quality: "Spirit of Co-operation", grade: "A", gradeLevel: 82 },
            { quality: "Leadership Ability", grade: "B+", gradeLevel: 72 },
            { quality: "Environmental Sensitivity", grade: "A", gradeLevel: 79 },
            { quality: "Truthfulness & Honesty", grade: "A+", gradeLevel: 92 }
        ]
    };
    res.render('Marksheet', data)  
  }catch(err){
    console.error(err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

// ─────────────────────────────────────────────
// @route   GET /api/students/:id
// @desc    Get single student by ID
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ─────────────────────────────────────────────
// @route   PUT /api/marksheet/:id
// @desc    Edit / Update marksheet by ID
// ─────────────────────────────────────────────
router.put('/marksheet/:id', async (req, res) => {
    try {
        let incomingData = req.body;

        // CRUCIAL: Perform calculations on backend before saving
        const calculatedData = RecalculateMarksheet(incomingData);

        const updatedMarksheet = await Marksheet.findByIdAndUpdate(
            req.params.id,
            calculatedData,
            { new: true, runValidators: true }
        );

        if (!updatedMarksheet) {
            return res.status(404).json({ message: "Marksheet not found" });
        }

        res.json(updatedMarksheet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ─────────────────────────────────────────────
// @route   PUT /api/students/:id
// @desc    Edit / Update student by ID
// ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// ─────────────────────────────────────────────
// @route   DELETE /api/students/:id
// @desc    Delete student by ID
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.put('/marksheet/:id', async (req, res) => {
    try {
        let incomingData = req.body;

        // CRUCIAL: Perform calculations on backend before saving
        const calculatedData = RecalculateMarksheet(incomingData);

        const updatedMarksheet = await Marksheet.findByIdAndUpdate(
            req.params.id,
            calculatedData,
            { new: true, runValidators: true }
        );

        if (!updatedMarksheet) {
            return res.status(404).json({ message: "Marksheet not found" });
        }

        res.json(updatedMarksheet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/student', async (req, res) => {
  try {
    const { class: studentClass } = req.query;
    if (!studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Class parameter is required',
      });
    }
    const classstudentdetail = await Student.find({ class: studentClass });
    res.status(200).json({
      success: true,
      count: classstudentdetail.length,
      data: classstudentdetail,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;