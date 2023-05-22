import { Register } from "../../src/components/Register";
import { Route, Routes } from "react-router";

export default function RegisterRoute() {
  return (
    <Routes>
      <Route exact path="/register">
        <Register />
      </Route>
    </Routes>
  );
}
