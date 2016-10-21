//CODIGOS FEITOS POR @CLAWS
var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext("2d");

	var teclas = {};

	var bola = {
		x: canvas.width / 2 - 15,
		y: canvas.height / 2 - 15,
		altura: 30,
		largura: 30,
		dirx: -1,
		diry: 1,
		mod: 0,
		speed: 3
	};

	var esquerda = {
		x: 10,
		y: canvas.height / 2 - 60,
		altura: 120,
		largura: 30,
		score: 0,
		speed: 10
	};
	var direita = {
		x: 560,
		y: canvas.height / 2 - 60,
		altura: 120,
		largura: 30,
		score: 0,
		speed: 10
	};

	document.addEventListener('keydown', function(e){
		teclas[e.keyCode] = true;
	},false);

	document.addEventListener('keyup', function(e){
		delete teclas[e.keyCode];
	},false);

	function moveBlocos(){
		if (87 in teclas && esquerda.y > 0)
			esquerda.y -= esquerda.speed;
		else if (83 in teclas && esquerda.y + esquerda.altura < canvas.height)
			esquerda.y += esquerda.speed;
		if (38 in teclas && direita.y > 0)
			direita.y -= direita.speed;
		else if (40 in teclas && direita.y + direita.altura < canvas.height)
			direita.y += direita.speed;
	}

	function moveBola(){
		if (bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura){
		bola.dirx = 1;
		bola.mod += 0.2;
	 }

	else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x){
		bola.dirx = -1;
		bola.mod += 0.2;
		}

		if (bola.y <= 0)
			bola.diry = 1;
		else if(bola.y + bola.altura >= canvas.height)	 
			bola.diry = -1;

		bola.x += (bola.speed + bola.mod) * bola.dirx;
		bola.y += (bola.speed + bola.mod) * bola.diry;

		if(bola.x < esquerda.x + esquerda.largura - 15)
			newGame("Player 2");
		else if(bola.x + bola.largura > direita.x + 15)
			newGame("Player 1")
	};
	function newGame(winner){	
		if (winner == "Player 1") 
			++esquerda.score;
		else
			++direita.score;

		esquerda.y = canvas.height /2 - esquerda.altura / 2;
		direita.y = esquerda.y;
		bola.y = canvas.height / 2 - bola.altura / 2;
		bola.x = canvas.width / 2 - bola.largura / 2;
		bola.mod = 0;
	};
	// document.addEventListener('pauseGame' function(e){
	// 	teclas
	// }
	function pauseGame(e){
		if(90 in teclas)
		console.log(pauseGame);
	}
	function titleText(){
		ctx.fillStyle = "red";
		ctx.font = "30 px  Courier";
		ctx.fillText("PongMaster by Claws", 200,20);
	}
	function desenha() {
		ctx.clearRect(0,0 ,canvas.width, canvas.height);
		moveBola();
		moveBlocos();
		pauseGame();
		titleText();
		ctx.fillStyle = "white";
		ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
		ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
		ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

		ctx.font = "20px Arial";
		ctx.fillText("Player 1: " + esquerda.score, 50, 20);
		ctx.fillText("Player 2: " + direita.score, canvas.width - 150, 20);
	};
	setInterval(desenha, 20);