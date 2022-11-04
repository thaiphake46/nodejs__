import pool from '../config/connectDB'
import multer from 'multer'
import path from 'path'
import helpers from './helpers'

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUsers: rows })

}

let getDetailPage = async (req, res) => {
    let userId = req.params.id
    let [user, fields] = await pool.execute('select * from users where id = ?', [userId])

    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    // console.log('>>> check req: ', req.body)
    let { firstName, lastName, email, address } = req.body
    await pool.execute(
        'INSERT INTO users (firstName, lastName, email, address) VALUES (?,?,?,?)',
        [firstName, lastName, email, address]
    )
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId
    await pool.execute(
        'DELETE FROM users WHERE id = ?;',
        [userId]
    )
    return res.redirect('/')
}

let updateUserPage = async (req, res) => {
    let userId = req.params.id
    const [rows, fields] = await pool.execute(
        'SELECT * FROM `users` where id = ?',
        [userId]
    );
    // console.log(rows)
    return res.render('update.ejs', { dataUsers: rows[0] })
}

let postUpdateUser = async (req, res) => { // update user to database
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute(
        `UPDATE users
        SET firstName = ?, lastName = ?, email = ?, address = ?
        WHERE id = ?;`,
        [firstName, lastName, email, address, id]
    )
    return res.redirect('/')
}
let uploadPage = (req, res) => {
    res.render('upload.ejs')
}

let loginPage = (req, res) => {
    return res.render('login.ejs')
}

let registerPage = (req, res) => {
    res.render('register.ejs')
}
let registerUser = async (req, res) => {
    // console.log('>>> check req: ', req.body)
    let { email, password } = req.body
    // SELECT email FROM `login` WHERE email = "huythaia123@gmail.com";
    let [user] = await pool.execute(
        'SELECT email FROM `login` WHERE email = (?)',
        [email],
        function (err, results, fields) {
            if (err) {
            }
        }
    )
    if (user.length === 0) {
        await pool.execute(
            'INSERT INTO login ( email, password) VALUES (?,?)',
            [email, password]
        )
        return res.redirect('/login')
    }
    else {
        return res.redirect('/userexist')
    }
}

let userexistPage = (req, res) => {
    res.render('userexist.ejs')
}

// handle upload file
const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}
////////////////////////////////////////////////////////////

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    updateUserPage,
    postUpdateUser,
    uploadPage,
    loginPage,
    registerPage,
    registerUser,
    userexistPage,
    handleUploadFile,
}