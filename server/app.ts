import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
const serveIndex = require('./listing');
import { v4 as uuidv4 } from 'uuid'
// import morgan from "morgan"
import cors from "cors"
// import session from "express-session"
// import passport from "passport"
// import { Strategy as LocalStrategy } from "passport-local"
// import usersRouter from "./routes/users"
import { logger } from "./logger";


const app = express()

const env = app.get("env")

// view engine setup
// nunjucks.configure("views", {
//     autoescape: true,
//     express: app
// })
// app.set("view engine", "html")

// app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())

app.use(cors())

app.use("/static", serveIndex(path.join(__dirname, '../..')))
app.use("/static", express.static(path.join(__dirname, '../..')))


app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    console.error(err)

    // render the error page
    res.status(err.status || 500)
    res.render("error.html")
})

// const errorHandlerConfig = app.get('env') === 'development' ? { dumpExceptions: true, showStack: true } : {}
// app.use(express.errorHandler(errorHandlerConfig));

export default app
