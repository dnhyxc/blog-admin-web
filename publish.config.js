module.exports = {
  // 服务器配置
  serverInfo: {
    // 目标服务器IP
    host: '101.43.50.15',
    // 目标服务器用户名
    username: 'root',
    // 端口号
    port: 22,
  },
  nginxInfo: {
    remoteFilePath: '/usr/local/nginx/conf/nginx.conf',
    restartPath: '/usr/local/nginx/sbin'
  },
  serviceInfo1: {
    restartPath: '/usr/local/server'
  },
  blogAdminWeb: {
    name: 'admin_html',
    // dist 文件路径
    localFilePath: '/Users/dnhyxc/Documents/code/blog-admin-web',
    // 目标服务器项目文件路径
    remoteFilePath: '/usr/local/nginx/html_admin',
    isServer: false
  }
}