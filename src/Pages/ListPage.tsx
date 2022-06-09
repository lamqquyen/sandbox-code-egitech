import React, { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import { API_URL } from "../constants";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./style.css";

export default function App() {
  const [students, setStudents] = useState<any>([])
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(`${API_URL}/students`)
      setStudents(response.data)
    }

    fetchStudents()
  }, [])

  const onEdit = (studentId: string) => {
    navigate(`/edit/${studentId}`)
  }

  const onCreate = () => {
    navigate(`/create`)
  }

  const renderStudents = () => {
    return students.map((student: any) => {
      return (<tr key={student.id}>
        <td className="student-col">{student.first_name} {student.last_name}</td>
        <td className="student-col">{student.date_of_birth}</td>
        <td><button onClick={() => onEdit(student.id)}>Edit</button></td>
      </tr>)
    })
  }

  const onSortByName = () => {
    const sortedStudents = sortBy(students, (student: any) => `${student.first_name} ${student.last_name}`)
    setStudents(sortedStudents)
  }

  const onSortByDate = () => {
    const sortedStudents = sortBy(students, (student: any) => student.date_of_birth)
    setStudents(sortedStudents)
  }

  const onSortByMonth = () => {
    const sortedStudents = sortBy(students, (student: any) => {
      return (new Date(student.date_of_birth)).getUTCMonth()
    })
    setStudents(sortedStudents)
  }

  return (
    <div className="App">
      <div className="student-table-wrapper">
        <table className="student-table">
          <tr>
            <th className="student-col">Name</th>
            <th className="student-col">Date of birth</th>
            <th></th>
          </tr>
          {renderStudents()}
        </table>
      </div>
      <div className="button-wrapper">
        <button onClick={onSortByName} className="button">Sort By Name</button>
        <button onClick={onSortByDate} className="button">Sort By Date of Birth</button>
        <button onClick={onSortByMonth} className="button">Sort By Month of Birth</button>
      </div>
      <div className="button-wrapper">
        <button onClick={onCreate} className="create-button">Create new student</button>
      </div>
    </div>
  );
}
