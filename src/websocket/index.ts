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

let lockReconnect = false; // 避免ws重复连接
let ws: any = null; // 判断当前浏览器是否支持WebSocket
const wsUrl: string = 'ws://127.0.0.1:9112/ws';

// 连接ws
createWebSocket(wsUrl);

export const sendMessage = () => {
  console.log('sendMessage');

  ws.send(JSON.stringify({ type: 'heart', name: 'dnhyxc' }));
};

/**
 * 创建 WS 实例
 * @param {string} url ws的URL
 */
function createWebSocket(url: string) {
  try {
    if ('WebSocket' in window) {
      ws = new WebSocket(url);
    }
    initEventHandle();
  } catch (e) {
    reconnect(url);
    console.log(e);
  }
}

/**
 * 初始化事件处理
 */
function initEventHandle() {
  ws.onclose = function () {
    reconnect(wsUrl);
    console.log('WS 连接关闭!' + new Date().toLocaleString());
  };
  ws.onerror = function () {
    reconnect(wsUrl);
    console.log('WS 连接错误!');
  };
  ws.onopen = function () {
    // 心跳检测重置
    heartCheck.reset().start();
    console.log('WS 连接成功!' + new Date().toLocaleString());
  };
  ws.onmessage = function (event: any) {
    // 如果获取到消息，心跳检测重置
    // 拿到任何消息都说明当前连接是正常的
    heartCheck.reset().start();
    console.log('WS 收到消息啦:' + event.data);
    if (event.data !== 'pong') {
      const data = JSON.parse(event.data);
      console.log(data, 'data');
    }
  };
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  ws.close();
};

/**
 * 重连
 * @param {string} url ws的URL
 * @returns null
 */
function reconnect(url: string) {
  if (lockReconnect) return;
  lockReconnect = true;
  // 没连接上，会一直重连，设置延迟 2s 避免连接频繁
  setTimeout(function () {
    createWebSocket(url);
    lockReconnect = false;
  }, 5000);
}

// 心跳检测
const heartCheck = {
  timeout: 5000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj as any);
    clearTimeout(this.serverTimeoutObj as any);
    return this;
  },
  start: function () {
    const self = this;
    // @ts-ignore
    this.timeoutObj = setTimeout(function () {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      ws.send('ping');
      console.log('ping!');
      // 如果超过一定时间还没重置，说明后端主动断开了
      // @ts-ignore
      self.serverTimeoutObj = setTimeout(function () {
        // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        ws.close();
      }, self.timeout);
    }, this.timeout);
  },
};
