import { Home } from "../../src/components/Home";
import { Route, Routes } from "react-router";

export default function HomeRoute() {
  return (
    <Routes>
      <Route exact path="/home">
        <Home />
      </Route>
    </Routes>
  );
}
