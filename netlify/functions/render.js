import React from "react";
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "../../src/App"; // Adjust path as needed

exports.handler = async (event, context) => {
  const helmetContext = {};
  const appMarkup = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  );
  const { helmet } = helmetContext;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${appMarkup}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};
