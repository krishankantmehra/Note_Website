var connection = require('./connection');

//get all users from database
getusers = () => {
    return new Promise(resolve => {
        connection.query("select * from users", (err, res) => {
            if (err) {
                console.log("error in finding all user query : \n" + err)
                resolve(err)
            }
            else {
                res = JSON.stringify(res)
                res = JSON.parse(res)
                resolve(res)
            }
        })
    })

}


// add a new user
add = async (user) => {


    return new Promise(resolve => {
        connection.query(`insert into users(name,password) values ('${user.name}','${user.password}')`, (err, res) => {

            if (err) {
                console.log(err)
                resolve(false)
            }
            else {
                resolve(true);
            }
        })

    })

}

//delete all users
drop = () => {
    connection.query("delete from users", (err, res) => {
        if (err) {
            console.log("error in deleting user query : \n" + err)
        }
        else {
            console.log("success");
        }
    })
}


//find a specific user
finduser = (s) => {
    const { name, password } = s

    return new Promise(resolve => {
        connection.query(`select * from users where name = "${name}" and password = "${password}"`, (err, res) => {
            if (err) {
                resolve(false)
            }
            else {
                if (res.length == 0) resolve(false)
                else resolve(true)
            }
        })
    })
}

//fetch data from database
getData = (name) => {
    return new Promise(resolve => {
        connection.query(`select * from data where user = "${name}"`, (err, res) => {
            if (err) {
                console.log(err)
                resolve(false)
            }
            else {
                resolve(res)
            }
        })
    })
}

//add new data 
addData = (data) => {
    // console.log(data);
    return new Promise(resolve => {
        connection.query(`insert into data value
        (default, 
        "${data.name}" ,
        "${data.title}" ,
        "${data.description}"
        )`
            , (err, res) => {
                if (err) {
                    console.log(err)
                    resolve(false)
                }
                else {
                    resolve(true)
                }
            })
    })
}

//delete data
deleteData = (id) => {
    return new Promise(resolve => {
        connection.query(`delete from data where id=${id}`, (err, res) => {
            if (err) {
                console.log(err)
                resolve(false)
            }
            else (

                resolve(true)
            )
        })
    })
}

//update Data
updateData = (data) => {
    // console.log(data);
    return new Promise(resolve => {
        connection.query(`update  data set
            title= "${data.title}",
            description="${data.description}"
            where id=${data.id}`

            , (err, res) => {
                if (err) {
                    console.log(err)
                    resolve(false)
                }
                else {
                    resolve(true)
                }
            })
    })
}


module.exports.delData = deleteData
module.exports.addData = addData
module.exports.updateData = updateData
module.exports.getData = getData
module.exports.All_users = getusers
module.exports.add = add
module.exports.del = drop
module.exports.find = finduser