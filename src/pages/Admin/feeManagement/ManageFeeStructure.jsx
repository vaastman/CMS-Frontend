import { useState } from "react";
import { FaSave } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const createRow = (name, defaultValue = 0) => ({
  name,
  values: Array(8).fill(defaultValue),
});


const ManageFeeStructure = () => {
  const [partA, setPartA] = useState([
    createRow("Admission Fee", 1350),
    createRow("Tuition Fee", 600),
    createRow("Cultural Charges", 25),
  ]);

  const [partB, setPartB] = useState([
    createRow("Library", 200),
    createRow("Electricity", 200),
    createRow("Identity Card", 100),
    createRow("NSS Fee", 50),
    createRow("Building Maintenance Fund", 100),
    createRow("Medical Fee", 100),
    createRow("Athletics Fund", 100),
    createRow("Common Room Fund", 50),
    createRow("Co-Curricular", 50),
    createRow("Environmental", 50),
    createRow("Student Welfare Fee", 30),
    createRow("Student Union Fee", 100),
    createRow("Society Subscription", 50),
    createRow("Magazine Fund", 50),
    createRow("Handbook/Directory", 50),
  ]);

const downloadPDF = () => {
  const doc = new jsPDF();

  const headers = ["Head / Item", ...semesters.map((s) => `Sem ${s}`)];

  const rows = [];

  const addRows = (data) => {
    data.forEach((row) => {
      rows.push([
        row.name,
        ...row.values.map((v) => `₹${Number(v).toFixed(0)}`),
      ]);
    });
  };

  addRows(partA);
  addRows(partB);

  rows.push([
    "Grand Total",
    ...semesters.map((_, i) => `₹${calculateGrandTotal(i)}`),
  ]);

  doc.setFontSize(16);
  doc.text("Semester Fee Structure", 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [headers],
    body: rows,

    styles: {
      fontSize: 10,
      cellPadding: 3,
      halign: "center",
      valign: "middle",
    },

    headStyles: {
      fillColor: [40, 116, 166],
      textColor: 255,
      fontStyle: "bold",
    },

    columnStyles: {
      0: { halign: "left", cellWidth: 50 }, // Head column
    },

    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  doc.save("fee-structure.pdf");
};
  const handleChange = (section, rowIndex, semIndex, value) => {
    const updater = section === "A" ? [...partA] : [...partB];
    updater[rowIndex].values[semIndex] = Number(value);

    section === "A" ? setPartA(updater) : setPartB(updater);
  };

  const calculateTotal = (section, semIndex) => {
    const rows = section === "A" ? partA : partB;
    return rows.reduce((sum, row) => sum + row.values[semIndex], 0);
  };

  const calculateGrandTotal = (semIndex) => {
    return calculateTotal("A", semIndex) + calculateTotal("B", semIndex);
  };

  const renderSection = (title, data, sectionKey) => (
    <>
      <tr className="bg-blue-50 font-semibold">
        <td className="border p-2">{title}</td>
        {semesters.map((_, i) => (
          <td key={i} className="border p-2 text-center">-</td>
        ))}
      </tr>

      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td className="border p-2">{row.name}</td>
          {row.values.map((val, semIndex) => (
            <td key={semIndex} className="border p-1">
              <input
                type="number"
                value={val}
                onChange={(e) =>
                  handleChange(sectionKey, rowIndex, semIndex, e.target.value)
                }
                className="w-full text-center border rounded px-1 py-1"
              />
            </td>
          ))}
        </tr>
      ))}

      {/* Section Total */}
      <tr className="bg-gray-100 font-semibold">
        <td className="border p-2">Total {title}</td>
        {semesters.map((_, i) => (
          <td key={i} className="border p-2 text-center">
            ₹{calculateTotal(sectionKey, i)}
          </td>
        ))}
      </tr>
    </>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[color:var(--color-primary)]">
        Semester Fee Structure
      </h2>

      <div className="overflow-auto bg-white border rounded-xl shadow">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Head / Item</th>
              {semesters.map((sem, i) => (
                <th key={i} className="border p-2 text-center">
                  Sem {sem}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {renderSection("Part A", partA, "A")}
            {renderSection("Part B", partB, "B")}

            {/* Grand Total */}
            <tr className="bg-green-200 font-bold">
              <td className="border p-2">Grand Total</td>
              {semesters.map((_, i) => (
                <td key={i} className="border p-2 text-center">
                  ₹{calculateGrandTotal(i)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
      <button
  onClick={downloadPDF}
  className="flex items-center gap-2 px-6 py-2 rounded-lg text-white"
  style={{ backgroundColor: "var(--color-primary)" }}
>
  <FaSave />
  Save Fee Structure
</button>
      </div>
    </div>
  );
};

export default ManageFeeStructure;