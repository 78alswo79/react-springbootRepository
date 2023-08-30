import {Link} from "react-router-dom";

function GetList({id, text, parentFn}) {

    return (
    <>
        <div>
            <div>
                <Link to={`/detail/${id}`}><h3>{id}바로가기</h3></Link> 
                <ul>
                <input type="checkbox" value={id} onChange={event => parentFn(event)}/>{text}
                </ul>
            </div>
        </div>
    </>
    )

}

export default GetList;