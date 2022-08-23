import React, { useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate } from "react-router-dom";
import Navigation from '../navigation/navigation.js'
function CreateQuestion1() 
{
    const role = "admin"
    const user = useParams().userName;
    const tech = useParams().tech;
    const [details,updateDetails] = useState("");
    const [options,updateOptions] = useState([]);
    const [option1,updateOption1] = useState("");
    const [option2,updateOption2] = useState("");
    const [option3,updateOption3] = useState("");
    const [option4,updateOption4] = useState("");
    const [correctAnswer,updateCorrectAnswer] = useState("");
    const [complexity1,updateComplexity] = useState("");
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
            options.push(option1,option2,option3,option4)
      const complexity = parseInt(complexity1);      
            await axios.post("http://localhost:8082/api/v1/createQuestion",{tech,details,options,correctAnswer,complexity})
            .then((resp)=>{
                alert("Successfully Created");
                updateOptions([]);
                updateStatusOfUser("Created");
            })
            .catch((error)=>{
                alert(`Error ${error.response.data}`);
                updateOptions([]);
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
                    <Navigation userName={user} role={role} />
                </div> 
                    <div className="container">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "CadetBlue" }}>
                            <h5 style={{"textAlign": "center"}}>CREATE QUESTION</h5>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "DarkSlateGray" }}>
                                <form onSubmit={handleMySubmit}>
                                    <label  className="form-group">Question Details :</label>
                                    <input type= "text" className="form-control" value = {details}
                                    onChange={(e) => updateDetails(e.target.value)} ></input><br />
                                    <label  className="form-group">Option1 :</label>
                                    <input type= "object" className="form-control" value = {option1}
                                    onChange={(e) => updateOption1(e.target.value)} ></input><br />
                                    <label  className="form-group">Option2 :</label>
                                    <input type= "object" className="form-control" value = {option2}
                                    onChange={(e) => updateOption2(e.target.value)} ></input><br />
                                    <label  className="form-group">Option3 :</label>
                                    <input type= "object" className="form-control" value = {option3}
                                    onChange={(e) => updateOption3(e.target.value)} ></input><br />
                                    <label  className="form-group">Option4 :</label>
                                    <input type= "object" className="form-control" value = {option4}
                                    onChange={(e) => updateOption4(e.target.value)} ></input><br />
                                    <label  className="form-group">Correct Answer :</label>
                                    <input type= "text" className="form-control" value = {correctAnswer}
                                    onChange={(e) => updateCorrectAnswer(e.target.value)} ></input><br />
                                    <label  className="form-group">Complexity :</label>
                                    <input type= "number" className="form-control" value = {complexity1}
                                    onChange={(e) => updateComplexity(e.target.value)} ></input><br />
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "DarkOliveGreen" }}>Create</button><br />
                                    {StatusOfUser}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}
export default CreateQuestion1;