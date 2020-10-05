import 'phaser';
// var spaceField;
// var backgroundV;
// var player;
// var cursors;
// var bulletTime = 0;
// var fireButton;

let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('sky', './assets/sky.png')
    this.load.image('ground', './assets/platform.png')
    this.load.image('diamond', './assets/diamond.png')
    // this.load.spritesheet('woof', './assets/woof.png')
    this.load.spritesheet('woof',
      './assets/woof.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.add.sprite(400, 300, 'sky')

  }

  update() {

  }

};


