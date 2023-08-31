import {
  BrowserRouter as Router
  , Route
  , Routes,
}
from "react-router-dom";
import Home from "./route/Home";
import Detail from "./route/Detail";
import Login from "./route/Login";

function App() {
  // const [hello, setHello] = useState('');

  // useEffect(() => {
  //   axios.get("/api/test")
  //   .then(response => setHello(response.data.SUCCESS_TEXT))
  //   .catch(error => console.log(error))
  // }, []);

  // useEffect(() => {
  //   fetch("/api/test")
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json);
  //     setHello(json.SUCCESS_TEXT);
  //   })
  // })

  return (
    <>
    <Router>
      <Routes>
        <Route path="/"                   element={<Login />}></Route>
        <Route path='/home'               element={<Home />} ></Route>
        <Route path='/detail/:gimozzi'    element={<Detail />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
