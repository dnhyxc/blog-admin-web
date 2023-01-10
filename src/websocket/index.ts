// const ws = new WebSocket('ws://localhost:9112/wss');

// ws.onopen = function (e) {
//   console.log('Connection to server opened');
//   const msg = { type: 'test', id: 1, info: 'laney' };
//   ws.send(JSON.stringify(msg));
//   console.log('sened a laney');
// };

// export const sendMessage = () => {
//   ws.send(JSON.stringify({ type: 'test1', id: 1, info: 'hello, 我来了老弟' }));
// };

// // 收到服务端的请求
// ws.onmessage = (e) => {
//   console.log(e.data);
// };
