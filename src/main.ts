import { secret } from './../config/keys';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser = require('body-parser');
import * as path from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
const flash = require('connect-flash');
import * as session from 'express-session';
import * as exphbs from 'express-handlebars';
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
  formatTitle,
} = require('../helpers/hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  // app.setGlobalPrefix("/api")
  app.useStaticAssets(path.join(__dirname, '..', 'upload'));
  // app.useStaticAssets("angular");
  app.useStaticAssets(path.join(__dirname,  'public'));
  app.setBaseViewsDir(path.join(__dirname,  'views'));
  app.setViewEngine('handlebars');
  // app.use((req, res, next) => {
  //   res.sendFile(path.join(__dirname,"angular", "index.html"));
  //   // res.send("app started");
  //   // next();
  // });
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.engine(
    'handlebars',
    exphbs({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        select,
        editIcon,
        // paginate: require("handlebars-paginate"),
        // pagination: paginateHelper.createPagination,
        formatTitle,
      },
      layoutsDir: path.join(__dirname, 'views/layouts'),
      partialsDir: path.join(__dirname, 'views/partials'),
      defaultLayout: 'main',
    }),
  );

  // Global variables
  app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.errors = req.flash('errors');
  res.locals.user = req.user || null;
  // res.locals.tags = req.tags || null; 
  next();
});
  await app.listen(port);
}
bootstrap();
