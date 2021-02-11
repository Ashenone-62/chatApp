# chatApp
这是基于SOCKET.IO+Express+Vue+MySQL实现的前后端分离式聊天App

## 安装项目

```git
git clone https://github.com/Ashenone-62/chatApp.git
```

## 安装依赖

```cmd
cd ./chat-app-frontend
cnpm/npm install

cd ./chat-app-server
cnpm/npm install
```

## 配置数据库

**位置**: `./chat-app-server/public/javascripts/SQL.js`

```javascript
let options = {
    host: "localhost",//你的主机名
    user: "root",//你的sql用户名
    password: "*****",//你的sql密码
    database: "xxx"//你的数据库名
  }
```

## 导入数据表

**位置**: `./sql`

🚨🚨🚨如果导入失败，请按下表建立相应数据库及其内容

- users

|     字段     | 字段类型 |     数据形式      |
| :----------: | :------: | :---------------: |
|     uid      |   int    |         1         |
|   username   | varchar  |      test01       |
|    avatar    | varchar  | 图片路径/网络连接 |
| socket_token | varchar  |     socket.id     |
| online_state | varchar  |    true/false     |
|    group     | varchar  |     true/null     |

- chat表

|   字段   | 字段类型 |   数据形式   |
| :------: | :------: | :----------: |
|    id    |   int    |      1       |
| fromUser | varchar  |    test01    |
|  toUser  | varchar  |    test02    |
| content  | varchar  | 聊天文本内容 |
|   date   |  bigint  |    时间戳    |
|  isRead  | varchar  |  true/false  |

## 运行

```cmd
cd ./chat-app-frontend
npm run serve

cd ./chat-app-server
npm start
```

## LICENSE

[Apache License 2.0](https://github.com/Ashenone-62/chatApp/blob/master/LICENSE)

