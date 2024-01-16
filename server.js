//①まずサーバーを立ち上げる 
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/",(req,res) => {
  // 表示させたいファイル __dirname(今現在の階層＝dirネームという意味)+パス
  res.sendFile(__dirname + "/index.html");
});

// ③クライアントが接続したときの設定
// ↓onは「受け取る」、emitは「送る」
io.on("connection", (socket) => {
  console.log("ユーザーが接続しました");
  
  // ⑤
  socket.on("chat message", (msg) => {
    // console.log("メッセージ:" + msg);
    // 受け取ったデータをみんなが見れるように送信する
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log("listening on 3000");
});