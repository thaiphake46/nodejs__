import pool from '../config/connectDB'

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUsers: rows })
    console.log('>>> check rows: ', rows)

}

let getDetailPage = async (req, res) => {
    let userId = req.params.id
    let [user, fields] = await pool.execute('select * from users where id = ?', [userId])

    return res.send(JSON.stringify(user))
}

module.exports = {
    getHomePage,
    getDetailPage
}