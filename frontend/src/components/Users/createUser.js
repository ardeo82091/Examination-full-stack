import React, { useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate } from "react-router-dom";
import './createUser.css'
import Navigation from '../navigation/navigation.js'
function CreateUser() 
{
    const roleofadmin = "admin"
    const usernameofadmin = useParams().userName;
    const [firstName,updateFirstName] = useState("");
    const [lastName,updateLastName] = useState("");
    const [experience,updateexperience] = useState(0);
    const [country,updateCountry] = useState("");
    const [frontend,updateFrontend] = useState("");
    const [backend,updateBackend] = useState("");
    const [dataBase,updatedataBase] = useState("");
    const [userName,updateUserName] = useState("");
    const [password,updatePassword] = useState("");
    const [loginStatus, updateloginStatus] = useState("")
    const [StatusOfUser,updateStatusOfUser] = useState("");
    
    let navigate = new useNavigate();
    const navToLogin = () => {
        navigate('/');
      };

    useEffect(() => {
        axios.post("http://localhost:8082/api/v1/isAdminLogin",{})
          .then((resp) => {
            updateloginStatus(true);
          })
          .catch((error) => {
            updateloginStatus(false);
          });
    }, []);

    const handleMySubmit = async (e) => {
            e.preventDefault();
            let exper = parseInt(experience)
            await axios.post("http://localhost:8082/api/v1/createUser",{firstName,lastName,exper,country,frontend,backend,dataBase,userName,password})
            .then((resp)=>{
                alert("Successfully Created");
                console.log(resp)
                updateStatusOfUser("Created");
            })
            .catch((error)=>{
                alert(`Error ${error.response.data}`);
                updateStatusOfUser(error.response.message);
            })            
    }
    if (loginStatus === false) {
        console.log(loginStatus)
        return (
            <>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <p style={{ color: "white", fontSize: "30px" , background : "red"}}>
                User not logged in, Click Below to login :
              </p>
              <button onClick={navToLogin} type="submit" className="btn btn-primary" style={{ backgroundColor: "green" ,fontSize : "30px"}}>Login</button><br />
            </div>
          </>
        )
    }
    else {
        return (
            <div>
                <div >
                    <Navigation userName={usernameofadmin} role={roleofadmin} />
                </div> 
                    <div className="container">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "CadetBlue" }}>
                            <h5 style={{"textAlign": "center"}}>CreateUser</h5>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "DarkSlateGray" }}>
                                <form onSubmit={handleMySubmit}>
                                
                                    <label  className="form-group">FirstName :</label>
                                    <input type= "text" className="form-control" value = {firstName}
                                    onChange={(e) => updateFirstName(e.target.value)} ></input><br />
                                    <label  className="form-group">LastName :</label>
                                    <input type= "text" className="form-control" value = {lastName}
                                    onChange={(e) => updateLastName(e.target.value)} ></input><br />
                                    <label  className="form-group">Experience :</label>
                                    <input type= "number" className="form-control" value = {experience}
                                    onChange={(e) => updateexperience(e.target.value)} ></input><br />
                                    <label  className="form-group">Country :</label>
                                    <input type= "text" className="form-control" value = {country}
                                    onChange={(e) => updateCountry(e.target.value)} ></input><br />
                                    <label  className="form-group">Frontend :</label>
                                    <input type= "text" className="form-control" value = {frontend}
                                    onChange={(e) => updateFrontend(e.target.value)} ></input><br />
                                    <label  className="form-group">Backend :</label>
                                    <input type= "text" className="form-control" value = {backend}
                                    onChange={(e) => updateBackend(e.target.value)} ></input><br />
                                    <label  className="form-group">DataBase :</label>
                                    <input type= "text" className="form-control" value = {dataBase}
                                    onChange={(e) => updatedataBase(e.target.value)} ></input><br />
                                    <label  className="form-group">userName :</label>
                                    <input type= "text" className="form-control" value = {userName}
                                    onChange={(e) => updateUserName(e.target.value)} ></input><br />
                                    <label  className="form-group">password :</label>
                                    <input type= "text" className="form-control" value = {password}
                                    onChange={(e) => updatePassword(e.target.value)} ></input><br />
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "DarkOliveGreen" }}>Create User</button><br />
                                    {StatusOfUser}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}
export default CreateUser