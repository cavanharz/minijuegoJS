var divisor, dividendo, cociente;
var flagDivisor;
var countx=0;
var county=0;
var flagIzq="false";
var flagDer="false";
var flagUp="false";
var flagDwn="false";
var topResp;
var bottomResp;
var flagEnd="false";
var flag;
var arrivo;
var scorePlayer=5;
var scoreLucy=5;
var cuentaGeneraciones = 0;
var contadorLucy;
/*
document.addEventListener("keypress", function(e) {
var keynum;
  if(window.event) { // IE
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera
    keynum = e.which;
  };

  if(String.fromCharCode(keynum)=="a"){
    countx--;
    var flagIzq="true";
    var flagDer="false";
    var flagUp="false";
    var flagDwn="false";
  }
  else if(String.fromCharCode(keynum)=="d"){
    countx++;
    var flagIzq="false";
    var flagDer="true";
    var flagUp="false";
    var flagDwn="false";
  }
  else if(String.fromCharCode(keynum)=="w"){
    county--;
    var flagIzq="false";
    var flagDer="false";
    var flagUp="true";
    var flagDwn="false";
  }
  else if(String.fromCharCode(keynum)=="s"){
    county++;
    var flagIzq="false";
    var flagDer="false";
    var flagUp="false";
    var flagDwn="true";
  }else{};
  //alert(count);
  var cx = (0.5*countx)+'vw';
  var cy = (0.5*county)+'vw';

  var montaC = document.getElementById("mc");
  var rotacion;
  if(flagIzq=="true"){rotacion = "0deg";}
  else if(flagDer=="true"){rotacion = "180deg";}
  else if(flagUp=="true"){rotacion = "90deg";}
  else if(flagDwn=="true"){rotacion= "270deg";}
  montaC.style.transform = "translateX("+cx+") translateY("+cy+") rotate("+rotacion+")";
})
*/

function intro() {
  var letAn = document.getElementById("letreroAnimado");
  setTimeout(function(){
    letAn.innerHTML="Gana quien llegue <br> a 10 puntos.";
    letAn.style.display="block";
    setTimeout(function(){
      letAn.innerHTML="O pierde quien <br> se quede sin puntos.";
      setTimeout(function(){
        letAn.innerHTML="Primero, vamos a practicar...";
        setTimeout(function(){
          letAn.style.display="none";
          document.getElementById("btnEmpezar").style.display="block";
        },3000);
      },3000);
    },3000);
  },1000);


}

function checkKey(e) {
    e = e || window.event;

    var montaC = document.getElementById("p1");
    var p1 = montaC.getBoundingClientRect();
    var luc = document.getElementById("lucy");
    var lucy = luc.getBoundingClientRect();
    var fond = document.getElementById("fondo");
    var fondo = fond.getBoundingClientRect();
    var g1 = document.getElementById("G1").getBoundingClientRect();

    if (e.keyCode == '38') {
        //alert("up");// up arrow
        if( p1.top-fondo.top >=0 && g1.left-p1.right>=0){
        county--;
        var flagIzq="false";
        var flagDer="false";
        var flagUp="true";
        var flagDwn="false";
      }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if( fondo.bottom-p1.bottom >=0 && g1.left-p1.right>=0 ){
          county++;
          var flagIzq="false";
          var flagDer="false";
          var flagUp="false";
          var flagDwn="true";
        };
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(p1.left-fondo.left>=0){
         countx--;
         var flagIzq="true";
         var flagDer="false";
         var flagUp="false";
         var flagDwn="false";
       }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(g1.left-p1.right+(3/5)*(p1.right-p1.left)>=0 && g1.left-lucy.right+(3/5)*(lucy.right-lucy.left)>=0){
         countx++;
         var flagIzq="false";
         var flagDer="true";
         var flagUp="false";
         var flagDwn="false";
       }
     else if( g1.left-p1.right+(3/5)*(p1.right-p1.left)<=0  ){
       arrivo = "p1";
       if(p1.top>topResp && p1.bottom<bottomResp){flag="exito";}
       else{flag="fracaso";};
       flagEnd="true";
     }
  //   else{

//     };
    };

    if(flagEnd=="false"){
      if(fondo.top-p1.bottom>0){county++};
      if(p1.top-fondo.bottom>0){county--};
      var cx = (1*countx)+'vw';
      var cy = (10*county)+'vh';
      var rotacion;
      if(flagIzq=="true"){rotacion = "180deg";}
      else if(flagDer=="true"){rotacion = "0deg";}
      else if(flagUp=="true"){rotacion = "270deg";}
      else if(flagDwn=="true"){rotacion= "90deg";};
      montaC.style.transform = "translateX("+cx+") translateY("+cy+") rotate("+rotacion+")";
    }
    else{
       countx=0;
       county=0;
       //montaC.style.transform = "translateX(0vw) translateY(0vh) rotate(0deg)";
      flagEnd="false";
      document.onkeydown="false";

      setTimeout(function(){
        activRetroaalimentacion(flag);
      },1000);
    };
}

