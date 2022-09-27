var connection = require('./connection');
var crypto = require('crypto-js')
var {secretKey, SHAkey} = require("./secretKey")


//get all users from database
getusers = () => {
    return new Promise(resolve => {
        connection.query("select * from users", (err, res) => {
            if (err) {
                console.log("error in finding all user query : \n" + err)
                resolve(err)
            }
            else {
                resolve(res)
            }
        })
    })

}


// add a new user
add = async (user) => {

    //Encrypt Data
    var EncUser = crypto.SHA1(user.name , SHAkey);
    var EncPassword = crypto.SHA1(user.password , SHAkey);
    
    return new Promise(resolve => {
        connection.query(`insert into users(name,password) values ('${EncUser}','${EncPassword}')`, (err, res) => {

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
    
    //Encrypt
    var EncName  = crypto.SHA1(name, SHAkey)
    var EncPassword  = crypto.SHA1(password, SHAkey)
    
    return new Promise(resolve => {
        connection.query(`select * from users where name = "${EncName}" and password = "${EncPassword}"`, (err, res) => {
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
    name  = crypto.SHA1(name, SHAkey)
    return new Promise(resolve => {
        connection.query(`select * from data where user = "${name}"`, (err, res) => {
            if (err) {
                console.log(err)
                resolve(false)
            }
            else {
                // Decrypt Data
                var Data = [];
                res.forEach(tuple => {
                    Data.push({
                        id: tuple.id,
                        user: tuple.user,
                        title: crypto.AES.decrypt(tuple.title, secretKey).toString(crypto.enc.Utf8),
                        description: crypto.AES.decrypt(tuple.description, secretKey).toString(crypto.enc.Utf8)
                    })
                });

                resolve(Data)
            }
        })
    })
}

//add new data 
addData = (data) => {
    //Encrypt Data
    var EncTitle = crypto.AES.encrypt(data.title,secretKey).toString();
    var EncDescription = crypto.AES.encrypt(data.description,secretKey).toString()
    var EncUser = crypto.SHA1(data.name, SHAkey)
    //Store Encrypted Data in Database
    return new Promise(resolve => {
        connection.query(`insert into data value
        (default, 
        "${EncUser}" ,
        "${EncTitle}" ,
        "${EncDescription}"
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
    //Encrypt Data
    var EncTitle = crypto.AES.encrypt(data.title,secretKey).toString();
    var EncDescription = crypto.AES.encrypt(data.description,secretKey).toString()

    return new Promise(resolve => {
        connection.query(`update  data set
            title= "${EncTitle}",
            description="${EncDescription}"
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