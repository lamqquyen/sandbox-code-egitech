import axios from "axios";
import React, {useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom"
import { API_URL, ERROR_MESSAGE } from "../constants";
import isEmpty from "lodash/isEmpty";

const AddEditPage = (props: any) => {
  const {studentId} = useParams();
  const buttonTitle = studentId ? "Edit" : "Add";
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const convertDate = (date: Date) => {
    const convertedDate = new Date(date)
    const month = convertedDate.getUTCMonth() + 1 < 10 ? `0${convertedDate.getUTCMonth() + 1}` : convertedDate.getUTCMonth() + 1
    const day = convertedDate.getUTCDay() < 10 ? `0${convertedDate.getUTCDay()}` : convertedDate.getUTCDay()
    return `${convertedDate.getUTCFullYear()}-${month}-${day}`
  }

  useEffect(() => {
    const fetchStudent = async () => {
      if (studentId) {
        const response = await axios.get(`${API_URL}/students/${studentId}`);
        setFirstName(response.data.first_name)
        setLastName(response.data.last_name)
        setDateOfBirth(convertDate(response.data.date_of_birth))
      }
    }

    fetchStudent()
  }, [])

  const onChangeDate = (e: any) => {
    setDateOfBirth(e.target.value)
  }

  const onChangeFirstName = (e: any) => {
    setFirstName(e.target.value)
  }

  const onChangeLastName = (e: any) => {
    setLastName(e.target.value)
  }

  const onClickButton = async () => {
    const studentInfo = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth
    }

    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(dateOfBirth)) {
      setShowError(true)
      return;
    }

    setShowError(false)


    if (studentId) {
      await axios.put(`${API_URL}/students/${studentId}`, {studentInfo})
    }
    else {
      await axios.post(`${API_URL}/students`, {studentInfo})
    }

    navigate("/")
  }

  return (<>
    <div className="input-field">
      <label>
        First Name 
        <input onChange={onChangeFirstName} type="text" id="firstname" value={firstName}/>
      </label>
    </div>
    <div className="input-field">
      <label>
        Last Name
        <input onChange={onChangeLastName} type="text" id="lastname" value={lastName}/>
      </label>
    </div>
    <div className="input-field">
      <label>
        Date of Birth
        <input onChange={onChangeDate} type="date" id="dob" value={dateOfBirth}/>
      </label>
    </div>

    {showError && <p className="error-message">{ERROR_MESSAGE}</p>}
    <button onClick={onClickButton}>{buttonTitle}</button>
  </>)
}

export default AddEditPage;