function activRetroaalimentacion(flag){
  var G1dim=G1.getBoundingClientRect();
  var G2 = document.getElementById("G2");
  var G2dim=G2.getBoundingClientRect();
  var G3 = document.getElementById("G3");
  var G3dim = G3.getBoundingClientRect();
  var G4 = document.getElementById("G4");
  var G4dim = G4.getBoundingClientRect();
  var letAn = document.getElementById("letreroAnimado");

  if(arrivo=="p1"){
    var ganon = document.getElementById("p1").getBoundingClientRect();
  }
  else{
    var ganon = document.getElementById("lucy").getBoundingClientRect();
  };
      if(ganon.top>G1dim.top && ganon.bottom<G1dim.bottom){

        if(flagDivisor==1){
          var divisorCopia = divisor-1;
          letAn.innerHTML= divisorCopia + " Palet";
          letAn.style.backgroundColor="red";
        }
        else{
          var divisorCopia = divisor;
          letAn.innerHTML= divisorCopia + " Palets";
          letAn.style.backgroundColor="green";
        }
        letAn.style.display="block";
        G1.style.backgroundColor="white";
        for (var i=1; i<=divisorCopia; i++){
          var palet = "G1paletC" + i;
          document.getElementById(palet).classList.add("parpadeo");
        };
        setTimeout(function(){
          var cajasNum=0;
          for (var i=1; i<=divisorCopia; i++){
            var palet = "G1paletC" + i;
            document.getElementById(palet).classList.remove("parpadeo");
            var cajas = $("#" + palet).find('.caja');
            cajas.addClass("parpadeo");
            cajasNum = cajasNum + cajas.length;
          };
          letAn.innerHTML= cajasNum + " Cajas";
          if(flag=="exito"){ letAn.style.backgroundColor="green";}
          else{ letAn.style.backgroundColor="red";};
          setTimeout(function(){
            //console.log(document.getElementsByClassName("parpadeo").length);
            $(".caja").remove();
            document.getElementById("G1").style.backgroundColor="transparent";
          },2500)
        },2500);

      }

      else if(ganon.top>G2dim.top && ganon.bottom<G2dim.bottom){
        console.log("llegué a G2");

        if(flagDivisor==2){
          var divisorCopia = divisor-1;
          letAn.innerHTML= divisorCopia + " Palet";
          letAn.style.backgroundColor="red";
        }
        else{
          var divisorCopia = divisor;
          letAn.innerHTML= divisorCopia + " Palets";
          letAn.style.backgroundColor="green";
        }
        letAn.style.display="block";
        G2.style.backgroundColor="white";

        for (var i=1; i<=divisorCopia; i++){
          var palet = "G2paletC" + i;
          console.log(palet);
          document.getElementById(palet).classList.add("parpadeo");
        };
        setTimeout(function(){
          var cajasNum=0;
          for (var i=1; i<=divisorCopia; i++){
            var palet = "G2paletC" + i;
            document.getElementById(palet).classList.remove("parpadeo");
            var cajas = $("#" + palet).find('.caja');
            cajas.addClass("parpadeo");
            cajasNum = cajasNum + cajas.length;
          };
          letAn.innerHTML= cajasNum + " Cajas";
          if(flag=="exito"){ letAn.style.backgroundColor="green";}
          else{ letAn.style.backgroundColor="red";};
          setTimeout(function(){
            //console.log(document.getElementsByClassName("parpadeo").length);
            $(".caja").remove();
            document.getElementById("G2").style.backgroundColor="transparent";
          },2500)
        },2500);

      }
      else if(ganon.top>G3dim.top && ganon.bottom<G3dim.bottom){
        console.log("llegué a G3");
        if(flagDivisor==3){
          var divisorCopia = divisor-1;
          letAn.innerHTML= divisorCopia + " Palet";
          letAn.style.backgroundColor="red";
        }
        else{
          var divisorCopia = divisor;
          letAn.innerHTML= divisorCopia + " Palets";
          letAn.style.backgroundColor="green";
        }
        letAn.style.display="block";
        G3.style.backgroundColor="white";
        for (var i=1; i<=divisorCopia; i++){
          var palet = "G3paletC" + i;
          console.log(palet);
          document.getElementById(palet).classList.add("parpadeo");
        };
        setTimeout(function(){
          var cajasNum=0;
          for (var i=1; i<=divisorCopia; i++){
            var palet = "G3paletC" + i;
            document.getElementById(palet).classList.remove("parpadeo");
            var cajas = $("#" + palet).find('.caja');
            cajas.addClass("parpadeo");
            cajasNum = cajasNum + cajas.length;
          };
          letAn.innerHTML= cajasNum + " Cajas";
          if(flag=="exito"){ letAn.style.backgroundColor="green";}
          else{ letAn.style.backgroundColor="red";};
          setTimeout(function(){
            //console.log(document.getElementsByClassName("parpadeo").length);
            $(".caja").remove();
            document.getElementById("G3").style.backgroundColor="transparent";
          },2500)
        },2500);
      }
      else {
        console.log("llegué a G4");

        if(flagDivisor==4){
          var divisorCopia = divisor-1;
          letAn.innerHTML= divisorCopia + " Palet";
          letAn.style.backgroundColor="red";
        }
        else{
          var divisorCopia = divisor;
          letAn.innerHTML= divisorCopia + " Palets";
          letAn.style.backgroundColor="green";
        }
        letAn.style.display="block";
        G4.style.backgroundColor="white";
        for (var i=1; i<=divisorCopia; i++){
          var palet = "G4paletC" + i;
          console.log(palet);
          document.getElementById(palet).classList.add("parpadeo");
        };
        setTimeout(function(){
          var cajasNum=0;
          for (var i=1; i<=divisorCopia; i++){
            var palet = "G4paletC" + i;
            document.getElementById(palet).classList.remove("parpadeo");
            var cajas = $("#" + palet).find('.caja');
            cajas.addClass("parpadeo");
            cajasNum = cajasNum + cajas.length;
          };
          letAn.innerHTML= cajasNum + " Cajas";
          if(flag=="exito"){ letAn.style.backgroundColor="green";}
          else{ letAn.style.backgroundColor="red";};
          setTimeout(function(){
            //console.log(document.getElementsByClassName("parpadeo").length);
            $(".caja").remove();
            document.getElementById("G4").style.backgroundColor="transparent";
          },2500)
        },2500);

      };

puntuacion(flag);
}

