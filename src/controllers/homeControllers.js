import pool from '../config/connectDB'

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

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    updateUserPage,
    postUpdateUser
}