const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://surya-regalla:suryateja@suryadb.gyivzzg.mongodb.net/test", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    username: String, 
    password: String
});

const User = mongoose.model("User", userSchema);

const newsSchema = new mongoose.Schema({
    game: String,
    status: String,
    date: String,
    direct: String
});

const News = mongoose.model("News", newsSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    roll: String,
    email: String,
    feedback: String
});

const Contact = mongoose.model("Contact", contactSchema);

const bgmiteamSchema = new mongoose.Schema({
    teamname: String,
    wappnum: String,
    p1name: String,
    p1roll: String,
    p1id: String,
    p2name: String,
    p2roll: String,
    p2id: String,
    p3name: String,
    p3roll: String,
    p3id: String,
    p4name: String,
    p4roll: String,
    p4id: String,
});

const bgmiTeams = mongoose.model("Bgmi Teams", bgmiteamSchema);

const bgmipointSchema = new mongoose.Schema({
    teamname: String,
    ppoints: Number,
    kpoints: Number,
    tpoints: Number
});

const bgmiPoints = mongoose.model("Bgmi Points", bgmipointSchema);

const ffteamSchema = new mongoose.Schema({
    teamname: String,
    wappnum: String,
    p1name: String,
    p1roll: String,
    p1id: String,
    p2name: String,
    p2roll: String,
    p2id: String,
    p3name: String,
    p3roll: String,
    p3id: String,
    p4name: String,
    p4roll: String,
    p4id: String,
});

const ffTeams = mongoose.model("FF Teams", ffteamSchema);

const ffpointSchema = new mongoose.Schema({
    teamname: String,
    ppoints: Number,
    kpoints: Number,
    tpoints: Number
});

const ffPoints = mongoose.model("FF Points", ffpointSchema);

const valoteamSchema = new mongoose.Schema({
    teamname: String,
    wappnum: String,
    p1name: String,
    p1roll: String,
    p1id: String,
    p2name: String,
    p2roll: String,
    p2id: String,
    p3name: String,
    p3roll: String,
    p3id: String,
    p4name: String,
    p4roll: String,
    p4id: String,
    p5name: String,
    p5roll: String,
    p5id: String
});

const valoTeams = mongoose.model("Valo Teams", valoteamSchema);

const valopointSchema = new mongoose.Schema({
    teamname: String,
    played: Number,
    wins: Number,
    losses: Number,
    tpoints: Number
});

const valoPoints = mongoose.model("Valo Points", valopointSchema);

const bgmiHistorySchema = new mongoose.Schema({
    date: String,
    points: {
        type: Object,
        ref: "Bgmi Points"
    }
});

const bgmiHistory = mongoose.model("Bgmi History", bgmiHistorySchema);

const ffHistorySchema = new mongoose.Schema({
    date: String,
    points: {
        type: Object,
        ref: "FF Points"
    }
});

const ffHistory = mongoose.model("FF History", ffHistorySchema);

const valoHistorySchema = new mongoose.Schema({
    date: String,
    points: {
        type: Object,
        ref: "Valo Points"
    }
});

const valoHistory = mongoose.model("Valo History", valoHistorySchema);

var loginStatus = false;

app.get("/login", function(req, res)
{
    if(loginStatus)
    {
        res.send({LoggedIn: true});
    }
    else
    {
        res.send({LoggedIn: false});
    }
});

app.post("/login", async function(req, res)
{
    // const user = new User({
    //     username: req.body.credential.username,
    //     password: req.body.credential.password
    // });
    // user.save();

    const foundUser = await User.findOne({username: req.body.credential.username, password: req.body.credential.password});
    if(foundUser)
    {
        loginStatus = true;
        res.send({flag: true});
    }
});

app.get("/logout", function(req, res)
{
    loginStatus = false;
    res.send("Successfully logged out.");
});

app.get("/", async function(req, res)
{
    const newsItems = await News.find();

    var newsArray = [];
    newsItems.forEach(function(single)
    {
        var temp = single;
        newsArray.push(temp);
    });
    res.send(JSON.stringify(newsArray));
});

app.post("/", function(req, res)
{
    var temp = req.body.addItems.game;
    var temp3 = "/";
    var temp2 = temp3.concat(temp.toLowerCase());

    const newItem = new News({
        game: req.body.addItems.game,
        status: req.body.addItems.status,
        date: req.body.addItems.date,
        direct: temp2
    });
    newItem.save();
});


app.post("/edit-cards", async function(req, res)
{
    const updatedResult = await News.findByIdAndUpdate(
        { _id: req.body.ID },
        {
            status: req.body.tableItems.status,
            date: req.body.tableItems.date
        }
    );
});