function puntuacion(flag){
  document.onkeydown="false";
  if(cuentaGeneraciones>1){
    if(flag=="exito"){
      if(arrivo =="p1"){
        scorePlayer=10;
      }else{
        scoreLucy++;

      };
    }else{
      if(arrivo == "p1"){
        scorePlayer--;
      }else{
        scoreLucy--;
      };
    };
  };


  var flagMeta="false";
  if(scorePlayer==10){flagMeta="true";}
  else if(scorePlayer==0 || scoreLucy==10){flagMeta="lucy";};

  setTimeout(function(){
    activAnim(flag,flagMeta);
  },5000);
}

function activAnim(flag,flagMeta){
  var letAn = document.getElementById("letreroAnimado");
  var btnEm = document.getElementById("btnEmpezar");
  letAn.style.zIndex = "20";
  if(cuentaGeneraciones==1){
    if(flag=="exito"){
      letAn.style.backgroundColor = "green";
      var text = "¡Bien Hecho!";
    }
    else{
      letAn.style.backgroundColor="red";
       var text = "Sigue intentando. <br> Tu puedes.";
    };
    letAn.innerHTML = text;
  }
  else{
    if(flag=="exito"){
      letAn.style.backgroundColor = "green";
      var text = "+1";
    }
    else{
      letAn.style.backgroundColor="red";
       var text = "-1";
     };
    if(arrivo=="p1"){   letAn.innerHTML = text;}
    else{letAn.innerHTML = "Lucy " + text;};
  }

  letAn.style.display="block";
  document.getElementById("scorePlayer").innerHTML=scorePlayer;
  document.getElementById("scoreLucy").innerHTML=scoreLucy;

  setTimeout(function(){
    var letAn = document.getElementById("letreroAnimado");
    letAn.style.backgroundColor="#1f618d";

    if(flagMeta=="false"){

      letAn.style.display="none";
      letAn.innerHTML="3";

      btnEm.style.display="block";
      document.getElementById("lucy").style.transform="none";
      document.getElementById("p1").style.transform="none";
      //$('.caja').remove();
      $('.palet').css("opacity", 0);
      document.getElementById("division").innerHTML="";
    }
    else  if(flagMeta=="true"){
        meta();
      }
    else if(flagMeta=="lucy"){
      var letAn = document.getElementById("letreroAnimado");
      letAn.innerHTML = "¡Lucy ha ascendido!";
      setTimeout(function(){
        var letAn = document.getElementById("letreroAnimado");
        letAn.innerHTML="3";
        letAn.style.display="none";
        var btnEm = document.getElementById("btnEmpezar");
        var imgbtnEm = document.getElementById("imgbtnEmpezar");
        imgbtnEm.src = "imagenes/btnReintentar2.png";
        btnEm.style.display="block";
        scorePlayer=5;
        scoreLucy=5;
        cuentaGeneraciones=1;
        document.getElementById("scorePlayer").innerHTML=scorePlayer;
        document.getElementById("scoreLucy").innerHTML=scoreLucy;
        document.getElementById("lucy").style.transform="none";
        document.getElementById("p1").style.transform="none";
      },1000);

    };

  },2000);
}

