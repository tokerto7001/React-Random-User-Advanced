import cw from "./components/cw.svg"
import man from "./components/man.svg"
import woman from "./components/woman.svg"
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
  const [ tableContent, setTableContent ] = useState(false)
  const [ userList, setUserList ] = useState( [] )
  const [personal, setPersonal] = useState("name")
  const [ newUser, setNewUser ] = useState("NEW USER")
  
  const fetchData = () => {
    setNewUser("LOADING...")
    axios.get("https://randomuser.me/api/")
    .then((res) => setInfo(res.data.results[0]))
    .then(() => setNewUser("NEW USER"))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addUser = () => {
    // const twice = (user) => user.email == info.email
    // if(userList.some(twice)){
    //   alert("Nope")
      
    if(userList.filter(user => user.email === info.email).length > 0){
      alert("You already added this user")
    }else{
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
    }
    
      setTableContent(true)
     
  }

  const handleClick = (information) => {
    setPersonal(information)
  }

  // console.log(info)
  // console.log(userList)

  return (
    <div className="App">
      <img src={cw} alt="clarusway" className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        <img alt="img" src={info?.picture?.large} className="image" />
        <div className="personal-info">
          <p>My {personal} is</p>
          <p>{personal === "name" && info?.name?.title} {personal === "name" && info?.name?.first} {personal === "name" && info?.name?.last}</p>
          <p>{personal === "email" && info?.email}</p>
          <p>{personal === "age" && info?.dob?.age}</p>
          <p>{personal === "street" && info?.location?.street?.number} {personal === "street" && info?.location?.street?.name}  </p>
          <p>{personal === "phone" && info?.phone} </p>
          <p>{personal === "password" && info?.login?.password }</p>
        </div> 
        <div className="icons">
        <acronym title="gender"><img alt="man-woman" src={info?.gender === "female" ? woman : man} onClick={() => handleClick("name")} /></acronym>
        <acronym title="email"><img alt="email" src={mail} onClick={() => handleClick("email")} /></acronym>
        <acronym title="age"><img alt="growingman-woman" src={info?.gender === "female" ? growingWoman : growingMan} onClick={() => handleClick("age")} /></acronym>
        <acronym title="street"><img alt="street" src={map} onClick={() => handleClick("street")} /></acronym>
        <acronym title="phone"><img alt="phone" src={phone} onClick={() => handleClick("phone")} /></acronym>
        <acronym title="password"><img alt="password" src={padlock} onClick={() => handleClick("password")} /></acronym>
        
          
        </div>
        <div className="buttons">
          <button onClick = {fetchData }> {newUser}</button>
          <button onClick={addUser} >ADD USER</button>
        </div>
        <div className="list">
          { tableContent && 
            <table>
            <thead>
            <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            </tr>
            </thead>
           <tbody>
            {
              userList?.map((user, index) => (
                <tr key={index}>
               <td>{user.name}</td>
               <td>{user.email}</td>
               <td>{user.phone}</td>
               <td>{user.age}</td>
               </tr>
            ))
          }
          </tbody>
            </table>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
