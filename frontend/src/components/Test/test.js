import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../navigation/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


function GetTest() {
    const User = useParams().userName;
    const [allTest, updateallTest] = useState({});
    const [pageNumber, updatePageNumber] = useState(1);
    const [limit, updateLimit] = useState(5);
    const [loginStatus, updateloginStatus] = useState("")
    const [allTestCount, updateallTestCount] = useState(0);
    let navigate = new useNavigate();
    const navToLogin = () => {
      navigate('/');
    };

    function getNumberOfBanks() {
      axios
        .get("http://localhost:8082/api/v1/numberOfTest")
        .then((resp) => {
          updateallTestCount(parseInt(resp.data));
        })
        .catch((error) => {});
    }

    useEffect(() => {
      axios.post("http://localhost:8082/api/v1/isAdminLogin",{})
        .then((resp) => {
          updateloginStatus(true);
        })
        .catch((error) => {
          updateloginStatus(false);
        });
        getBank();
        getNumberOfBanks();
    }, [pageNumber, limit, allTest]);
  
    function getBank(){
      axios
        .post(`http://localhost:8082/api/v1/getTest`, { limit, pageNumber })
        .then((resp) => {
          updateallTest(resp.data);
          updateloginStatus(true);
        })
        .catch((error) => {
        });
      }
    
    let rowOfUser;
    if (allTest != null) {
      let index=0;
        rowOfUser = Object.values(allTest).map((u) => {
          index+=1;
            return (
              <tr id={u.testID} style ={{background : "SlateGray"}}>
                <td>{index}</td>
                <td>{u.tech}</td>
                <td>{u.question.length}</td>
                <td>
                <a href={`createQuestion/${User}/${u.tech}`}>
                  <button className="btn btn-primary"  style={{ backgroundColor: "Tomato" }}>Add</button>
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
          <NavBar userName={User} role={"admin"} />
          <div>
            <div className="pagination">
              <label className="fw-bold">limit:</label>
              <select
                id="role"
                onChange={(e) => {
                  updateLimit(e.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(allTestCount/limit)}
                  color="primary"
                  onChange={(e, value) => updatePageNumber(value)}
                />
              </Stack>
            </div>
          </div>
          <div>
            <table className ="table table-striped">
              <thead style ={{background : "CadetBlue"}}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tech</th>
                  <th scope="col">Number Of Question</th>
                  <th scope="col">Question</th>
                </tr>
              </thead>
              <tbody>{rowOfUser}</tbody>
            </table>
          </div>
        </>
      );
}
export default GetTest;