import cw from "./components/cw.svg"
import man from "./components/man.svg"
import woman from "./components/woman.svg"
import design from "./components/design.svg"
import growingMan from "./components/growing-up-man.svg"
import growingWoman from "./components/growing-up-woman.svg"
import mail from "./components/mail.svg"
import map from "./components/map.svg"
import padlock from "./components/padlock.svg"
import phone from "./components/phone.svg"
import { useEffect, useState } from "react"
import './App.css';
import axios from "axios"

function App() {

  const [info, setInfo] = useState([])
  const [ user, setUser ] = useState(false)
  const [ disabled, setDisabled ] = useState(false)
  const [ tableContent, setTableContent ] = useState(false)
  const [ userList, setUserList ] = useState( [] )
  const [personal, setPersonal] = useState("name")
  
  


  useEffect(() => {
    axios.get("https://randomuser.me/api/")
      .then((res) => setInfo(res.data.results[0]))
    setDisabled(false)
  }, [user])

  const addUser = () => {
    setDisabled(true)
    setUserList( 
      [
      ...userList,
      {
        name : info?.name?.first,
        email : info?.email,
        phone : info?.phone,
        age : info?.dob?.age
      }
    ] )
      setTableContent(true)
     
  }

  const handleClick = (information) => {
    setPersonal(information)
  }

  // console.log(info)
  // console.log(userList)

  return (
    <div className="App">
      <img src={cw} className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        <img src={info?.picture?.large} className="image" />
        <div className="personal-info">
          <p>My {personal} is</p>
          <p>{personal == "name" && info?.name?.title} {personal == "name" && info?.name?.first} {personal == "name" && info?.name?.last}</p>
          <p>{personal == "email" && info?.email}</p>
          <p>{personal == "age" && info?.dob?.age}</p>
          <p>{personal == "street" && info?.location?.street?.number} {personal == "street" && info?.location?.street?.name}  </p>
          <p>{personal == "phone" && info?.phone} </p>
          <p>{personal == "password" && info?.login?.password }</p>
        </div> 
        <div className="icons">
          <img src={info?.gender == "female" ? woman : man} onClick={() => handleClick("name")} />
          <img src={mail} onClick={() => handleClick("email")} />
          <img src={info?.gender == "female" ? growingWoman : growingMan} onClick={() => handleClick("age")} />
          <img src={map} onClick={() => handleClick("street")} />
          <img src={phone} onClick={() => handleClick("phone")} />
          <img src={padlock} onClick={() => handleClick("password")} />
        </div>
        <div className="buttons">
          <button onClick = {() => setUser(!user) }>NEW USER</button>
          <button onClick={addUser} disabled={disabled} >ADD USER</button>
        </div>
        <div className="list">
          { tableContent && 
            <table>
            <thead>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            </thead>
           
            {
              userList?.map((user) => (
                <tbody>
               <td>{user.name}</td>
               <td>{user.email}</td>
               <td>{user.phone}</td>
               <td>{user.age}</td>
               </tbody>
            ))
          }
          
            </table>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
