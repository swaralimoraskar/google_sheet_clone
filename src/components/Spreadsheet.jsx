import React, { useState, useEffect } from "react";
import "./Spreadsheet.css";

const Spreadsheet = () => {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(10);
  const [data, setData] = useState({});
  const [formula, setFormula] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("spreadsheetData"));
    if (savedData) setData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("spreadsheetData", JSON.stringify(data));
  }, [data]);

  const handleChange = (row, col, value) => {
    const key = `${row}-${col}`;
    const newData = { ...data, [key]: value };
    setData(newData);
  };

  const trimCell = () => {
    const newData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim()])
    );
    setData(newData);
  };

  const convertToUpper = () => {
    const newData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.toUpperCase()])
    );
    setData(newData);
  };

  const convertToLower = () => {
    const newData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.toLowerCase()])
    );
    setData(newData);
  };

  const removeDuplicates = () => {
    const uniqueValues = {};
    Object.entries(data).forEach(([key, value]) => {
      if (!Object.values(uniqueValues).includes(value)) {
        uniqueValues[key] = value;
      }
    });
    setData(uniqueValues);
  };

  const findAndReplace = (findText, replaceText) => {
    const newData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value.replace(new RegExp(findText, "g"), replaceText),
      ])
    );
    setData(newData);
  };

  const calculateMathFunction = (func) => {
    const values = Object.values(data).map(Number).filter(val => !isNaN(val));
    switch (func) {
      case "SUM": return values.reduce((a, b) => a + b, 0);
      case "AVERAGE": return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      case "MAX": return Math.max(...values);
      case "MIN": return Math.min(...values);
      case "COUNT": return values.length;
      default: return null;
    }
  };

  return (
    <div className="spreadsheet-container">
      <div className="toolbar">
        <button onClick={() => setRows(rows + 1)}>+ Row</button>
        <button onClick={() => setRows(rows > 1 ? rows - 1 : rows)}>- Row</button>
        <button onClick={() => setCols(cols + 1)}>+ Column</button>
        <button onClick={() => setCols(cols > 1 ? cols - 1 : cols)}>- Column</button>
        <button onClick={trimCell}>Trim</button>
        <button onClick={convertToUpper}>Uppercase</button>
        <button onClick={convertToLower}>Lowercase</button>
        <button onClick={removeDuplicates}>Remove Duplicates</button>
      </div>
      <div className="formula-bar">
        <input type="text" placeholder="Find..." id="findText" />
        <input type="text" placeholder="Replace..." id="replaceText" />
        <button onClick={() => findAndReplace(
          document.getElementById("findText").value,
          document.getElementById("replaceText").value
        )}>Find & Replace</button>
      </div>
      <div className="math-functions">
        <button onClick={() => alert("SUM: " + calculateMathFunction("SUM"))}>SUM</button>
        <button onClick={() => alert("AVERAGE: " + calculateMathFunction("AVERAGE"))}>AVERAGE</button>
        <button onClick={() => alert("MAX: " + calculateMathFunction("MAX"))}>MAX</button>
        <button onClick={() => alert("MIN: " + calculateMathFunction("MIN"))}>MIN</button>
        <button onClick={() => alert("COUNT: " + calculateMathFunction("COUNT"))}>COUNT</button>
      </div>
      <div className="spreadsheet-grid">
        <table>
          <thead>
            <tr>
              {[...Array(cols)].map((_, col) => (
                <th key={col}>{String.fromCharCode(65 + col)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, row) => (
              <tr key={row}>
                {[...Array(cols)].map((_, col) => (
                  <td key={col} className="cell">
                    <input
                      type="text"
                      value={data[`${row}-${col}`] || ""}
                      onChange={(e) => handleChange(row, col, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
