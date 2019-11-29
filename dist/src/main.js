"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const flash = require('connect-flash');
const session = require("express-session");
const exphbs = require("express-handlebars");
const { formatDate, stripTags, truncate, editIcon, select, formatTitle, } = require('../helpers/hbs');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.enableCors();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.useStaticAssets(path.join(__dirname, '..', 'upload'));
    app.useStaticAssets(path.join(__dirname, 'public'));
    app.setBaseViewsDir(path.join(__dirname, 'views'));
    app.setViewEngine('handlebars');
    app.use(session({
        secret: 'nest cats',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.engine('handlebars', exphbs({
        helpers: {
            formatDate,
            stripTags,
            truncate,
            select,
            editIcon,
            formatTitle,
        },
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        defaultLayout: 'main',
    }));
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.errors = req.flash('errors');
        res.locals.user = req.user || null;
        next();
    });
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map