app.get("/bgmi-points-table", async function(req, res)
{
    const StandingItems = await bgmiPoints.find();

    var StandingsArray = [];
    StandingItems.forEach(function(single)
    {
        var temp = single;
        StandingsArray.push(temp);
    });
    res.send(JSON.stringify(StandingsArray));
});

app.post("/bgmi-register", function(req, res)
{
    const TeamItem = new bgmiTeams({
        teamname: req.body.addData.Tname,
        wappnum: req.body.addData.Wnum,
        p1name: req.body.addData.P1name,
        p1roll: req.body.addData.P1roll,
        p1id: req.body.addData.P1id,
        p2name: req.body.addData.P2name,
        p2roll: req.body.addData.P2roll,
        p2id: req.body.addData.P2id,
        p3name: req.body.addData.P3name,
        p3roll: req.body.addData.P3roll,
        p3id: req.body.addData.P3id,
        p4name: req.body.addData.P4name,
        p4roll: req.body.addData.P4roll,
        p4id: req.body.addData.P4id
    });
    TeamItem.save();

    const EachItem = new bgmiPoints({
        teamname: req.body.addData.Tname,
        ppoints: 0,
        kpoints: 0,
        tpoints: 0
    });
    EachItem.save();
});

app.post("/bgmi-edit-points", async function(req, res)
{
    const updatedResult = await bgmiPoints.findByIdAndUpdate(
        { _id: req.body.ID },
        {
            ppoints: req.body.tableItems.ppoints,
            kpoints: req.body.tableItems.kpoints,
            tpoints: Number(req.body.tableItems.ppoints)+Number(req.body.tableItems.kpoints)
        }
    );
});

app.get("/bgmi-teams", async function(req, res)
{
    const bgmiItems = await bgmiTeams.find();

    var bgmiArray = [];
    bgmiItems.forEach(function(single)
    {
        var temp = single;
        bgmiArray.push(temp);
    });
    res.send(JSON.stringify(bgmiArray));
});

app.get("/ff-points-table", async function(req, res)
{
    const StandingItems = await ffPoints.find();

    var StandingsArray = [];
    StandingItems.forEach(function(single)
    {
        var temp = single;
        StandingsArray.push(temp);
    });
    res.send(JSON.stringify(StandingsArray));
});

app.post("/ff-register", function(req, res)
{
    const TeamItem = new ffTeams({
        teamname: req.body.addData.Tname,
        wappnum: req.body.addData.Wnum,
        p1name: req.body.addData.P1name,
        p1roll: req.body.addData.P1roll,
        p1id: req.body.addData.P1id,
        p2name: req.body.addData.P2name,
        p2roll: req.body.addData.P2roll,
        p2id: req.body.addData.P2id,
        p3name: req.body.addData.P3name,
        p3roll: req.body.addData.P3roll,
        p3id: req.body.addData.P3id,
        p4name: req.body.addData.P4name,
        p4roll: req.body.addData.P4roll,
        p4id: req.body.addData.P4id
    });
    TeamItem.save();

    const EachItem = new ffPoints({
        teamname: req.body.addData.Tname,
        ppoints: 0,
        kpoints: 0,
        tpoints: 0
    });
    EachItem.save();
});

app.get("/ff-teams", async function(req, res)
{
    const ffItems = await ffTeams.find();

    var ffArray = [];
    ffItems.forEach(function(single)
    {
        var temp = single;
        ffArray.push(temp);
    });
    res.send(JSON.stringify(ffArray));
});

app.post("/ff-edit-points", async function(req, res)
{
    const updatedResult = await ffPoints.findByIdAndUpdate(
        { _id: req.body.ID },
        {
            ppoints: req.body.tableItems.ppoints,
            kpoints: req.body.tableItems.kpoints,
            tpoints: Number(req.body.tableItems.ppoints)+Number(req.body.tableItems.kpoints)
        }
    );
});

app.get("/valo-points-table", async function(req, res)
{
    const StandingItems = await valoPoints.find();

    var StandingsArray = [];
    StandingItems.forEach(function(single)
    {
        var temp = single;
        StandingsArray.push(temp);
    });
    res.send(JSON.stringify(StandingsArray));
});

