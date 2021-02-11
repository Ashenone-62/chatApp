var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//引入封装的sql
var sqlQuery = require('./public/javascripts/SQL.js');

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

//设置/api/userlist接口
app.get('/api/userlist',async function(req,res){
  //查不是群的成员
  let sqlStr_getUserList = "select * from users where `group` is null";
  let res_getUserList = await sqlQuery(sqlStr_getUserList)
  //解决跨域问题
  res.append('Access-Control-Allow-Origin','*');
  res.append('Access-Control-Allow-Content-Type','*');
  //将数据数组化后发送给前端
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
