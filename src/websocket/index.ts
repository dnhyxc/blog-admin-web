// const ws = new WebSocket('ws:127.0.0.1:9112');

// ws.onopen = function (e) {
//   console.log('Connection to server opened');
//   const msg = { type: 'test', id: 1, info: 'laney' };
//   ws.send(JSON.stringify(msg));
//   console.log('sened a laney');
// };

// export const sendMessage = () => {
//   console.log();

//   ws.send(JSON.stringify({ type: 'test1', id: 1, info: 'hello, 我来了老弟' }));
// };

// // 收到服务端的请求
// ws.onmessage = (e) => {
//   console.log(e.data);
// };

// gobang/index.js at main · omgcx1222/gobang
// const ws = new WebSocket('ws://127.0.0.1:9112/ws');

// let lockReconnect = false;
// let reconnectTime: any = null;
// let startHeartTimer: any = null;
// let serverTimeoutObj: any = {};

// const delay = Math.random() * 2000 + 3000;

// const reconnect = () => {
//   if (lockReconnect) return;
//   lockReconnect = true;
//   reconnectTime && clearTimeout(reconnectTime);
//   reconnectTime = setTimeout(() => {
//     connectWs();
//     lockReconnect = false;
//   }, delay);
// };

// const reset = () => {
//   clearTimeout(serverTimeoutObj);
//   clearTimeout(startHeartTimer);
// };

// const startHeart = () => {
//   reset();
//   startHeartTimer = setTimeout(() => {
//     ws.send(
//       JSON.stringify({
//         heart: 100,
//       }),
//     );

//     serverTimeoutObj = setTimeout(() => {
//       ws.close();
//     }, 60000);
//   }, 60000);
// };

// export const sendMessage = () => {
//   console.log('sendMessage');

//   ws.send(JSON.stringify({ type: 'heart', name: 'dnhyxc' }));
// };

// export const connectWs = () => {
//   ws.addEventListener('open', () => {
//     startHeart();
//   });

//   ws.addEventListener('message', (e: any) => {
//     console.log('message', e.data);
//     startHeart();
//   });

//   ws.addEventListener('error', (e) => {
//     console.log('error', e);
//     reconnect();
//   });

//   ws.addEventListener('close', (e) => {
//     console.log('error', e);
//     reconnect();
//   });
// };

// let lockReconnect = false; // 避免ws重复连接
// let ws: any = null; // 判断当前浏览器是否支持WebSocket
// const wsUrl: string = 'ws:127.0.0.1:9112/ws';

// // 连接ws
// createWebSocket(wsUrl);

// export const sendMessage = () => {
//   console.log('sendMessage');

//   ws.send(JSON.stringify({ type: 'heart', name: 'dnhyxc' }));
// };

// /**
//  * 创建 WS 实例
//  * @param {string} url ws的URL
//  */
// function createWebSocket(url: string) {
//   try {
//     if ('WebSocket' in window) {
//       ws = new WebSocket(url);
//     }
//     initEventHandle();
//   } catch (e) {
//     reconnect(url);
//     console.log(e);
//   }
// }

// /**
//  * 初始化事件处理
//  */
// function initEventHandle() {
//   ws.onclose = function () {
//     reconnect(wsUrl);
//     console.log('WS 连接关闭!' + new Date().toLocaleString());
//   };
//   ws.onerror = function () {
//     reconnect(wsUrl);
//     console.log('WS 连接错误!');
//   };
//   ws.onopen = function () {
//     // 心跳检测重置
//     heartCheck.reset().start();
//     console.log('WS 连接成功!' + new Date().toLocaleString());
//   };
//   ws.onmessage = function (event: any) {
//     // 如果获取到消息，心跳检测重置
//     // 拿到任何消息都说明当前连接是正常的
//     heartCheck.reset().start();
//     console.log('WS 收到消息啦:' + event.data);
//     if (event.data !== 'pong') {
//       const data = JSON.parse(event.data);
//       console.log(data, 'data');
//     }
//   };
// }

// // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
// window.onbeforeunload = function () {
//   ws.close();
// };

// /**
//  * 重连
//  * @param {string} url ws的URL
//  * @returns null
//  */
// function reconnect(url: string) {
//   if (lockReconnect) return;
//   lockReconnect = true;
//   // 没连接上，会一直重连，设置延迟 2s 避免连接频繁
//   setTimeout(function () {
//     createWebSocket(url);
//     lockReconnect = false;
//   }, 5000);
// }

