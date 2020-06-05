const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {


    client.on('entrarChat', (data, callback) => {


        //validacion para que nombre y sala sean necesarios
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }
        //linea para enlasar a una sala
        client.join(data.sala);

        // LINEA PARA ASIGNAR UN USUARIO
        //let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        // solo se le estan mandando los parametros pero no se asigna a la variable
        // dado que se puede ocupar en este caso la funcion
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        //la linea de abajo es para que todos lo vean pero eso no es lo que 
        // se desea en este caso
        //client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        callback(usuarios.getPersonasPorSala(data.sala));

    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        //info que el cliente tiene que proporcionar
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });


    client.on('disconnect', () => {
        //me regresa la persona borrada con el id generado por cliente
        let personaBrorada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBrorada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBrorada.nombre} salio`));
        client.broadcast.to(personaBrorada.sala).emit('listaPersonas', usuarios.getPersonasPorSala());

    });

    //mensajes privados

    client.on('mensajePrivado', data => {
        // con esto se sabe que persona se envia el mensaje
        let persona = usuarios.getPersona(client.id);
        //validad que siempre venga cosa por hacer :v segun
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });


});