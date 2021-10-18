const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const start = document.querySelector('.start');


let isJumping = false;
let isGameOver = false;
let position = 250;
let round = 0;
let control = 3;
let speed = 5;
let pontos = 0;
let cactusPosition = 1200;

function iniciar(){
  document.querySelector('.background').style.display =  'block';
  document.querySelector('.start').style.display =  'none';
  dino.style.bottom = '25px';  
  pontos = 0;
  cactusPosition = 1200;
  jumpInicial()
}

function jumpInicial(){
  
  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 40) {
          clearInterval(downInterval);
          isJumping = false;
          
        } else {
          position -= 60;
          dino.style.bottom = position + 'px';
        }
      }, 70);
    } else {
      // Subindo
      
      position += 60;
      dino.style.bottom = position + 'px';
      
    }

    
    
  }, 100);
}


function handleKeyDown(event) {
  
    if (event.keyCode === 32) {
        round += 1
       if (!isJumping) {
         jump();
        }
    }
}

document.body.addEventListener('touchstart', function() {
  jump();
});

function jump() {
    isJumping = true;
    console.log(round)
    
    let upInterval = setInterval(() => {
      if (position >= 150) {
        // Descendo
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (position <= 40) {
            clearInterval(downInterval);
            isJumping = false;
            
          } else {
            position -= 60;
            dino.style.bottom = position + 'px';
          }
        }, 70);
      } else {
        // Subindo
        
        position += 60;
        dino.style.bottom = position + 'px';
        
      }

      
      
    }, 70);
    
}

function createCactus() {
    const cactus = document.createElement('div');
    cactusPosition = 1200;
    let randomTime = Math.random() * 6000;

    
    
    if (isGameOver) return;

    
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftTimer = setInterval(() => {

       if(pontos > 1500){
        document.querySelector('.cactus').style.backgroundImage = "url('./images/turtle.png')";
        document.querySelector('.cactus').style.width = '90px';        
      }
      
      if(pontos > 3000){
        document.querySelector('.cactus').style.backgroundImage = "url('./images/goomba.png')";

        document.querySelector('.cactus').style.width = '150px';
        document.querySelector('.cactus').style.height = '150px';
      } 
    
      if (cactusPosition < -140) {
        // Saiu da tela
        clearInterval(leftTimer);
        background.removeChild(cactus);        
      }  else if (cactusPosition > 0 && cactusPosition < 130 && position < 60) {
        // Game over
        clearInterval(leftTimer);
        isGameOver = true;       
        document.body.innerHTML = `<div class="game-over"><h2>${pontos}  </h2><h3> Pontos</h3></div> <button class='restart' onclick=reload()>  Reiniciar </button>`; 
        document.querySelector('.reload').style.display = 'flex';
      }   else { 
        cactusPosition -= speed;
        cactus.style.left = cactusPosition + 'px';        
        pontos += 2;

        if(round === control) {
            if (speed > 5){
                speed += 2
                control += 3
            }
        }
      }
      
      
    }, speed);
  
    setTimeout(createCactus, randomTime);
}

function reload() {
  location.reload()
}

createCactus()
document.addEventListener('keydown', handleKeyDown);