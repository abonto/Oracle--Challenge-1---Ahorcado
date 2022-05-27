window.addEventListener("load",iniciarText,true);

var letras = ['A','B','C','D','E','F','G','H','I','J','K',
                'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var palabra;
var adivinar;
var adivinado = [];
var intentos;
var cont;
var esp;
var palabraNueva;
var palabN;
var palabras = ["FUTURO", "DIMENSION", "CONGELADO", "ARITMETICA", "ASTUTO", "COLOR", "FANTASMA", "SOTANO"];
var palabraActual;
var cantidadJugadas = 0;
var cantidadPerdidas = 0;
var cantidadGanadas = 0;

var intentosOut = document.getElementById('intentos');
var cantidadJugadasOut = document.getElementById('cantidadJugadas');
var cantidadGanadasOut = document.getElementById('cantidadGanadas');
var cantidadPerdidasOut = document.getElementById('cantidadPerdidas');

var boton = function(){
    botones = document.getElementById('boton');
    teclado = document.createElement('ul');

    for (var i = 0; i < letras.length; i++) {
        teclado.id = 'letras';
        list = document.createElement('li');
        list.id = 'teclado';
        list.innerHTML = letras[i];
        verificar();
        botones.appendChild(teclado);
        teclado.appendChild(list);
    }
}

var mensajes = function(){
    intentosOut.innerHTML = "Quedan "+ intentos + " intentos";

    if(intentos < 1){
        alert('Partida terminada, perdiste');
        alert('La palabra buscada era ' + palabra);
        cantidadJugadas += 1;
        cantidadPerdidas += 1;
        localStorage.setItem('cantidadJugadas',cantidadJugadas);
        localStorage.setItem('cantidadPerdidas',cantidadPerdidas);
    }

    for(var i = 0; i < adivinado.length;i++){
        if(cont + esp === adivinado.length){
            alert("Acertaste con " + intentos + " intentos restantes");
            cantidadJugadas += 1;
            cantidadGanadas += 1;
            localStorage.setItem('cantidadJugadas',cantidadJugadas);
            localStorage.setItem('cantidadGanadas',cantidadGanadas);
            break;
        }
    } 
    
    console.log(cantidadGanadas);
 }


var animacion = function(){
    var dibujar = intentos;
    dibujos[dibujar]();
};

var canvas = function(){
    cAhorcado = document.getElementById('ahorcado');
    ct = cAhorcado.getContext('2d');
    ct.beginPath();
    ct.strokeStyke = "#fff";
    ct.lineWidth = 2;
};

var dibujarCabeza = function(){
    cAhorcado = document.getElementById('ahorcado');
    ct = cAhorcado.getContext('2d');
    ct.beginPath();
    ct.arc(190,36,10,0,Math.PI*2,true);
    ct.stroke();
};

var { dibujarPiernaIzquierda, dibujarPiernaDerecha, dibujarBrazoIzquierdo, dibujarBrazoDerecho, dibujarTorso, dibujarMarco3, dibujarMarco2, dibujarMarco1, dibujarMarco } = dibujarAhorcado();

var dibujar = function(desdeX,desdeY,hastaX,hastaY){
    ct.moveTo(desdeX,desdeY);
    ct.lineTo(hastaX,hastaY);
    ct.stroke();
};

dibujos = [dibujarPiernaIzquierda,dibujarPiernaDerecha,dibujarBrazoIzquierdo,dibujarBrazoDerecho,dibujarTorso,dibujarCabeza,dibujarMarco3,dibujarMarco2,dibujarMarco1,dibujarMarco];

var obtenerResultado = function(){
    palabraSecreta = document.getElementById('palabra-secreta');
    correcta = document.createElement('ul');

    for(var i = 0; i < palabra.length;i++){
        correcta.setAttribute('id','palabra-ad');
        adivinar = document.createElement('li');
        adivinar.setAttribute('class','adivinar');

        if(palabra[i] === '-'){
            adivinar.innerHTML = '-';
            esp = 1;
        }else{
            adivinar.innerHTML = '-';
        }
        adivinado.push(adivinar);
        palabraSecreta.appendChild(correcta);
        correcta.appendChild(adivinar);
    }
};

var verificar = function(){
    list.onclick = function(){
        var adiv1 = (this.innerHTML);
        this.setAttribute("class","active");
        this.onclick = null;

        for(var i = 0; i < palabra.length;i++){
            if(palabra[i] == adiv1){
                adivinado[i].innerHTML = adiv1;
                cont += 1;
            }
        }

        var c = palabra.indexOf(adiv1);
        if(c === -1){
            intentos -= 1;
            mensajes();
            animacion();
        }else{
            mensajes();
        }
    }
}


var jugar = function(){
    palabN = ["nuevaPalabra"];

    palabraNueva = localStorage.getItem('NuevaPalabra');

    palabras.push(palabraNueva);
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabra = palabra.replace("-");

    boton();

    console.log(palabra);

    adivinado = [ ];
    intentos = 10;
    cont = 0;
    esp = 0;

    obtenerResultado();
    mensajes();
    canvas();
}

function dibujarAhorcado() {
    var dibujarMarco = function () {
        dibujar(70, 150, 220, 150);
    };

    var dibujarMarco1 = function () {
        dibujar(100, 0, 100, 600);
    };

    var dibujarMarco2 = function () {
        dibujar(60, 5, 190, 5);
    };

    var dibujarMarco3 = function () {
        dibujar(190, 5, 190, 25);
    };

    var dibujarTorso = function () {
        dibujar(190, 45, 190, 100);
    };

    var dibujarBrazoDerecho = function () {
        dibujar(170, 80, 190, 50);
    };

    var dibujarBrazoIzquierdo = function () {
        dibujar(210, 80, 190, 50);
    };

    var dibujarPiernaDerecha = function () {

        dibujar(190, 100, 220, 126);
    };

    var dibujarPiernaIzquierda = function () {
        dibujar(160, 125, 190, 100);
    };
    return { dibujarPiernaIzquierda, dibujarPiernaDerecha, dibujarBrazoIzquierdo, dibujarBrazoDerecho, dibujarTorso, dibujarMarco3, dibujarMarco2, dibujarMarco1, dibujarMarco };
}

function agregarPalabra(){
    document.getElementById('inputP').style.display = 'block';
}

function soloLetras(event){
    k = event.keyCode || event.which;
    tecla = String.fromCharCode(k).toString();
    l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoqprstuvwxyz';
    noPerm = [222,8,188,190,189,186,187,191,221,226,220,110,107,109,106,111,167];
    teclaNoPerm = false;

    for(var i in noPerm){
        if(k == noPerm[i]){
            teclaNoPerm = true;
            break;
        }
    }

    if(l.indexOf(tecla) == '-1' && !teclaNoPerm){
        alert('Solo ingresar letras');
        return false;
    }
}

function soloLetrasP(c){
    var regex = new RegExp("^[a-zA-Z ]+$");
    var k = String.fromCharCode(!c.charCode ? c.which : c.charCode);

    if(regex.test(k)){
        c.preventDefault();
        return false
    }
}

function iniciarText(){
    document.getElementById("texto").addEventListener("keyup",function(){
        this.value = this.value.toUpperCase();
    });
    //localStorage.clear();
}


function agregarPal(){
    var inputPal = document.querySelector("#texto");

    palabraNueva = inputPal.value;

    if(palabraNueva == ""){
        alert("Ingresar una palabra");
    }
    else if(palabraNueva.length > 12){
        alert("Ingresar una palabra de menos de 12 caracteres");
    }else if(palabraNueva.length > palabraNueva.length <= 12){
        localStorage.setItem('NuevaPalabra',palabraNueva);
        inputPal.value = "";
        alert("Palabra agregada");
    }
}

function reiniciarJuego(){
    location.reload();
}

function redireccionar(){
    location.href = "index.html";
}

jugar();