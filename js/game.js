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
	bg:"latar.jpg",
	item1:"Strawberry.png",
	jamurIdle:"enemy1Idle.png",
	jamurRun:"enemy1Run.png",
	jamurHit:"enemy1Hit.png",
	bendera:"Flag.png",
}
//file suara yang dipakai dalam game
var suara = {
	backsound:"main.mp3",
	dead:"playerDead.mp3",
	coin:"coin2.wav",
	injek:"injek.wav"
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, halamanCover);

// function startScreen(){	
// 	hapusLayar("#333333");
// 	tampilkanGambar(dataGambar.logo, 600, 250);
// 	var startBtn = tombol(dataGambar.startBtn, 600, 350);
// 	if (tekan(startBtn)){
// 		jalankan(halamanCover);
// 	}
// 	resizeBtn(1150,50);
// }
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
	// memulai musik
	game.hero = setSprite(dataGambar.idle,32,32); // menseting gambar hero atau player
	musik(dataSuara.backsound)
	game.hero.animDiam = dataGambar.idle; //memunculkan hero
	game.hero.animJalan = dataGambar.run;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	game.skalaSprite = 2;	
	setPlatform(this["map_"+game.level], dataGambar.tileset, 32, game.hero);
	game.gameOver = ulangiPermainan;

	// menampilkan item dengan id 1
	setPlatformItem(1, dataGambar.item1)

	// mendefinisikan musuh
	var jamur = {} //mendeklarasikan sebuah objek
	
	// meanmbahkan karakteristik musuh
	jamur.animDiam = dataGambar.jamurIdle
	jamur.animJalan = dataGambar.jamurRun
	jamur.animMati = dataGambar.jamurHit

	// mencetak musuh ke dalam map
	setPlatformEnemy(1, jamur)

	// mencetak bendera
	setPlatformTrigger(1, dataGambar.bendera)
}

// mengulang permainan
function ulangiPermainan(){
	game.aktif = true
	game.score = 0
	setAwal()
	jalankan(gameLoop)

	// memulai musik mati
	setTimeout(()=>{
		game.musik.play()
	}, 1000)
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

	latar(dataGambar.bg, -1, 0);
	buatLevel()
	resizeBtn(1150,50);
	cekItem()
	teks(game.score, 40, 60)
}

// menambahkan point jika player mengenai lawan
function cekItem(){
	if(game.itemID > 0){
		mainkanSuara(dataSuara.coin)
		tambahScore(10)
		game.itemID = 0
	}

	// mengganti level
	if(game.triggerID == 1){
		game.triggerID = 0
		game.aktif = false
		game.level += 1
		jalankan(
			swal.fire({
				title:'SCORE : ' + game.score,
				timer: 3000,
				buttons: false,
				target: '#gameArea',
				showCancelButton: false,
				showConfirmButton: false, 
				className:'modals'
			})
		)
		game.musik.stop()
		setTimeout(ulangiPermainan, 3000)
	}
}