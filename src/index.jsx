import "./index.scss";

import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";
import Container from "react-bootstrap/Container";

const MyFlixApplication = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
