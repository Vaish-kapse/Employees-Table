import "./styles.css";
import TableComponent from "./TableComponent";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    // <Switch>
    <div className="App">
      {/* <Route path="/employers" component={TableComponent} /> */}
      <h1>Employees Table</h1>
      <TableComponent />
      <hr />
      {/* </Switch> */}
    </div>
  );
}
