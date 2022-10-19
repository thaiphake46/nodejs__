import connection from '../config/connectDB'

let getHomePage = (req, res) => {
    let data = []
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            results.map((row) => {
                data.push({
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    address: row.address
                })
            })
            // console.log(JSON.stringify(data)); // results contains rows returned by server
            console.log(data)
            return res.render('index.ejs', { dataUsers: data })

        }
    );

}

module.exports = {
    getHomePage
}