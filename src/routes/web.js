import express from "express";
import homeControllers from '../controllers/homeControllers'
import multer from 'multer';
import path from 'path';
import helpers from '../controllers/helpers'
var appRoot = require('app-root-path');
let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter });

const initWebRoute = (app) => {
    router.get('/', homeControllers.getHomePage)
    router.get('/detail/user/:id', homeControllers.getDetailPage)
    router.post('/create-data-user', homeControllers.createNewUser)
    router.post('/delete-data-user', homeControllers.deleteUser)
    router.get('/update/user/:id', homeControllers.updateUserPage)
    router.post('/update-user', homeControllers.postUpdateUser)

    router.get('/upload', homeControllers.uploadPage)
    // router.post('/upload-profile-pic', upload.single('profile_pic'), homeControllers.handleUploadFile)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeControllers.handleUploadFile)

    router.get('/login', homeControllers.loginPage)
    router.get('/register', homeControllers.registerPage)
    router.post('/registerUser', homeControllers.registerUser)
    router.get('/userexist', homeControllers.userexistPage)


    return app.use('/', router)
}

module.exports = initWebRoute