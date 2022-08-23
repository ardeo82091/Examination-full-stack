import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../navigation/navigation";
function StartTest() {
    const User = useParams().userName
    const tech = useParams().tech
    const [loginStatus, updateloginStatus] = useState("")
    const [attemptStatus, updateattemptStatus] = useState("")
    const [answers, updateallanswers] = useState([])

    let navigate = new useNavigate();
    const navToLogin = () => {
        navigate('/');
      };

    useEffect(() => {
        axios.post(`http://localhost:8082/api/v1/isUserLogin/${User}`,{})
        .then((resp) => {
          updateloginStatus(true);
        })
        .catch((error) => {
          updateloginStatus(false);
        });
        loadanswers();
    }, [])

    const handleMySubmit = (e) => {
        e.preventDefault();
        console.log(answers)
        axios.post(`http://localhost:8082/api/v1/submitTest/${User}/${tech}`, { answers })
        .then((resp)=>{
            console.log(resp)
        })
        .catch((error)=>{
            alert(`Error ${error.response.data}`);
        })

        navigate(`/userTech/${User}`)
    }

    const loadanswers = (e) => {
        axios.post(`http://localhost:8082/api/v1/attemptTest/${User}/${tech}`, {})
            .then((resp)=>{
                updateallanswers(resp.data)
            })
            .catch((error)=>{
                updateattemptStatus("Already Attempted")
            })

    }

    let cardofquetions
    if (answers != null) {

        console.log(answers)
        cardofquetions = Object.values(answers).map(u => {
            return (
                <div className="card" style={{ width: "50%", marginBottom: "50px" }}>
                    <div className="card-header" style={{ backgroundColor: "CadetBlue" }}>
                        <b> Question:</b>
                    </div>
                    <div className="card-body" key={u.id}>
                        {u.details}<br />
                        <div>
                            <input type="radio" value={u.options[0]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} /> A:  {u.options[0]}<br />
                            <input type="radio" value={u.options[1]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} /> B:    {u.options[1]}<br />
                            <input type="radio" value={u.options[2]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} /> C:    {u.options[2]}<br />
                            <input type="radio" value={u.options[3]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} />D:   {u.options[3]}<br />
                        </div>
                    </div>
                </div>)

        })
    }
    if (!loginStatus) {
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
        );
    }
    if (attemptStatus == "Already Attempted") {
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
              You have Already Attemted This Test
              </p>
              <button className="btn btn-primary" style={{ backgroundColor: "CadetBlue" }} onClick={() => navigate(`/userTech/${User}`)}>Go Back to Test</button>
            </div>
          </>
                                               
        )
    }
    return (
        <div>
            <div >
                <Navigation username={User} role={"user"} />
            </div>

            <div className="d-flex felx-row flex-wrap justify-content-between">
                {cardofquetions}
            </div>
            <div className="d-flex felx-row flex-wrap justify-content-between">
                <form onSubmit={handleMySubmit}>
                    <button className="btn btn-primary" style={{ backgroundColor: "CadetBlue" }} >Submit Here</button><br /><br />
                </form>
            </div>
        </div>
    )
}

export default StartTest;