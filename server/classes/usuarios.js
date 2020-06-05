// clase usuarios que se encargara de todos lso usuarios conectados
class Usuarios {
    constructor() {
        this.personas = [];
    }

    //metodo agregar personas
    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala }
            // con el push se agrega un nuevo dato
            // al areglo personas
        this.personas.push(persona);


        return this.personas;

    }


    getPersona(id) {
        //filter recive como argumento persona
        //filter regresa siempre un nuevo areglo
        let persona = this.personas.filter(persona => persona = persona.id === id)[0];
        //let persona = this.personas.filter(persona => {
        //  return persona = persona.id = id;
        //por eso se ponen estas llaves y con 0 para indicar la primera
        //posicion y sea solo un uncico registro
        //})[0];
        // }
        //si funciona tentremos una persona de lo contrario un undefine
        return persona;
    }

    getPersonas() {

        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        // se obtiene la persona antes de que se borre del areglo
        let personaBorrada = this.getPersona(id);
        // se acutaliza el estado 
        //se borra del areglo
        this.personas = this.personas.filter(persona => persona.id != id);
        //regresa todas las personas  que sean diferentes al id
        // que se te estaenviando
        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}