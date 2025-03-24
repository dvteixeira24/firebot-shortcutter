import express from "express";
import { telefunc } from "telefunc";
import vike from "vike-node/express";
import { createServer } from "node:https";
import qrcodeTerminal from "qrcode-terminal";

import "dotenv/config";
import { getCerts } from "./certs";
import { checkAndCreateJSONDBFile } from "@/lib/store";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hostname = process.env.HOSTNAME || "localhost";

export default startServer() as unknown;

async function startServer() {
  await checkAndCreateJSONDBFile();
  const app = express();

  app.use(express.text({ limit: "5MB" })); // Parse & make HTTP request body available at `req.body`
  app.all("/_telefunc", async (req, res) => {
    const context = {};
    const httpResponse = await telefunc({ url: req.originalUrl, method: req.method, body: req.body, context });
    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.use(vike());

  const { certificate, key } = await getCerts();

  if (process.env.USE_SSL === "true") {
    createServer(
      {
        key: key,
        cert: certificate,
      },
      app,
    ).listen(port, hostname, () => {
      console.log(`HTTPS Server listening on https://${hostname}:${port}`);
      qrcodeTerminal.generate(`https://${hostname}:${port}`);
    });
  } else {
    app.listen(port, hostname, () => {
      console.log(`Server listening on http://${hostname}:${port}`);
      qrcodeTerminal.generate(`http://${hostname}:${port}`);
    });
  }

  return app;
}
