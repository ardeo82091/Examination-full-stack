const User = require('../../view/user')
const JWTPayload = require('../../view/authentication');
async function login(req,resp)
{
    const userName = req.body.userName;
    const password = req.body.password;

    if (typeof userName != "string") {
        resp.status(406).send("userName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("password is invalid");
        return;
    }

    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(isUserExist == false)
    {
        resp.status(403).send("No user Exists with this userName")
        return;
    }
    let isPasswordMatch = await User.allUsers[indexOfUser].comparePassword(password);
    if(isPasswordMatch == false)
    {
        resp.status(403).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(User.allUsers[indexOfUser]);
    const newToken = newPayload.createToken();
    resp.cookie("mytoken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(201).send(User.allUsers[indexOfUser]);
}

function validUser(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.userName != userName && newPayload.role != "user"){
        resp.status(401).send("please login with correct userName")
        return;
    }
    resp.status(201).send("LoggedIN")
    return;
}

function validAdmin(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    resp.status(201).send("LoggedIN")
    return;
}

module.exports = {login,validAdmin,validUser}

