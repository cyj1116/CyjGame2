class Bullet extends CyjImage {
    constructor(game) {
        super(game, 'bullet');
        this.setup()
    }
    setup() {
        this.speed = 15
        // this.speed = config.bullet_speed
    }
    update() {
        this.y -= this.speed
    }
    debug() {
        this.speed = config.bullet_speed
    }
}