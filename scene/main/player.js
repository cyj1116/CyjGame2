class Player extends CyjImage {
    constructor(game) {
        super(game, 'player', 0.5);
        this.setup()

    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        // this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            let x = this.x + this.w / 2
            let y = this.y
            let b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    debug() {
        this.speed = config.player_speed
    }
}
