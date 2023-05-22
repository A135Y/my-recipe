import { LandingPage } from "../../src/components/LandingPage";
import { Route, Routes } from "react-router";

export default function LandingPageRoute() {
  return (
    <Routes>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </Routes>
  );
}
