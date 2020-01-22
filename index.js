const linkrepository = require("./linkrepository");
const express = require("express");
const link = require("./link");

const app = express();
const repository = new linkrepository();

app.use(express.json());
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html")
})

app.get("/links", (request, response) => {
    repository.getAllLinks().then(links => {
        response.type("application/json");
        response.send(links);
    });
});


app.get("/link/:id", (request, response) => {
    repository.getLinkById(request.params["id"]).then(foundLink => {
        response.type("application/json");
        response.send(foundLink);
    });
});

app.get("/link/name/:name", (request, response) => {
    repository.findLinksByName(request.params["name"]).then(links => {
        response.type("application/json");
        response.send(links);
    });
});

app.post("/link/post",(request, response) => {
    if(!request.body) return response.sendStatus(400);
    response.type("application/json");
    response.send(request.body);
    let data = request.body;
    repository.insertLink(new link(0, data._name, data._link, data._pLanguage));
});

app.delete("/link/delete", (request, response) => {
    if(!request.body) return response.sendStatus(400);
    let data = request.body;
    repository.deleteLink(data._id);
    response.sendStatus(204);
})

app.listen(8080);