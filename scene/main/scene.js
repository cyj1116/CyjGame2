const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
}

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

class Enemy extends CyjImage {
    constructor(game) {
        let type = randomBetween(0, 4)
        let name = 'enemy' + type
        super(game, name);
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Cloud extends CyjImage {
    constructor(game) {
        super(game, 'cloud');
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}

class Scene extends CyjScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setUpInputs()
    }
    setup() {
        this.numberOfEnemies = 10
        this.bg = CyjImage.new(this.game, 'sky')
        this.cloud = Cloud.new(this.game, 'cloud')

        this.player = Player.new(this.game, 'player')
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)

        this.addElement(this.player)
        //
        this.addEnemies()
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            log('loop')
            const e = Enemy.new(this.game, 'enemy');
            es.push(e)
            this.addElement(e)
        }
        log(es, 'es')
        this.enemies = es
    }
    setUpInputs() {
        let g = this.game
        let s = this
        g.registerAction('a', () => {
            s.player.moveLeft()
        })
        g.registerAction('d', () => {
            s.player.moveRight()
        })
        g.registerAction('w', () => {
            s.player.moveUp()
        })
        g.registerAction('s', () => {
            s.player.moveDown()
        })
        g.registerAction('j', () => {
            s.player.fire()
        })
    }

    update() {
        super.update()
        // this.cloud.y += 1
    }
}
