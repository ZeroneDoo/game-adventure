setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"logo.png",
	startBtn:"tombolStart.png",
	cover:"cover.jpg",
	playBtn:"btn-play.png",
	maxBtn:"maxBtn.png",
	minBtn:"minBtn.png",
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall: "Fall.png",
	hit:"Hit.png",
	tileset:"Terrain.png",
	bg:"Gray.png"

}
//file suara yang dipakai dalam game
var suara = {
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen(){	
	hapusLayar("#333333");
	tampilkanGambar(dataGambar.logo, 600, 250);
	var startBtn = tombol(dataGambar.startBtn, 600, 350);
	if (tekan(startBtn)){
		jalankan(halamanCover);
	}
	resizeBtn(1150,50);
}
function halamanCover(){
	hapusLayar("#333333");
	gambarFull(dataGambar.cover);
	var playBtn = tombol(dataGambar.playBtn, 600, 300);
	if (tekan(playBtn)){
		setAwal();
		jalankan(gameLoop);
	}	
	resizeBtn(1150,50);
}

function setAwal(){
	game.hero = setSprite(dataGambar.idle,32,32);
	game.hero.animDiam = dataGambar.idle;
	game.hero.animJalan = dataGambar.run;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	game.skalaSprite = 2;	
	setPlatform(map_1, dataGambar.tileset, 32, game.hero);
	game.gameOver = ulangiPermainan;

}

// mengulang permainan
function ulangiPermainan(){
	game.aktif = true
	setAwal()
	jalankan(gameLoop)
}

function gameLoop(){
	hapusLayar();	
	if(game.kanan){
		gerakLevel(game.hero, 3, 0)
	}else if(game.kiri){
		gerakLevel(game.hero, -3, 0)
	}
	if(game.atas){
		gerakLevel(game.hero, 0, -10)
	}

	// latar(dataGambar.bg, 0, 0.5);
	buatLevel()
	resizeBtn(1150,50);
}