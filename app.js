const express = require('express');
const app = express();
const DataBase = require('./db/Database')


async function main() {
    const db = new DataBase();
    await db.init();
    app.use(express.json({ extended: true }))
    app.use('/api/img', require('./routes/image.routes'))
    app.use('/api/clothes', require('./routes/clothes.routes'))
    app.use('/api/auth', require('./routes/auth.routes'))
    app.use('/api/cart', require('./routes/cart.routes'))
    app.use('/api/delivery', require('./routes/delivery.routes'))
}



const PORT = 5000;

app.get("/", (req, res)=> {
    res.send('ok');
})


async function start(){
    try {
        app.listen(PORT, ()=>{
            console.log(`App has been started on server on port ${PORT}...`)
        })
    } catch (e){
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

main().then(() => start())
