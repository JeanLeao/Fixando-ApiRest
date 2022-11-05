//var game = DB.games.find(game => game.id == value);
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors()) // TIRANDO A SEGURANÇA
app.use(express.urlencoded({extended: true})) // NECESSÁRIO PARA BUSCAR UM DADO EM UM BODY 
app.use(express.json()); // NECESSÁRIO PARA BUSCAR UM DADO EM UM BODY 

var DB = { // BANCO DE DADOS FALSO
    games: 
    [

        {
            id: 23,
            title: "Call Of Duty",
            year: 2000,
            price: 10,        
        },
        {
            id: 13,
            title: "Assassin's Creed",
            year: 2020,
            price: 60,        
        },
        {
            id: 3,
            title: "Harry Potter",
            year: 2022,
            price: 200,        
        },
        {
            id: 22,
            title: "God Of War",
            year: 2021,
            price: 100,        
        }
    ]
}


app.get('/games', (req,res) => {
    res.statusCode = 200;
    res.json(DB)
});

app.get('/game/:id', (req,res) => {
    var id = req.params.id;
    if (isNaN(id)){
        res.sendStatus(400)
    }else{
        var value = parseInt(req.params.id);
        var game = DB.games.find((games) => games.id == value)
        if (game != undefined) {
            res.statusCode = 200;
            res.json(game)
        }else{
            res.sendStatus(404);
        }
    }
});


app.post('/game', (req,res) => {
    const {title, year, price, id} = req.body;
        DB.games.push({
            id,
            title,
            year,
            price
        })
        res.sendStatus(200)
})

app.delete('/game/:id', (req,res) => {
    var del = req.params.id;
    if (isNaN(del)){
        res.sendStatus(400)
    }else{
        var value = parseInt(del);
        var index = DB.games.findIndex((games) => games.id == value)
        var game = DB.games.find((games) => games.id == value)
        if (game == undefined) {
            res.sendStatus(404);
        }else{
            res.statusCode = 200;
            DB.games.splice(index,1)
            res.sendStatus(200)
        }
    }
});


app.put('/game/:id', (req,res) => {
    var id = req.params.id;  
    var {title, price, year} = req.body;
    
    if (isNaN(id)){
        res.sendStatus(400)
    }else{
        var value = parseInt(req.params.id);
        var game = DB.games.find((games) => games.id == value)
        if (game != undefined) {
            if (title != undefined){
                game.title = title;
            }
            if (price != undefined){
                game.price = price;
            }
            if (year != undefined){
                game.year = year;
            }
            
            res.sendStatus(200)
        }else{
            res.sendStatus(404);
        }
    }
})

app.listen(1234, () => {
    console.log('Api Rodando')
});