// // 心跳检测
// const heartCheck = {
//   timeout: 5000,
//   timeoutObj: null,
//   serverTimeoutObj: null,
//   reset: function () {
//     clearTimeout(this.timeoutObj as any);
//     clearTimeout(this.serverTimeoutObj as any);
//     return this;
//   },
//   start: function () {
//     const self = this;
//     // @ts-ignore
//     this.timeoutObj = setTimeout(function () {
//       // 这里发送一个心跳，后端收到后，返回一个心跳消息，
//       // onmessage拿到返回的心跳就说明连接正常
//       ws.send('ping');
//       console.log('ping!');
//       // 如果超过一定时间还没重置，说明后端主动断开了
//       // @ts-ignore
//       self.serverTimeoutObj = setTimeout(function () {
//         // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
//         ws.close();
//       }, self.timeout);
//     }, this.timeout);
//   },
// };

export let ws: any;
let wstime: any = null;
// lockReconnect用于避免重复连接
let lockReconnect = false;
// 连接ws的url
const wsUrl = 'ws://127.0.0.1:9112/ws';
let timeoutObj: any = null;
let serverTimeoutObj: any = null;
const timeout: number = 50000;

// 请求数据
export const QUERY_ALL_FRAME = {
  action: 'queryMessage',
};

// 心跳检测
export const HEARTBEAT_FRAME = {
  action: 'heartBeat',
};

// 删除消息
export const DELETE_FRAME = {
  action: 'deleteMessageAll',
};

// 创建websocket
function createWebSocket(wsUrl: string) {
  try {
    // 创建前先关闭创建好的ws
    closeSocket();
    ws = new WebSocket(wsUrl);
    websocketInit();
  } catch (e) {
    console.log('catch');
    // 出现异常时，重新连接ws
    websocketReconnect(wsUrl);
  }
}

// 初始化ws事件
function websocketInit() {
  ws.onopen = function (event: any) {
    onOpen(event);
  };
  ws.onmessage = function (event: any) {
    onMessage(event);
  };
  // 断开连接时重新连接ws
  ws.onclose = function (event: any) {
    onClose(event);
    websocketReconnect(wsUrl);
  };
  // 连接出现异常时重新连接ws
  ws.onerror = function (event: any) {
    onError(event);
    websocketReconnect(wsUrl);
  };
}

// 关闭ws连接
function closeSocket() {
  if (ws) {
    ws.onclose = function () {};
    ws.close();
  }
}

// 重新连接ws
function websocketReconnect(url: string) {
  if (lockReconnect) return;
  lockReconnect = true;
  wstime && clearTimeout(wstime);
  // 连接断开时每个5s再次连接
  wstime = setTimeout(function () {
    createWebSocket(url);
    lockReconnect = false;
  }, 5000);
}

// 设置心跳检测
const heartCheck = {
  start: function () {
    timeoutObj && clearTimeout(timeoutObj);
    serverTimeoutObj && clearTimeout(serverTimeoutObj);
    // 每隔50000进行心跳检测
    timeoutObj = setTimeout(function () {
      sendMessage(JSON.stringify(HEARTBEAT_FRAME));
      // 如果50000之内没有操作关闭ws连接
      serverTimeoutObj = setTimeout(function () {
        ws.close();
      }, timeout);
    }, timeout);
  },
};

// 发送消息
export const sendMessage = (msg?: any) => {
  if (ws && ws.readyState === 1) {
    try {
      ws.send(msg);
    } catch (e) {
      console.log(e);
    }
  }
};

// ws连接成功
function onOpen(event: any) {
  sendMessage(JSON.stringify(QUERY_ALL_FRAME));
  // 发送消息之后重新进行心跳检测
  heartCheck.start();
}

// 收到服务端数据
function onMessage(event: any) {
  try {
    const data = JSON.parse(event.data);
    if (data.code === 200) {
      // 心跳数据不处理
      // 所需的正常操作
      if (data.action === 'heartBeat') {
        console.log(event.data);
      } else {
        // 解析处理数据
        console.log('解析处理数据>>>做事情');

        // if (data.action === 'queryMessage') {
        //   initTaskList(data.data || []);
        // } else if (data.action === 'saveMessage') {
        //   addTask(data.data || null);
        // }
      }
    } else {
      console.log('收到非格式化数据');
    }
  } catch (e) {
    console.log(e);
  }
  // 拿到任何消息都说明当前连接是正常的，此时从新进行心跳检测
  heartCheck.start();
}

// 关闭连接
function onClose(event: any) {
  console.log(event);
}

// 连接出错
function onError(event: any) {
  console.log(event);
}

createWebSocket(wsUrl);
