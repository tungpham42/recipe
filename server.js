import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./src/App";

const app = express();

app.get("*", (req, res) => {
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
      </body>
    </html>
  `;
  res.send(html);
});

export default app;
