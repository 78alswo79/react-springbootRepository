import axios from "axios";
import { useEffect, useState } from "react";
import GetList from "../components/GetList";

function Home() {
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/selectTest')
        .then(response => setTest(response.data))
        .catch(err => console.log("err!!!", err));

        setLoading(false);
    }, [])

    console.log(test)

    return (
        <>
            <div>
                {loading ? (
                    <h1>Loading...</h1> 
                ) : (
                    <div>
                        <h1>React & Springboot 테스팅!!</h1>
                        <hr />
                        {test.map((item) => 
                            <GetList 
                                key={item.id}
                                id={item.id}
                                text={item.text}
                            />
                        )}
                    </div>
                    )}
            </div>
        </>
    );

}

export default Home;