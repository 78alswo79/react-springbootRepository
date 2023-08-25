import {Link} from "react-router-dom";

function GetList({id, text}) {

    return (
        <div>
            <div>
                <Link to={`/detail/${id}`}><h3>{id}바로가기</h3></Link> 
                <ul>
                    {text}
                </ul>
            </div>
        </div>
    )

}

export default GetList;