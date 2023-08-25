import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function Detail() {

    const {gimozzi} = useParams();
    const [list, setList] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       detail();
    }, []);

    const detail = () => {
        axios.get(`/api/detail/${gimozzi}`)
        .then(response => setList(response.data))
        .catch(err => console.log(err));

        setLoading(false);
    };
    
    console.log(list);
    return (
        <>
            <div>
                {loading ? (
                    <h1>Loading...</h1> 
                ) : (
                    <div>
                        <h1>React & Springboot 디테일 테스트</h1>
                        <hr />
                        <div>
                           <h3>{list.id}</h3>
                            <ul>
                                {list.text}
                            </ul>
                        </div>
                    </div>
                    )}
            </div>
        </>
    )


}

export default Detail;