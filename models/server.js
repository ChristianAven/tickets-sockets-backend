// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io'); 
const path     = require('path');
const Sokets   = require('./sockets');
const cors     = require('cors');

class Server  {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);

        // Configuración del socket server
        this.io = socketio(this.server, { /* configuraciones */ });

        this.sockets = new Sokets(this.io);

    }

    execute() {

        // inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        // this.configurarSockets();

        // inicializar server
        this.server.listen(this.port, () => {
            console.log(`Servidor en el PORT: ${this.port}`);
        });
    }

    middlewares() {
        //directorio publico
        this.app.use( express.static( path.resolve(__dirname, '../public') ) )

        //CORS
        this.app.use(cors());

        // GET de los ultimos tickets
        this.app.get('/ultimos', (req, res) => {

            res.status(201).json({
                ok: true,
                ultimos: this.sockets.ticketList.ultimos13,
            })

        })
    }

    // configurarSockets() {

    //      new Sokets(this.io);

    // }
}


module.exports = Server