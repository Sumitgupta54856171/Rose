const express = require("express")
const router= express.Router()
const Student = require('../model/Student')
const Marksheet = require("../model/Marksheet")
const  {RecalculateMarksheet} = require('../utils/calculator')
const path = require('path')

router.use(express.static(path.join(__dirname, '../view')))
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
    console.log("Update student id:", req.params.id);
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

router.get('/student/:class', async (req, res) => {
  try {
    console.log("code is running")
    const studentClass  = req.params.class;
    console.log(studentClass)
    if (!studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Class parameter is required',
      });
    }
    const classstudentdetail = await Student.find({ class: studentClass });
    console.log(classstudentdetail)
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

router.get("/marksheet/:id", async (req, res) => {
  try {
    console.log("Fetching marksheet for student ID:", req.params.id);

    const student = await Student.findById(req.params.id).lean();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No student found with this ID',
      });
    }

    console.log("Student Data Fetched:", student.student_name);

    student.section = student.section || 'A';
    student.scholastic_marks = student.scholastic_marks || {};

    if (!student.co_scholastic_grades) {
      student.co_scholastic_grades = {
        literary_skills: 'A',
        regularity: 'A+',
        environmental_consciousness: 'A',
        scientific_skills: 'A',
        punctuality: 'A+',
        leadership_qualities: 'A',
        cultural_skills: 'A',
        cleanliness: 'A+',
        truthfulness: 'A+',
        creativity: 'A',
        discipline: 'A',
        honesty: 'A+',
        sports: 'A',
        co_operation: 'A+',
        expressive: 'A'
      };
    }

    if (!student.attendance) student.attendance = '195/220';
    if (!student.class_teacher_remark) student.class_teacher_remark = 'Excellent Performance';

    const data = {
      logo: LOGO,
      session: '2025 - 2026',
      student
    };

    res.render('Marksheet', data);

  } catch (err) {
    console.error("Error generating marksheet:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;