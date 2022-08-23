import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../navigation/navigation";


function UserTech() {
    const User = useParams().userName
    const [allTech, updateallTech] = useState({});
    const [loginStatus, updateloginStatus] = useState(false)
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
        getUser();
    }, [allTech]);
  
    function getUser(){
      axios
        .post(`http://localhost:8082/api/v1/takeTest/${User}`, {})
        .then((resp) => {
          updateallTech(resp.data);
          updateloginStatus(true);
        })
        .catch((error) => {
        });
      }
    
    let rowOfUser;

    if (allTech != null) {
        rowOfUser = Object.values(allTech).map((u) => {
            return (

              <tr id={u.UserId} style ={{background : "SlateGray"}}>
                <td>{u.tech}</td>
                <td>{u.score}</td>
                <td>{u.outOffScore}</td>

                <td>
                <a href={`attemptTest/${User}/${u.tech}`}>
                  <button className="btn btn-primary"  style={{ backgroundColor: "DarkOliveGreen" }}>Attempt</button>
                  </a>
                </td>
              </tr>
            );
          });
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
      return (
        <>
          <NavBar userName={User} role={"role"} />
          <div>
            <table className ="table table-striped">
              <thead style ={{background : "CadetBlue"}}>
                <tr>
                  <th scope="col">Your Tech</th>
                  <th scope="col">Score</th>
                  <th scope="col">OUTOFFSCORE</th>
                  <th scope="col">Test</th>
                </tr>
              </thead>
              <tbody>{rowOfUser}</tbody>
            </table>
          </div>
        </>
      );
}
export default UserTech;