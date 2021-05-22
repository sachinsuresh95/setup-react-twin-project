exports.template = `import React from "react";
import ReactDOM from "react-dom";
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
    <App />
  </React.StrictMode>,
  root
);
`;
