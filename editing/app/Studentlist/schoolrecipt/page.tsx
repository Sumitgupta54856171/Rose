'use client'

import  { useState, useEffect } from 'react';

// Helper function to convert numbers to Indian Rupees in words
const numberToWords = (num) => {
  if (num === 0) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const inWords = (n) => {
    if ((n = n.toString()).length > 9) return 'Overflow';
    let nArray = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!nArray) return '';
    let str = '';
    str += (nArray[1] != 0) ? (a[Number(nArray[1])] || b[nArray[1][0]] + ' ' + a[nArray[1][1]]) + 'Crore ' : '';
    str += (nArray[2] != 0) ? (a[Number(nArray[2])] || b[nArray[2][0]] + ' ' + a[nArray[2][1]]) + 'Lakh ' : '';
    str += (nArray[3] != 0) ? (a[Number(nArray[3])] || b[nArray[3][0]] + ' ' + a[nArray[3][1]]) + 'Thousand ' : '';
    str += (nArray[4] != 0) ? (a[Number(nArray[4])] || b[nArray[4][0]] + ' ' + a[nArray[4][1]]) + 'Hundred ' : '';
    str += (nArray[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(nArray[5])] || b[nArray[5][0]] + ' ' + a[nArray[5][1]]) : '';
    return str.trim();
  };

  return inWords(num) + ' Rupees Only';
};

