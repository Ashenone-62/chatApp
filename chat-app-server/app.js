var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//引入封装好的SQL查询
var sqlQuery = require('./public/javascripts/blogSQL.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//创建userList接口
app.get('/api/userlist',async function(req,res){
  //查询users表的所有内容的SQL语句
  let sqlStr_getUserList = "select * from users";
  //执行上面的语句，并把结果给res_getUserList
  let res_getUserList = await sqlQuery(sqlStr_getUserList)

  //解决跨域的问题，因为本地服务器是3000端口，前端是8080端口
  res.append('Access-Control-Allow-Origin','*');
  res.append('Access-Control-Allow-Content-Type','*');
  
  //发送一个json的响应，其内容是将res_getUserList转化为数组后的结果
  res.json(Array.from(res_getUserList))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
