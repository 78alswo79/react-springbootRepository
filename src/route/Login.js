import { useState} from "react";
import styled from "../module/Login.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Login () {

    // loginSts가 false : 로그인 안 된상태, true : 로그인 상태
    const [loginSts , setLoginSts] = useState(false);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    // 서버전송
    const OnSubmit = (e) => {
        e.preventDefault();

        const bool = validationChk();

        if (bool) {
            apiMemberPost();
        }
    };

    const OnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs(current => ({...current, [name]: value}));
    }

    // form 내부 발리데이션 체크하기!
    const validationChk = () => {
        if (!inputs.id || inputs.id.length === 0) {
            alert("id를 입력해주세요");
            return false;
        } else if (!inputs.password || inputs.password.length === 0) {
            alert("패스워드를 입력해주세요");
            return false;
        }
        else {
            return true;
        }
    }

    const apiMemberPost = () => {
        axios.post("/login/request", null, {
            params : {
                id : inputs.id
                , password: inputs.password
            }
        })
        .then(res => {
            console.log(res.data);
            if (res.data.flag > 0) {
                // 회원일치 성공!
                alert(res.data.message);
                // setLoginSts(true);
                navigate("/home");
            } else {
                // 회원일치 실패!
                alert(res.data.message);
                // setLoginSts(false);
                return false;
            }
        })
        .catch(err => console.error(err));
    }
    console.log("never be enought...", inputs);



    return (
        <>
            <div>
                (
                    <form onSubmit={e => OnSubmit(e)} method="post">
                        <div className={styled.imgcontainer}>
                            <img src="logo192.png" alt="Avatar" className={styled.avatar} />
                        </div>

                        <div className={styled.container}>
                            <label htmlFor="uname"><b>Id</b></label>
                            <input type="text" placeholder="Enter Id" name="id" id="id" onChange={e => OnChange(e)} value={inputs.id || ""} /*required*/ />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" id="password" onChange={e => OnChange(e)} value={inputs.password || ""} /*required*/ />

                            <button type="submit">Login</button>
                            <label>
                            <input type="checkbox" name="remember" /> Remember me
                            </label>
                        </div>

                        <div className={styled.container} style={{backgroundColor:"#f1f1f1"}}>
                            <button type="button" className={styled.cancelbtn}>Cancel</button>
                            {/* <span className={styled.psw}>Forgot <a href="#">password?</a></span> */}
                        </div>
                    </form>
                )    
            </div>
        </>
    )
}

export default Login