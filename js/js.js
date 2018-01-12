//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var terminado = false;



//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

//al cargar por completo la página...

window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
    //Empezar a mover la nave justo después de cargar la página
    start();
}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
    }
    
    
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn();
	document.onkeyup = motorOff();
	
	
	



function moverNave(){
	//cambiar velocidad y posicion
   
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
    document.getElementById("velbar").style.width = v*4+"%";
	altura.innerHTML=(75-y).toFixed(2);
	document.getElementById("hightbar").style.width = (75-y)*0.40+"%";
	//mover hasta que top sea un 70% de la pantalla
	if (y<75){ 
		document.getElementById("ship").style.top = y+"%"; 
	} else { 
        
		terminado = true;
		stop();
		motorOff();
		if (v>5){
			lose();
		}
		else {
			win();
		}
	}
}


//Funciones del motor
function motorOn(){
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}

function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ){
        c = 0;
        motorOff()
    }
	combustible.innerHTML=c.toFixed(2);	
    document.getElementById("oilbar").style.width = c*0.9+"%";
}

function lose(){
	document.getElementById("lose").style.display = "block";
	document.getElementById("nave").src="img/crash.png"
	document.onkeydown = lose;
	document.onkeyup = lose;
	document.onclick = lose;
	stop();
}

function win(){
	document.getElementById("win").style.display = "block";
	document.onkeydown = win;
	document.onkeyup = win;
	document.onclick = win;
	stop();
}

function empieza(){
	start();
  document.onkeydown = motorOn;
  document.onkeyup = motorOff;
  document.onclick = function () {
   	 if (a==g){
    	motorOn();
   	 } else {
    	motorOff();
   	 }
  }
}
function pausa(){

  document.onkeydown = motorOff;
	document.onkeyup = motorOff;
	document.onclick = motorOff;
	stop();
}