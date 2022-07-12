var express = require('express')
var exphbs = require('express-handlebars');
var express_hbs_sections = require('express-handlebars-sections')
var morgan = require('morgan');
var create_error = require('http-errors');
var numeral = require('numeral');
var handlebars = require('handlebars');
var path = require('path')
var fs = require('fs');


var https = require('https');
var https_options = {
    key: fs.readFileSync("Config/private.key"),
    cert: fs.readFileSync("Config/certificate.crt"),
    ca: [
            fs.readFileSync('Config/ca_bundle.crt'),
         ]
  };



var app = express();
const cors = require("cors");
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); //
app.use(morgan('dev'));
var hbs = exphbs.create({
    helpers: {
        sayHello: function() { alert("Hello World") },
        getStringifiedJson: function(value) {
            return JSON.stringify(value);
        }
    },
    extname: 'hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: [
        path.join(__dirname, 'views/partials'),
    ],
    defaultLayout: 'main.hbs',
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    let objWeb = {
        title:"UI Home",
        ID_JOB:req.query.JOB,
        Route:req.query.R
    }

    res.render('home', objWeb);
});

app.get('/PrepressUpload', (req, res, next) => {
    let objWeb = {
        title:"UI Home",
        ID_JOB:req.query.JOB
    }

    res.render('Prepress_Upload', objWeb);
});

app.get('/camera', (req, res, next) => {
    let objWeb = {
        title:"UI Home",
        DisableBody: true,
    }
    
    res.render('camera', objWeb);
});

app.get('/test', (req, res, next) => {
    let objWeb = {
        title:"UI Home",
        DisableBody: true,
    }
    
    res.render('test', objWeb);
});

app.get('/layoutstepping', (req, res, next) => {
    let objWeb = {
        title:"Layout Stepping",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('layoutstepping', objWeb);
});

app.get('/layoutartwork', (req, res, next) => {
    let objWeb = {
        title:"Layout Artwork",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('layoutartwork', objWeb);
});

app.get('/layoutapproval', (req, res, next) => {
    let objWeb = {
        title:"Layout Approval",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('layoutapproval', objWeb);
});

app.get('/documentView', (req, res, next) => {
    let objWeb = {
        title:"Document View",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('documentView', objWeb);
});

app.get('/lot', (req, res, next) => {
    let objWeb = {
        title:"Bảng phân phối LOT",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('lot', objWeb);
});

app.get('/lott', (req, res, next) => {
    let objWeb = {
        title:"Bảng phân phối LOT",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('lotnew', objWeb);
});

app.get('/uploadHistory', (req, res, next) => {
    let objWeb = {
        title:"Bảng phân phối LOT",
        ID_JOB:req.query.JOB,
        Route:req.query.R,
    }

    res.render('uploadhistory', objWeb);
});


app.get('/checklist/buildstock', (req, res, next) => {
    let objWeb = {
        title:"Bảng phân phối LOT",
        ID_JOB:req.query.JOB,
        SHOW:req.query.SHOW,
        Route:req.query.R,
    }
    res.render('checklist_BuildStock', objWeb);
});

//viet
app.get('/checklist/inkjet',(req,res,next) =>{
    let objWeb = {
        title: "Phiếu kiểm tra chất lượng  Inkjet",
        ID_JOB : req.query.JOB,
        SHOW:req.query.SHOW,
        Route:req.query.R,
    }
    res.render('checklist_inkjet', objWeb)
})
app.get('/checklist/laser',(req,res,next) =>{
    let objWeb = {
        title: "Phiếu kiểm tra chất lượng  Laser",
        ID_JOB : req.query.JOB,
        SHOW:req.query.SHOW,
        Route:req.query.R,
    }
    res.render('checklist_laser', objWeb)
})
app.get('/checklist/offset',(req,res,next) =>{
    let objWeb = {
        title: "Phiếu kiểm tra chất lượng  Offset",
        ID_JOB : req.query.JOB,
        SHOW:req.query.SHOW,
        Route:req.query.R,
    }
    res.render('checklist_offset', objWeb)
})



app.get('/test', (req, res, next) => {
    res.render('vwTest/test')
})

app.get('/login',(req, res, next) => {
    res.render('pages/login', {
        layout: false
    });
})
app.get('/DashboardUee', (req,res,next) => {
    res.render('pages/Dashboard_Uee',{
        title : "UEE Dashboard",
        
    })
})
app.get('/DashboardScrap',(req,res,next) => {
    res.render('pages/Dashboard_Scrap',{
        title : "Scrap Dashboard"
    })
})
// Auto scheduling Planning
app.get('/AutoPlan_Test',(req,res,next)=>{
    res.render('vwAutoScheduling/index',{
        title : 'Auto Scheduling Test'
    })
})

app.get('/cl/buildstock', (req, res, next) => {
    let objWeb = {
        title:"Quality Checklist Build Stock",
        ID_JOB:req.query.JOB,
        SHOW:req.query.SHOW,
        Route:req.query.R,
        clName:req.query.NAME,
        BU:req.query.BU,
    }
    res.render('cl_BuildStock', objWeb);
});






// API 
app.use('/api/AutoPlan_Test',require('./routes/AutoScheduling/routes.autoscheduling'))

app.use((req, res, next) => {
    next(create_error(404));
})

app.use((err, req, res, next) => {
    var status = err.status || 500;
    var vwErr = 'error';
    if (status === 404) {
        vwErr = '404'
    }
    // app.set('env', 'prod');
    // var isProd = app.get('env') === 'prod';
    process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
    var isProd = process.env.NODE_ENV === 'prod';
    var message = isProd ? 'An error has occured. Please contact administartor for more support.' : err.message;
    var error = isProd ? {} : err;

    var message = isProd ? 'An error has occured. Please contact administartor for more support.' : err.message;
    var error = isProd ? {} : err;

    res.status(status).render(vwErr, {
        layout: false,
        message,
        error
    });
})





var port = 80;


app.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`)
})

https.createServer(https_options, app).listen(443)

   