function meta(){
  var contador=0;
  var audioFade = setInterval(function(){
    contador++;
    var audio = document.getElementById("aud");
    audio.volume= (1-0.01*contador);
    //console.log(1-0.02*contador);
    if(contador>=100){
      clearInterval(audioFade);
      audio.src="sonidos/happyending.mp3"
      audio.volume=1;
      audio.loop=false;
      audio.play();
    };
  },5);
  document.getElementById("letreroAnimado").innerHTML = "¡Lo has conseguido!";
  setTimeout(function(){
    document.getElementById("letreroAnimado").innerHTML = "¡Nivel 1 completado!";
    setTimeout(function(){
      var letAn = document.getElementById("letreroAnimado");
      letAn.style.display="none";
      document.getElementById("fondo").style.opacity=0;
      document.getElementById("tablero").style.opacity=0;

      var op1 = document.createElement("img");
      op1.src="imagenes/op1(2).png";
      op1.classList.add("op1");
      document.body.appendChild(op1);
      op1.style.opacity="1";
      var op1text = document.createElement("p");
      op1text.innerHTML="Almacenista";
      op1text.classList.add("op1text");
      document.body.appendChild(op1text);
      op1text.style.opacity="1";

      var op2 = document.createElement("img");
      op2.src="imagenes/op2.png";
      op2.classList.add("op2");
      document.body.appendChild(op2);
      op2.setAttribute("id", "op2");
      op2.style.opacity="0.2";
      var op2text = document.createElement("p");
      op2text.innerHTML="Montacargas";
      op2text.classList.add("op2text");
      document.body.appendChild(op2text);
      op2text.setAttribute("id", "op2text");
      op2text.style.opacity="0.2";


      var op3 = document.createElement("img");
      op3.src="imagenes/op3.png";
      op3.classList.add("op3");
      document.body.appendChild(op3);
      op3.style.opacity="0.2";
      var op3text = document.createElement("p");
      op3text.innerHTML="Chofer";
      op3text.classList.add("op3text");
      document.body.appendChild(op3text);
      op3text.style.opacity="0.2";

      setTimeout(function(){
        var audio = document.getElementById("aud");
        audio.pause();
        audio.currentTime = 0;
        audio.volume=1;
        audio.src="sonidos/epicEnding.mp3";
        audio.play();
        setTimeout(function(){
          document.getElementById("medallacontainer").classList.add("medallaAnim");
        },500);
        setTimeout(function(){
          var medalla = document.getElementById("medallacontainer");
          medalla.style.width="4vw";
          medalla.style.top="8%";
          medalla.style.left="95%";
          setTimeout(function(){
            document.getElementById("op2").style.opacity="1";
            document.getElementById("op2text").style.opacity="1";
            document.getElementById("op2").classList.add("parpadeo2");

            var LvlUpText = document.createElement("p");
            LvlUpText.innerHTML="Ascendido a <br> Operador Nivel 2: <br> Montacargas";
            LvlUpText.classList.add("LvlUpText");
            document.body.appendChild(LvlUpText);
            LvlUpText.style.opacity="1";

            var levelup = document.createElement("img");
            levelup.src="imagenes/fondoLevelUp.png";
            levelup.classList.add("fondoLevelUp");
            document.body.appendChild(levelup);
          },1200);
        },2500);
      },2500);
    },2500);
  },1250);

}

