import axios from "axios";
import { useEffect, useState } from "react";
import GetList from "../components/GetList";
import qs from "qs";

function Home() {
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true);

    // 서버에 보내줄 데이터 [] 값 
    const [arr2, setArr2] = useState([]);
    let sendData = {};

    useEffect(() => {
        getSelectList();
    }, []);

    // 자식 컴포넌트에서 이벤트 발생!
    const parentFn = (event) => {
        if (event.target.checked) {
            setArr2(current => [event.target.value, ...current]);
        } else {
            setArr2(() => {
                return arr2.filter(item => item !== event.target.value)
            })
        }
    }

    const submitFn = (gbn) => {
        const headers = { 'Content-Type' : 'application/json'};
        // axios 쿼리 파리미터 stringify 처리! 
        axios.defaults.paramsSerializer = params => {
            return qs.stringify(params);
        }

        if (gbn === 'update') {
            axios.get(`/api/${gbn}`, {
                params: {
                    "id": JSON.stringify(sendData.id)
                    , "text": JSON.stringify(sendData.text)
                },
            }, {headers})
            .then(() => getSelectList())
            .catch(err => console.log(err));

        } else if (gbn === 'delete') {
            axios.get(`/api/${gbn}`, {
                params : {
                    "id": JSON.stringify(sendData.id)
                }
            }, { headers })
            .then(res => getSelectList())
            .catch(err => console.log(err));
        }
    }

    // SelectList가져오는 함수
    const getSelectList = () => {
        axios.get('/api/selectTest')
        .then(response => setTest(response.data))
        .catch(err => console.log("err!!!", err));

        setLoading(false);
    }

    sendData = {
       id : arr2
       , text : '나 여기서 두 팔 벌려 힘껏 달려와'
    };

    return (
        <>
            <div>
                {loading ? (
                    <h1>Loading...</h1> 
                ) : (
                    <div>
                        <h1>React & Springboot 테스팅!!</h1>
                        <button onClick={e => submitFn("update")}>수정</button>
                        <button onClick={e => submitFn("delete")}>삭제</button>
                        <hr />
                        {test.map((item) => 
                            <GetList 
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                // 자식 컴포넌트 요소로 함수를 넘겨준다.
                                parentFn={parentFn}
                            />
                        )}
                    </div>
                    )}
            </div>
        </>
    );

}

export default Home;