app.post("/valo-register", function(req, res)
{
    const TeamItem = new valoTeams({
        teamname: req.body.addData.Tname,
        wappnum: req.body.addData.Wnum,
        p1name: req.body.addData.P1name,
        p1roll: req.body.addData.P1roll,
        p1id: req.body.addData.P1id,
        p2name: req.body.addData.P2name,
        p2roll: req.body.addData.P2roll,
        p2id: req.body.addData.P2id,
        p3name: req.body.addData.P3name,
        p3roll: req.body.addData.P3roll,
        p3id: req.body.addData.P3id,
        p4name: req.body.addData.P4name,
        p4roll: req.body.addData.P4roll,
        p4id: req.body.addData.P4id,
        p5name: req.body.addData.P5name,
        p5roll: req.body.addData.P5roll,
        p5id: req.body.addData.P5id
    });
    TeamItem.save();

    const EachItem = new valoPoints({
        teamname: req.body.addData.Tname,
        played: 0,
        wins: 0,
        losses: 0,
        tpoints: 0
    });
    EachItem.save();
});

app.get("/valo-teams", async function(req, res)
{
    const valoItems = await valoTeams.find();

    var valoArray = [];
    valoItems.forEach(function(single)
    {
        var temp = single;
        valoArray.push(temp);
    });
    res.send(JSON.stringify(valoArray));
});

app.post("/valo-edit-points", async function(req, res)
{
    const updatedResult = await valoPoints.findByIdAndUpdate(
        { _id: req.body.ID },
        {
            played: req.body.tableItems.played,
            wins: req.body.tableItems.wins,
            losses: req.body.tableItems.losses,
            tpoints: req.body.tableItems.tpoints
        }
    );
});

app.post("/tourni-starts", async function(req, res)
{
    const updatedResult = await News.findOneAndUpdate(
        { game: req.body.gamename },
        {
            direct: req.body.direct
        }
    );
});

app.post("/tourni-end", async function(req, res)
{
    const updatedResult = await News.findOneAndUpdate(
        { game: req.body.gamename },
        {
            direct: req.body.direct
        }
    );

    const foundUser = await News.findOne({game: req.body.gamename});
    var date1 = foundUser.date;

    if(req.body.gamename === "BGMI")
    {
        const StandingItems = await bgmiPoints.find();
        const sorted = [...StandingItems].sort((a, b) => (a.tpoints < b.tpoints) ? 1 : -1);
        const temp = new bgmiHistory({
            date: date1,
            points: sorted
        });
        temp.save();

        bgmiPoints.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
        });
        bgmiTeams.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
        });
    }
    else if(req.body.gamename === "FREE FIRE")
    {
        const StandingItems = await ffPoints.find();
        const sorted = [...StandingItems].sort((a, b) => (a.tpoints < b.tpoints) ? 1 : -1);
        const temp = new ffHistory({
            date: date1,
            points: sorted
        });
        temp.save();

        ffPoints.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
        });
        ffTeams.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
        });
    }
    else if(req.body.gamename === "VALORANT")
    {
        const StandingItems = await valoPoints.find();
        const sorted = [...StandingItems].sort((a, b) => (a.tpoints < b.tpoints) ? 1 : -1);
        const temp = new valoHistory({
            date: date1,
            points: sorted
        });
        temp.save();

        valoPoints.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
        });
        valoTeams.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
        });
    }
});

app.get("/bgmi-tourni-end", async function(req, res)
{
    const StandingItems = await bgmiHistory.find();

    var StandingsArray = [];
    StandingItems.forEach(function(single)
    {
        var temp = single;
        StandingsArray.push(temp);
    });
    res.send(JSON.stringify(StandingsArray));
});

app.get("/ff-tourni-end", async function(req, res)
{
    const StandingItems = await ffHistory.find();

    var StandingsArray = [];
    StandingItems.forEach(function(single)
    {
        var temp = single;
        StandingsArray.push(temp);
    });
    res.send(JSON.stringify(StandingsArray));
});

app.get("/valo-tourni-end", async function(req, res)
{
    const StandingItems = await valoHistory.find();

    var StandingsArray = [];
    StandingItems.forEach(function(single)
    {
        var temp = single;
        StandingsArray.push(temp);
    });
    res.send(JSON.stringify(StandingsArray));
});

app.get("/contact-info", async function(req, res)
{
    const contactItems = await Contact.find();

    var contactArray = [];
    contactItems.forEach(function(single)
    {
        var temp = single;
        contactArray.push(temp);
    });
    res.send(JSON.stringify(contactArray));
});

app.post("/contact-info", async function(req, res)
{
    const ContactItem = new Contact({
        name: req.body.items.name,
        roll: req.body.items.roll,
        email: req.body.items.email,
        feedback: req.body.items.feedback
    });
    ContactItem.save();
});

app.post("/delete", async function(req, res)
{
    News.findOneAndDelete({_id: req.body.sample})
    .then(res.send("Deleted Card"))
    .catch(err => next(err));
});

app.listen(8080, function()
{
    console.log("Server Started!");
});
