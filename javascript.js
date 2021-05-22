exports.template = `import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./styles/GlobalStyles";
import tw, { styled } from "twin.macro";

const Welcome = styled.h1\`
  \${tw\`text-blue-500\`};
\`;

const App = () => {
  return <Welcome>Hello world!</Welcome>;
};

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  root
);
`;
