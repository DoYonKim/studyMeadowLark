var express = require('express');//./가 없는 경우 node_module에서 찾는다.
var fortune = require('./lib/fortune.js');//./를 붙이는 경우 모듈을 node_modules 디렉토리에서 찾지 않는다.
var weathers = require('./lib/weather.js');
var app = express();

//핸들바 뷰 엔진 설정
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers:{
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);


//Static 미들웨어-정적 자원을 전송하는 역할
app.use(express.static(__dirname + '/public'));

//테스트를 위한 미들웨어.
app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use(function(req,res,next){
    if(!res.locals.partials)res.locals.partials = {};
    res.locals.partials.weatherContext = weathers.getWeatherDate();
    next();
})

//라우터
app.get('/',function(req,res){
    res.render('home');
});

app.get('/about',function(req,res){
    res.render('about',{
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river',function(req,res){
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate',function(req,res){
    res.render('/tours/request-group-rate');
});

app.get('/header',function(req,res){

    var headerInfo = '';
    for(var name in req.header)
        headerInfo += name + ': ' + req.header[name] + '\n';
    if(headerInfo === '')
        headerInfo = "Header is empty.";

    res.render('header',{
        headerInfomation: headerInfo
    });
});

//커스텀 404 페이지
app.use(function(req,res){
    res.status(404);
    res.render('404');});

//커스텀 500 페이지
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' +
                app.get('port')+'; press Ctrl-C to terminate.');
});

if(app.thing==null) console.log('bleat!');