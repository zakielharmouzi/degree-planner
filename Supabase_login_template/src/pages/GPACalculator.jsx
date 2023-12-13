import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/Authcontext';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import { HashLoader } from "react-spinners";

const GPACalculator = () => {
  const { user } = useAuth();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // 
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  const initialCourses = [
    { name: 'CHE 1401', creditHours: 4},
    { name: 'CSC 4307', creditHours: 3},
    { name: 'HUM 2301', creditHours: 3},
    { name: 'MKT 3301', creditHours: 3},
    { name: 'MTH 3301', creditHours: 3},
  ];

  const [courses, setCourses] = useState(initialCourses);

  const calculateGPA = () => {
    const totalCreditHours = courses.reduce((total, course) => total + course.creditHours, 0);
    const weightedGradePoints = courses.reduce(
      (total, course) => total + calculateGradePoints(course.grade) * course.creditHours,
      0
    );

    return totalCreditHours === 0 ? 0 : weightedGradePoints / totalCreditHours;
  };

  const calculateGradePoints = (grade) => {
    switch (grade) {
      case 'A+':
        return 4.3;
      case 'A':
        return 4.0;
      case 'A-':
        return 3.7;
      case 'B+':
        return 3.3;
      case 'B':
        return 3.0;
      case 'B-':
        return 2.7;
      case 'C+':
        return 2.3;
      case 'C':
        return 2.0;
      case 'C-':
        return 1.7;
      case 'D+':
        return 1.3;
      case 'D':
        return 1.0;
      case 'D-':
        return 0.7;
      case 'F':
        return 0.0;
      default:
        return 0.0; // Default to 0 for unknown grades
    }
  };

  const handleGradeChange = (index, selectedGrade) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = selectedGrade;
    setCourses(updatedCourses);
  };

  return (
    <>
          {loading && (
              <div className="loader-container flex items-center justify-center h-screen">
                  <HashLoader color="#166432" size={100} />
              </div>
          )}
      <Navbar fname={"Salma"} />
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-Libre text-[#445858] mt-10">GPA Calculator</h1>
        <span className="w-1/2 font-Montserrat text-center">
          In this page, you can project your GPA for your current courses to track your progress. :)
        </span>
        <table className="mt-8 border border-gray-500 font-Montserrat">
          <thead>
            <tr>
              <th className="border px-20 py-2 font-Libre">Course Title</th>
              <th className="border px-5 py-2 font-Libre bg-[#567676]">Grade</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">
                  <select
                    value={course.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="F">F</option>

                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 font-Montserrat">
          <strong>Total Credit Hours:</strong>{' '}
          {courses.reduce((total, course) => total + course.creditHours, 0)}
        
        <div>
          <strong>GPA for this semester:</strong> {calculateGPA().toFixed(2)}
          <div>
          <strong>Current CGPA: </strong> {3.73}
          </div>
<div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default GPACalculator;
