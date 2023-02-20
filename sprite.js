class Sprite {
    constructor({sprite, position, scale = 1, frameTotal = 1, frameWidth, frameHeight, velocity}) {
        this.image = new Image();
        this.image.src = sprite
        this.position = position
        this.frameTotal = frameTotal
        this.scale = scale
        this.width = (this.image.width / frameTotal) * this.scale
        this.height = this.image.height * this.scale
        this.x = 0
        this.y = 0
        this.dx = frameWidth
        this.dy = frameHeight
        this.velocity = velocity
        // this.frameCurrent = 0;
    }

    draw() {
        ctx.drawImage(  //image, sx,sy, swidth, sheight, dx, dy, dwidth, dheight)
            this.image,
            0,
            0,
            this.image.width / this.frameTotal,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.frameTotal)* this.scale,
            this.image.height * this.scale
        )

    }

    update() {
        this.draw()
        if (this.frameCurrent < this.frameTotal - 1) {
            this.frameCurrent++
        } else {
            this.frameCurrent = 0
        }
    }
}