function empezar(){
  var imgbtnEm = document.getElementById("imgbtnEmpezar");
  imgbtnEm.src = "imagenes/btnEmpezar.png";
  var btnEm = document.getElementById("btnEmpezar");
  btnEm.style.display="none";
  var letAn = document.getElementById("letreroAnimado");

  if(cuentaGeneraciones==0){
    tutorial();
  }
  else{
    letAn.style.display="block";
    letAn.style.backgroundColor = "transparent";
    letAn.style.borderStyle = "none";
    letAn.style.color = "red";
    letAn.style.fontSize = "16vh";

    letAn.innerHTML=3;
    var count=3;

    var counter=setInterval(function(){
      count=count-1;
      letAn.innerHTML= count;
      if (count <= 0){
         clearInterval(counter);
         letAn.style.display="none";
         letAn.classList.remove("ahora");
         letAn.style.backgroundColor = "transparent";
         letAn.style.borderStyle = "solid";
         letAn.style.color = "white";
         letAn.style.fontSize = "10vh";
         if(cuentaGeneraciones>0){ lucy();};
         generadordivisionesexactas();
         document.onkeydown = checkKey;
      };
    }, 1000);
  };

  if(cuentaGeneraciones==1){
    var audio = document.getElementById("aud");
    audio.play();
    audio.loop=true;
  };

}

function tutorial(){
  var letAn = document.getElementById("letreroAnimado");
  letAn.innerHTML="Punto de práctica";
  letAn.style.display="block";

  setTimeout(function(){
      letAn.innerHTML="Usa las flechas del teclado <br> para ir a un compartimento.";
      var G1 = document.getElementById("G1");
      var G2 = document.getElementById("G2");
      var G3 = document.getElementById("G3");
      var G4 = document.getElementById("G4");
      G1.style.backgroundColor="white";
      G2.style.backgroundColor="white";
      G3.style.backgroundColor="white";
      G4.style.backgroundColor="white";
      G1.classList.add("parpadeo2");
      G2.classList.add("parpadeo2");
      G3.classList.add("parpadeo2");
      G4.classList.add("parpadeo2");

      setTimeout(function(){
        var G1 = document.getElementById("G1");
        var G2 = document.getElementById("G2");
        var G3 = document.getElementById("G3");
        var G4 = document.getElementById("G4");
        G1.style.backgroundColor="transparent";
        G2.style.backgroundColor="transparent";
        G3.style.backgroundColor="transparent";
        G4.style.backgroundColor="transparent";
        G1.classList.remove("parpadeo2");
        G2.classList.remove("parpadeo2");
        G3.classList.remove("parpadeo2");
        G4.classList.remove("parpadeo2");

        letAn.innerHTML="Encuentra uno con las cajas agrupadas <br> como indica el tablero.";
        var division = document.getElementById("division");
        division.classList.add("parpadeo2");
        setTimeout(function(){
          var division = document.getElementById("division");
          division.classList.remove("parpadeo2");
        }, 5000);
      }, 5000);
  },1000);

  setTimeout(function(){
    letAn.style.display="block";
    letAn.style.backgroundColor = "transparent";
    letAn.style.borderStyle = "none";
    letAn.style.color = "red";
    letAn.style.fontSize = "16vh";


    letAn.innerHTML=3;
    var count=3;
    var counter=setInterval(function(){
      count=count-1;
      letAn.innerHTML= count;
      if(count==1){
        setTimeout(function(){
          letAn.innerHTML="¡Ahora!";
          letAn.classList.add("ahora");
        },300);

      }
      else if (count <= 0){
         clearInterval(counter);
         letAn.style.display="none";
         letAn.classList.remove("ahora");
         letAn.style.backgroundColor = "transparent";
         letAn.style.borderStyle = "solid";
         letAn.style.color = "white";
         letAn.style.fontSize = "10vh";
         if(cuentaGeneraciones>0){ lucy();};
         generadordivisionesexactas();
         document.onkeydown = checkKey;
      };
    }, 1000);
  },11000);

}

