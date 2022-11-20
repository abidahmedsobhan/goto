import Main from "./component/main";
import useMediaQuery from "@mui/material/useMediaQuery";
function App() {
  let x = document.cookie;
  console.log(x);
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
