// backend/utils/calculator.js

// Standard grading scale used in the image reference
const calculateGrade = (percentage) => {
    if (percentage > 85) return 'A+';
    if (percentage >= 76) return 'A';
    if (percentage >= 66) return 'B+';
    if (percentage >= 56) return 'B';
    if (percentage >= 51) return 'C+';
    if (percentage >= 46) return 'C';
    if (percentage >= 33) return 'D';
    return 'E';
};

const RecalculateMarksheet = (data) => {
    let grandTotal = 0;
    let totalMax = 0;

    // 1. Calculate Subject Totals and Grades
    if (data.academicPerformance && data.academicPerformance.length > 0) {
        data.academicPerformance = data.academicPerformance.map(subject => {
            const t1 = subject.term1.marksObtained || 0;
            const t2 = subject.term2.marksObtained || 0;
            
            // Assume Max Marks for T1 is 50 and T2 is 50 for simplicity in LKG
            const subTotal = t1 + t2;
            const subMax = subject.maxMarks || 100;
            const subPercentage = (subTotal / subMax) * 100;

            grandTotal += subTotal;
            totalMax += subMax;

            return {
                ...subject,
                term1: { ...subject.term1, grade: calculateGrade((t1/50)*100) }, // grade per term
                term2: { ...subject.term2, grade: calculateGrade((t2/50)*100) },
                total: {
                    marksObtained: subTotal,
                    grade: calculateGrade(subPercentage)
                }
            };
        });
    }

    // 2. Calculate Overall Consolidation
    if (totalMax > 0) {
        const overallPercentage = (grandTotal / totalMax) * 100;
        data.finalResult.grandTotal = grandTotal;
        data.finalResult.totalMaxMarks = totalMax;
        data.finalResult.overallPercentage = parseFloat(overallPercentage.toFixed(2));
        data.finalResult.overallGrade = calculateGrade(overallPercentage);
        data.finalResult.status = overallPercentage >= 33 ? 'PASS' : 'FAIL';
    }

    return data;
};

module.exports = { RecalculateMarksheet, calculateGrade };