export default function Receipt() {
  const [metaInfo, setMetaInfo] = useState({
    receiptNo: '370',
    date: '',
    studentName: '',
    guardianName: '',
    studentClass: ''
  });

  const [fees, setFees] = useState([
    { id: 1, name: 'Registration Fees', rs: '', p: '' },
    { id: 2, name: 'Admission Fees', rs: '', p: '' },
    { id: 3, name: 'Development', rs: '', p: '' },
    { id: 4, name: 'Monthly Contribution', rs: '', p: '' },
    { id: 5, name: 'Sports', rs: '', p: '' },
    { id: 6, name: 'Scout - Guide', rs: '', p: '' },
    { id: 7, name: 'Exam.', rs: '', p: '' },
    { id: 8, name: 'Computer / A/C', rs: '', p: '' },
    { id: 9, name: 'Conveyance', rs: '', p: '' },
    { id: 10, name: 'Misc', rs: '', p: '' },
  ]);

  const [totalRs, setTotalRs] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [amountInWords, setAmountInWords] = useState('');

  // Auto-calculate totals whenever fees change
  useEffect(() => {
    let sumRs = 0;
    let sumP = 0;

    fees.forEach(fee => {
      sumRs += parseInt(fee.rs) || 0;
      sumP += parseInt(fee.p) || 0;
    });

    // Convert extra paise to rupees (100 Paise = 1 Rupee)
    if (sumP >= 100) {
      sumRs += Math.floor(sumP / 100);
      sumP = sumP % 100;
    }

    setTotalRs(sumRs);
    setTotalP(sumP);

    if (sumRs > 0 || sumP > 0) {
      let wordString = numberToWords(sumRs);
      if (sumP > 0) {
        wordString = wordString.replace(' Only', ` and ${sumP} Paise Only`);
      }
      setAmountInWords(wordString);
    } else {
      setAmountInWords('');
    }
  }, [fees]);

  const handleMetaChange = (e) => {
    setMetaInfo({ ...metaInfo, [e.target.name]: e.target.value });
  };

  const handleFeeChange = (id, field, value) => {
    // Only allow numbers
    if (value !== '' && !/^\d+$/.test(value)) return;
    
    setFees(fees.map(fee => 
      fee.id === id ? { ...fee, [field]: value } : fee
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 flex flex-col items-center font-sans text-gray-900">
      
      {/* Print Specific Styles */}
      <style>{`
        @media print {
          body { background-color: white !important; }
          .no-print { display: none !important; }
          .receipt-container { 
            box-shadow: none !important; 
            border: none !important;
            padding: 0 !important;
            max-width: 100% !important;
            background-color: transparent !important;
          }
          /* Ensure borders stay black on print */
          .print-border-black { border-color: black !important; }
        }
      `}</style>

      {/* Action Buttons */}
      <div className="no-print mb-6 flex gap-4">
        <button 
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition-colors font-semibold"
        >
          Print Receipt
        </button>
      </div>

      {/* Main Receipt Container - Using a slight cream background for authentic feel */}
      <div className="receipt-container w-full max-w-2xl bg-[#faf9f1] border border-gray-300 p-8 shadow-xl relative text-[15px]">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          {/* Logo Placeholder */}
          <div className="w-20 h-20 border-2 border-gray-800 rounded-full flex flex-col items-center justify-center text-[8px] text-center p-2 font-bold leading-tight">
            <span>Rose Convent High School</span>
            <div className="mt-1 flex gap-1">
              <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
            </div>
            <span className="mt-1 text-[7px]">DELAURA SATNA</span>
          </div>

          {/* Center Titles */}
          <div className="flex flex-col items-center flex-grow px-4">
            <span className="font-bold text-lg tracking-wide mb-1">RECEIPT</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-center font-serif tracking-tight">
              Rose Convent High School
            </h1>
            <p className="font-bold text-sm md:text-base">
              Delaura, SATNA (M. P.) Mob.: 9406780812
            </p>
          </div>

          {/* Right School Code */}
          <div className="font-bold text-sm whitespace-nowrap pt-1">
            School Code : 312354
          </div>
        </div>

        {/* Meta Fields Top Row */}
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-end gap-2">
            <span className="font-bold">No.</span>
            <input 
              type="text" 
              name="receiptNo"
              value={metaInfo.receiptNo}
              onChange={handleMetaChange}
              className="text-red-600 font-bold text-xl bg-transparent outline-none w-24 border-b border-transparent hover:border-gray-300 focus:border-red-400"
            />
          </div>
          <div className="flex items-end gap-2">
            <span className="font-bold">Date</span>
            <input 
              type="text" 
              name="date"
              value={metaInfo.date}
              onChange={handleMetaChange}
              className="border-b-[1.5px] border-dotted border-gray-600 bg-transparent outline-none w-32 px-1 text-center font-mono"
            />
          </div>
        </div>

        {/* Student Name */}
        <div className="flex items-end mb-4">
          <span className="font-bold mr-2 whitespace-nowrap">Student Name</span>
          <input 
            type="text" 
            name="studentName"
            value={metaInfo.studentName}
            onChange={handleMetaChange}
            className="flex-grow border-b-[1.5px] border-dotted border-gray-600 bg-transparent outline-none px-2 font-bold text-gray-800"
          />
        </div>

        {/* Guardian Name & Class */}
        <div className="flex flex-col sm:flex-row items-end gap-4 sm:gap-2 mb-6">
          <div className="flex items-end flex-grow w-full">
            <span className="font-bold mr-2 whitespace-nowrap">Guardian's Name</span>
            <input 
              type="text" 
              name="guardianName"
              value={metaInfo.guardianName}
              onChange={handleMetaChange}
              className="flex-grow border-b-[1.5px] border-dotted border-gray-600 bg-transparent outline-none px-2 font-bold text-gray-800"
            />
          </div>
          <div className="flex items-end w-full sm:w-auto mt-2 sm:mt-0">
            <span className="font-bold mr-2 whitespace-nowrap">Class</span>
            <input 
              type="text" 
              name="studentClass"
              value={metaInfo.studentClass}
              onChange={handleMetaChange}
              className="flex-grow sm:w-32 border-b-[1.5px] border-dotted border-gray-600 bg-transparent outline-none px-2 text-center font-bold"
            />
          </div>
        </div>

        {/* Fees Table */}
        <table className="w-full border-collapse border border-black mb-6 print-border-black font-semibold">
          <thead>
            <tr>
              <th className="border border-black print-border-black py-1 px-2 w-[10%] text-center">Sl.</th>
              <th className="border border-black print-border-black py-1 px-2 w-[60%] text-left">Particulars</th>
              <th className="border border-black print-border-black py-0 px-0 w-[30%] text-center align-top h-full">
                <div className="border-b border-black print-border-black py-0.5">Amount</div>
                <div className="flex w-full h-full">
                  <div className="w-[70%] border-r border-black print-border-black py-0.5">Rs.</div>
                  <div className="w-[30%] py-0.5">P.</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td className="border border-black print-border-black py-1 px-2 text-center">{fee.id}.</td>
                <td className="border border-black print-border-black py-1 px-2">{fee.name}</td>
                <td className="border border-black print-border-black p-0 h-full">
                  <div className="flex w-full h-full min-h-[1.75rem]">
                    <div className="w-[70%] border-r border-black print-border-black h-full flex items-center">
                      <input 
                        type="text" 
                        value={fee.rs}
                        onChange={(e) => handleFeeChange(fee.id, 'rs', e.target.value)}
                        className="w-full bg-transparent outline-none text-right px-2 font-mono"
                      />
                    </div>
                    <div className="w-[30%] h-full flex items-center">
                      <input 
                        type="text" 
                        value={fee.p}
                        maxLength="2"
                        onChange={(e) => handleFeeChange(fee.id, 'p', e.target.value)}
                        className="w-full bg-transparent outline-none text-center px-1 font-mono"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Total Row */}
            <tr>
              <td colSpan="2" className="border border-black print-border-black py-1.5 px-4 text-center font-bold text-lg">
                TOTAL
              </td>
              <td className="border border-black print-border-black p-0 h-full">
                <div className="flex w-full h-full min-h-[2rem]">
                  <div className="w-[70%] border-r border-black print-border-black h-full flex items-center justify-end px-2 font-mono font-bold text-lg bg-gray-100">
                    {totalRs > 0 ? totalRs : ''}
                  </div>
                  <div className="w-[30%] h-full flex items-center justify-center font-mono font-bold text-lg bg-gray-100">
                    {totalP > 0 ? totalP.toString().padStart(2, '0') : ''}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer Area */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-end">
            <span className="font-bold mr-2 whitespace-nowrap text-lg">Total in words</span>
            <input 
              type="text" 
              value={amountInWords}
              onChange={(e) => setAmountInWords(e.target.value)}
              className="flex-grow border-b-[1.5px] border-dotted border-gray-600 bg-transparent outline-none px-2 font-bold italic text-gray-800 capitalize"
            />
          </div>
          <div className="w-full mt-2">
            <input 
              disabled
              className="w-full border-b-[1.5px] border-dotted border-gray-600 bg-transparent outline-none h-4"
            />
          </div>
        </div>

        {/* Signature */}
        <div className="flex justify-end mt-16 mb-4">
          <span className="font-bold text-lg border-t-0 px-4 pt-2 border-gray-800 min-w-[120px] text-center relative">
            <div className="absolute top-0 left-0 w-full border-b-[1.5px] border-dotted border-gray-600"></div>
            Signature
          </span>
        </div>

      </div>
    </div>
  );
}

