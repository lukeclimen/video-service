const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT;
if (!port) throw new Error("Port not set");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/video", async (req, res) => {
  const videoPath = path.resolve(__dirname, "./assets/SampleVideo.mp4");
  const metaData = await fs.promises.stat(videoPath);

  res.writeHead(200, {
    "content-length": metaData.size,
    "content-type": "video/mp4",
  });
  fs.createReadStream(videoPath).pipe(res);
});
app.listen(port, () => {
  console.log(`Video microservice listening on port ${port}`);
});
