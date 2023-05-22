import { LogIn } from "../../src/components/LogIn";
import { Route, Routes } from "react-router";

export default function LoginRoute() {
  return (
    <Routes>
      <Route exact path="/login">
        <LogIn />
      </Route>
    </Routes>
  );
}
