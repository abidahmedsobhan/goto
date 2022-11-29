import Main from "./component/main";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  let Cuser = document.cookie;
  console.log(Cuser);
  return (
    <div className="App">
      {/* <Router>
        <Switch>
          <Route exact path="/messanger"> */}
      <Main />
      {/* </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