function lucy(){

  if(cuentaGeneraciones<4){contadorLucy=0}
  else if(cuentaGeneraciones<7){contadorLucy=1}
  else{contadorLucy=2};

  var vel = [75, 130, 90];
  var aleatVel =  Math.floor(Math.random() * 40)-20;
  var velocidad = vel[contadorLucy]+aleatVel;
  var efectiv = [70,64,80];
  var aleatEf =  Math.floor(Math.random() * 100);
  if(aleatEf<=efectiv[contadorLucy]){flagEfLucy="true"}
  else{flagEfLucy="false"};
  //console.log(flagEfLucy);

  var pasosInef = Math.floor(Math.random() * 6)-2;

  var lucystepsX=0;
  var lucystepsY=0;
  var luc = document.getElementById("lucy");
  var montaC = document.getElementById("p1");
  var fond = document.getElementById("fondo");
  var c=0;
  var rotacion=0;
  var correlucycorre = setInterval(function(){
    var lucy = luc.getBoundingClientRect();
    var p1 = montaC.getBoundingClientRect();
    var fondo = fond.getBoundingClientRect();
    var g1 = document.getElementById("G1").getBoundingClientRect();

    if( g1.left-p1.right+(3/5)*(p1.right-p1.left)>=0 && g1.left-lucy.right+(3/5)*(lucy.right-lucy.left)>=0 ){
      if(flagEfLucy=="true"){
        if(lucy.right<fondo.left+3*(fondo.right-fondo.left)/4){lucystepsX++;}
        else if(lucy.bottom>bottomResp){lucystepsY--;}
        else if(lucy.top<topResp){lucystepsY++;}
        else{lucystepsX++;};
      }
      else{
        if(lucy.right<fondo.left+3*(fondo.right-fondo.left)/4){lucystepsX++;}
        else if(c<pasosInef){lucystepsY--; c++}
        else{lucystepsX++;};
      };


      var cx = (1*lucystepsX)+'vw';
      var cy = (10*lucystepsY)+'vh';
      luc.style.transform = "translateX("+cx+") translateY("+cy+") ";
      //console.log(g1.left-lucy.right);
    }
    else{
      clearInterval(correlucycorre);
      if(g1.left-lucy.right+(3/5)*(lucy.right-lucy.left)<0){
        arrivo = "lucy";
        if(lucy.top>topResp && lucy.bottom<bottomResp)
         {flag="exito";}
        else{flag="fracaso";};
        activRetroaalimentacion(flag);
        countx=0;
        county=0;
        //console.log(arrivo);
        //console.log(flag);
      };
    };
  }, velocidad);
  //console.log(velocidad);


}

function generadordivisionesexactas(){
cuentaGeneraciones++;
if ( cuentaGeneraciones<4){
   divisor =  Math.floor(Math.random() * 2)+2;
   cociente =  Math.floor(Math.random() * 2)+1;
}
else{
   divisor =  Math.floor(Math.random() * 2)+2;
   cociente =  Math.floor(Math.random() * 2)+2;
}

  dividendo = divisor*cociente;
  var divisorC, cocienteC, dividendoC;
//console.log("d="+divisor+" c="+cociente+ " cajas="+divisor*cociente);
document.getElementById("division").innerHTML =  dividendo + "&#247;" + divisor;

const grupos = Array.from({length: 4}, (_, index) => index + 1);
shuffleArray(grupos);
//console.log(grupos);
for(var n=0;n<4;n++){
  if(n==0){
    var g = "G" + grupos[n];
    var Gdim = document.getElementById(g).getBoundingClientRect();
    topResp = Gdim.top;
    bottomResp = Gdim.bottom;
    //console.log(topResp);

    divisorC = divisor;
    cocienteC = cociente;
    dividendoC = dividendo;
  }
  else if(n==1){
    divisorC = divisor;
    cocienteC = cociente-1;
    dividendoC = dividendo;
    //alert(cocienteC);
  }
  else if(n==2){
    divisorC = divisor-1;
    flagDivisor=grupos[n];
    cocienteC = cociente;
    dividendoC = dividendo;
  }

  for(var i=0; i<divisorC; i++){
    if(n==3 && i==0){
      divisorC = divisor;
      cocienteC = cociente-1;
      dividendoC = dividendo;
    }
    else if(n==3 && i==1){
      divisorC = divisor;
      cocienteC = cociente;
      dividendoC = dividendo;
    };

   var cajaCont = "cajaContainer"+(i+1)+"G"+grupos[n];
   //console.log(cajaCont);
   var palet = "G"+grupos[n]+"palet"+(i+1);
   document.getElementById(palet).style.opacity=1;
   //alert(cajaCont);
   for(var j=0;j<cocienteC; j++){
     var caja = document.createElement("img");
     caja.src="imagenes/caja.png";
     caja.classList.add("caja");
     document.getElementById(cajaCont).appendChild(caja);
   };
  };
}




}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
