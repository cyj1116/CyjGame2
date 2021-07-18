class CyjScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        const i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            this.game.drawImage(e)
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i];
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            e.update()
        }
    }
}

