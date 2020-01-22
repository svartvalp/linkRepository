const mysql = require("mysql");
const link = require('./link');


class LinkRepository {
    constructor() {
        this.conn = mysql.createConnection({
            host : "127.0.0.1",
            port : "3306",
            user : "node",
            database : "mydb",
            password : "user"
        });
    }

    getAllLinks() {
        return new Promise((resolve, reject) => {
                    let links = [];
                    this.conn.query("SELECT * FROM mydb.usefullinks", function(err, result) {
                    for(let i = 0; i < result.length; i++) {
                        links.push( new link(result[i].id, result[i].name, result[i].link, result[i].pLanguage));
                    }
                    resolve(links);
                });  
        });
    }
    getLinkById(id) {
            return new Promise((resolve, reject) => {
                let foundLink = undefined;
                this.conn.query("SELECT * FROM mydb.usefullinks WHERE id = ?", id, (err, result) => {
                    foundLink = new link(id, result[0].name, result[0].link, result[0].pLanguage); 
                    resolve(foundLink);
                });
               
            });
    }
    insertLink(newLink) {
        return new Promise((resolve, reject) => {
            this.conn.query("INSERT INTO mydb.usefullinks(name, link, pLanguage) VALUES(?, ?, ?)", [newLink.name, newLink.link, newLink.pLanguage],
            (err, result) => {
                if(!err) {
                    console.log("norm");
                }
            });
        });
    }
    deleteLink(id) {
        return new Promise((resolve, reject) => {
            this.conn.query("DELETE FROM mydb.usefullinks WHERE id = ?", id, (err, result) =>{
                if(!err) {
                    console.log("works");
                }
            });
        })
    }
    findLinksByName(name) {
        return new Promise((resolve, reject) => {
            this.conn.query("SELECT * FROM mydb.usefullinks", (err, result) => {
                let links = [];
                for(let i = 0; i< result.length; i++) {
                    if (result[i].name.indexOf(name) != -1) {
                        links.push(new link(result[i].id, result[i].name, result[i].link, result[i].pLanguage));
                    }
                }
                resolve(links);
            });
        });
    }
    closeConnection() {
        this.conn.end();
    }
}

module.exports = LinkRepository;