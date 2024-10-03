// Clase Avatar para encapsular las propiedades de los personajes
class Avatar {
    constructor(nombre, imagen, poder) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.poder = poder;
    }
}

// Instancias de personajes
let zuko = new Avatar('Zuko', './imagenes/Zuko.png', 5);
let katara = new Avatar('Katara', './imagenes/Katara.png', 4);
let aang = new Avatar('Aang', './imagenes/Aang.png', 6);
let toph = new Avatar('Toph', './imagenes/Toph.png', 5);

// Arreglo que almacena los personajes
let avatares = [];
avatares.push(zuko, katara, aang, toph);

// Objeto para encapsular el estado y la lógica del juego
const juego = {
    ataqueJugador: '', // Almacena el ataque seleccionado por el jugador
    ataqueEnemigo: '', // Almacena el ataque seleccionado por el enemigo
    personajeEnemigo: '', // Almacena el personaje seleccionado por el enemigo
    vidasJugador: 3, // Número de vidas del jugador
    vidasEnemigo: 3, // Número de vidas del enemigo

    // Método para iniciar el juego
    iniciar() {
        this.ocultarSecciones(); // Oculta secciones que no se deben mostrar al inicio
        this.configurarEventos(); // Configura los eventos de los botones
    },

    // Oculta las secciones del juego
    ocultarSecciones() {
        ['reglas-del-juego', 'seleccionar-personaje', 'seleccion-ataque', 'reiniciar']
            .forEach(id => document.getElementById(id).style.display = 'none');
    },

    // Configura los eventos de los botones
    configurarEventos() {
        document.getElementById('boton-personaje').addEventListener('click', this.seleccionarPersonajeJugador.bind(this));
        ['golpe', 'patada', 'gancho'].forEach(ataque => {
            document.getElementById(`boton-${ataque}`).addEventListener('click', () => {
                this.seleccionarAtaque(ataque);
                this.combate();
            });
        });
        document.getElementById('boton-reiniciar').addEventListener('click', this.reiniciarJuego.bind(this));
        document.getElementById('boton-reglas').addEventListener('click', this.comenzarJuego.bind(this));
        document.getElementById('boton-jugar').addEventListener('click', this.mostrarSeleccionarPersonaje.bind(this));
    },

    // Muestra la sección de reglas del juego
    comenzarJuego() {
        document.getElementById('menu-principal').style.display = 'none';
        document.getElementById('reglas-del-juego').style.display = 'block';
        this.cambiarTamanoImagen('titulo-imagen', 'titulo-imagen-grande', 'titulo-imagen-pequena');
    },

    // Muestra la sección para seleccionar el personaje
    mostrarSeleccionarPersonaje() {
        document.getElementById('reglas-del-juego').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'block';
    },

    // Selecciona el personaje del jugador y el enemigo
    seleccionarPersonajeJugador() {
        const personaje = this.obtenerPersonajeSeleccionado();
        if (!personaje) {
            alert('Por favor, selecciona un personaje');
            return;
        }

        document.getElementById('personaje-jugador').innerHTML = personaje.nombre;
        this.personajeEnemigo = this.seleccionarEnemigoAleatorio();
        document.getElementById('personaje-enemigo').innerHTML = this.personajeEnemigo.nombre;

        document.getElementById('seleccionar-personaje').style.display = 'none';
        document.getElementById('seleccion-ataque').style.display = 'block';
        this.actualizarImagenesPersonajes(personaje, this.personajeEnemigo);
    },

    // Selecciona el ataque del jugador
    seleccionarAtaque(ataque) {
        this.ataqueJugador = ataque;
    },

    // Selecciona un personaje enemigo aleatorio
    seleccionarEnemigoAleatorio() {
        return avatares[Math.floor(Math.random() * avatares.length)];
    },

    // Obtiene el personaje seleccionado por el jugador
    obtenerPersonajeSeleccionado() {
        for (let personaje of avatares) {
            const inputPersonaje = document.getElementById(personaje.nombre.toLowerCase());
            if (inputPersonaje.checked) {
                return personaje;
            }
        }
        return null;
    },

    // Actualiza las imágenes de los personajes en la interfaz
    actualizarImagenesPersonajes(personajeJugador, personajeEnemigo) {
        document.getElementById('imagen-personaje-jugador').src = personajeJugador.imagen;
        document.getElementById('imagen-personaje-enemigo').src = personajeEnemigo.imagen;
    },

    // Maneja la lógica del combate
    combate() {
        if (!this.ataqueJugador) {
            alert('Selecciona un ataque primero');
            return;
        }

        this.ataqueEnemigo = this.seleccionarAtaqueEnemigo();
        const resultado = this.determinarGanador(this.ataqueJugador, this.ataqueEnemigo);
        this.mostrarMensaje(this.ataqueEnemigo, resultado);
        this.actualizarVidas();
    },

    // Selecciona un ataque enemigo aleatorio
    seleccionarAtaqueEnemigo() {
        const ataques = ['golpe', 'patada', 'gancho'];
        return ataques[Math.floor(Math.random() * ataques.length)];
    },

    // Determina el ganador del combate basado en los ataques
    determinarGanador(ataqueJugador, ataqueEnemigo) {
        if (ataqueJugador === ataqueEnemigo) {
            return 'Empate';
        }
        if (
            (ataqueJugador === 'golpe' && ataqueEnemigo === 'gancho') ||
            (ataqueJugador === 'patada' && ataqueEnemigo === 'golpe') ||
            (ataqueJugador === 'gancho' && ataqueEnemigo === 'patada')
        ) {
            this.vidasEnemigo--;
            return '¡Ganaste!';
        } else {
            this.vidasJugador--;
            return '¡Perdiste!';
        }
    },

    // Muestra el mensaje de resultados en la interfaz
    mostrarMensaje(ataqueEnemigo, resultado) {
        const mensajes = document.getElementById('mensajes');
        mensajes.innerHTML = `
            <p>Tu ataque: ${this.ataqueJugador}</p>
            <p>Ataque del enemigo: ${ataqueEnemigo}</p>
            <p>${resultado}</p>`;
    },

    // Actualiza el conteo de vidas en la interfaz
    actualizarVidas() {
        document.getElementById('vidas-jugador').innerHTML = this.vidasJugador;
        document.getElementById('vidas-enemigo').innerHTML = this.vidasEnemigo;

        if (this.vidasJugador === 0 || this.vidasEnemigo === 0) {
            this.finalizarJuego(this.vidasJugador === 0 ? 'Perdiste el juego' : 'Ganaste el juego');
        }
    },

    // Muestra el mensaje final y permite reiniciar el juego
    finalizarJuego(mensaje) {
        this.mostrarMensaje('', mensaje);
        document.getElementById('seleccion-ataque').style.display = 'none';
        document.getElementById('reiniciar').style.display = 'block';
    },

    // Reinicia el estado del juego
    reiniciarJuego() {
        this.vidasJugador = 3;
        this.vidasEnemigo = 3;
        document.getElementById('vidas-jugador').innerHTML = this.vidasJugador;
        document.getElementById('vidas-enemigo').innerHTML = this.vidasEnemigo;
        document.getElementById('seleccion-ataque').style.display = 'none';
        document.getElementById('menu-principal').style.display = 'block';
        document.getElementById('reiniciar').style.display = 'none';
    },

    // Cambia el tamaño de la imagen del título
    cambiarTamanoImagen(idImagen, claseRemover, claseAgregar) {
        const imagen = document.getElementById(idImagen);
        imagen.classList.remove(claseRemover);
        imagen.classList.add(claseAgregar);
    }
};

// Iniciar el juego cuando la página cargue
window.onload = juego.iniciar.bind(juego);
