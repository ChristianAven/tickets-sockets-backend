const TicketList = require("./ticket-list");



class Sokets {

    constructor( io ) {
        this.io = io;

        // crear la instancia de nuestra lista de tickets
        this.ticketList = new TicketList;

        this.socketEvents();

    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('cliente conectado!!');

            socket.on( 'solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback( nuevoTicket );
            })

            socket.on( 'siguiente-ticket-trabajar', (usuario, callback) => {
                const newTicket = this.ticketList.asignarTicket( usuario.nombre, usuario.escritorio );
                callback( newTicket );

                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            })
                   
        });
    }
}

module.exports = Sokets