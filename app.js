const express = require('express');
const twig = require('twig');
const app = express();

// console.log(app.env);

// 模板文件
app.set('views', 'dist/views');

// 静态文件
app.use('/static', express.static('dist'));

// 配置模板引擎
// app.set('view engine', 'twig');
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('view cache', false);
// app.set('twig options', {
//   allow_async: true,
//   strict_variables: false,
// });

app.get('/', function(req, res) {
  res.render('pages/index', {
    name: 'Tom',
  });
});

app.get('/contact', function(req, res) {
  res.render('pages/contact', {
    name: 'Tom',
  });
});

app.listen(8081, () => {
  console.log('http://127.0.0.1:8081');
});
