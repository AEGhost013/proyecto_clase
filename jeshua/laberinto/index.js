class Casa {
    constructor(xi, yi, xf, yf, mp) {
        this.xi = xi
        this.yi = yi
        this.xf = xf
        this.yf = yf
        this.puerta = this.xi + (parseInt((this.xf - this.xi) / 2))

        this.mapa = mp
    }
}

class Pared {
    constructor(xi, yi, xf, yf) {
        this.xi = xi
        this.yi = yi
        this.xf = xf
        this.yf = yf
    }
}

class Npc {
    constructor(x, y, msg = "Hola mundo") {
        this.msg = msg
        this.x = x
        this.y = y
    }

    __str__() {
        return "test"
    }
}

class Mapa {
    constructor(main, x, y, npcs = [], walls = [], casas = []) {

        this.mapa = []
        this.mapa = this.crearMapa([x, y])
        console.log(this.mapa)

        this.npcs = npcs
        this.walls = walls
        this.casas = casas

        this.anadirNpcs()
        this.anadirParedes()
        this.anadirCasa()

        this.show = main

        this.cx = 0
        this.cy = 0
        if (main) {
            this.mostrarMapa()
        }

    }

    crearMapa([x, y]) {
        let mapaTemporal = []
        let row;
        for (let i = 0; i <= y; i++) {
            row = []
            for (let j = 0; j < x; j++) {
                row.push(0)
            }
            mapaTemporal.push(row)
        }
        mapaTemporal[0][0] = "P";
        return mapaTemporal
    }

    anadirNpcs() {
        for (let e of this.npcs) {
            this.mapa[e.y][e.x] = 'N'
        }
    }

    anadirParedes() {
        for (let pared of this.walls) {
            this.mapa[pared.yi][pared.xi] = 1
            this.mapa[pared.yf][pared.xf] = 1
            if (pared.xi == pared.xf) {
                if (pared.yi < pared.yf) {
                    for (let y = pared.yi; y <= pared.yf; y++) {
                        this.mapa[y][pared.xf] = 1
                    }
                } else {
                    for (let y = pared.yi; y >= pared.yf; y--) {
                        this.mapa[y][pared.xf] = 1
                    }
                }
            } if (pared.yi == pared.yf) {
                if (pared.xi < pared.xf) {
                    for (let x = pared.xi; x <= pared.xf; x++) {
                        this.mapa[pared.yf][x] = 1
                    }
                } else {
                    for (let x = pared.xi; x >= pared.xf; x--) {
                        this.mapa[pared.yf][x] = 1
                    }
                }
            }
        }
    }

    anadirCasa() {
        for (let casa of this.casas) {
            console.log(casa)
            for (let y = casa.yi; y <= casa.yf; y++) {
                console.log("..");

                for (let x = casa.xi; x <= casa.xf; x++) {
                    console.log("...");

                    this.mapa[y][x] = 3
                }

            }
            let mitad_casa = casa.puerta
            this.mapa[casa.yf][mitad_casa] = 4
        }
        //creamos la puerta en la mitad del eje x abajo

    }

    mostrarMapa() {
        this.map2html()
    }

    colision(dir) {
        if (dir == "up") {
            return this.mapa[this.cy - 1][this.cx] != 0
        }
        if (dir == "left") {
            return this.mapa[this.cy][this.cx - 1] != 0
        }
        if (dir == "right") {
            return this.mapa[this.cy][this.cx + 1] != 0
        }
        if (dir == "down") {
            return this.mapa[this.cy + 1][this.cx] != 0
        }
    }

    colisionNPC(dir) {
        if (dir == "up") {
            return this.mapa[this.cy - 1][this.cx] == "N"
        }
        if (dir == "left") {
            return this.mapa[this.cy][this.cx - 1] == "N"
        }
        if (dir == "right") {
            return this.mapa[this.cy][this.cx + 1] == "N"
        }
        if (dir == "down") {
            return this.mapa[this.cy + 1][this.cx] == "N"
        }
    }

    colisionCasas(dir) {
        if (dir == "up") {
            return this.mapa[this.cy - 1][this.cx] == 4
        }
        if (dir == "left") {
            return this.mapa[this.cy][this.cx - 1] == 4
        }
        if (dir == "right") {
            return this.mapa[this.cy][this.cx + 1] == 4
        }
        if (dir == "down") {
            return this.mapa[this.cy + 1][this.cx] == 4
        }
    }


    mover(direccion) {
        //colision Para los npc
        if (this.show == true) {
            if (direccion == "right" && this.colisionNPC("right")) {
                this.npcs.forEach(element => {
                    if (element.x == this.cx + 1 && element.y == this.cy) {
                        alert(element.msg)
                    }
                });

            }
            if (direccion == "left" && this.colisionNPC("left")) {
                this.npcs.forEach(element => {
                    if (element.x == this.cx - 1 && element.y == this.cy) {
                        alert(element.msg)
                    }
                })
            }
            if (direccion == "up" && this.colisionNPC("up")) {

                this.npcs.forEach(element => {
                    if (element.x == this.cx && element.y == this.cy - 1) {
                        alert(element.msg)
                    }
                })
            }
            if (direccion == "down" && this.colisionNPC("down")) {

                this.npcs.forEach(element => {
                    if (element.x == this.cx && element.y == this.cy + 1) {
                        alert(element.msg)
                    }
                })
            }

            //colisiones para las casas
            if (direccion == "up" && this.colisionCasas("up")) {
                this.casas.forEach(element => {
                    if (element.puerta == this.cx && element.yf == this.cy - 1) {
                        this.show = false
                        element.mapa.show = true
                        element.mapa.mover("down")
                    }
                })
            }

            //movimiento

            if (direccion == "right" && this.cx < this.mapa[0].length && !this.colision("right")) {
                this.mapa[this.cy][this.cx] = 0
                this.mapa[this.cy][this.cx + 1] = "P"
                this.cx += 1
            }
            if (direccion == "left" && this.cx > 0 && !this.colision("left")) {
                this.mapa[this.cy][this.cx] = 0
                this.mapa[this.cy][this.cx - 1] = "P"
                this.cx -= 1
            }
            if (direccion == "up" && this.cy > 0 && !this.colision("up")) {
                this.mapa[this.cy][this.cx] = 0
                this.mapa[this.cy - 1][this.cx] = "P"
                this.cy -= 1
            }
            if (direccion == "down" && this.cy != this.mapa.length && !this.colision("down")) {
                this.mapa[this.cy][this.cx] = 0
                this.mapa[this.cy + 1][this.cx] = "P"
                this.cy += 1
            }



            this.mostrarMapa()
        }
    }


    map2html() {
        let tablero = document.getElementById("table")

        tablero.removeChild(document.getElementById("tb"))

        let table = document.createElement("table")
        table.id = "tb"
        let tr;
        // hacemos un bucle :)
        for (let i = 0; i < this.mapa.length; i++) {
            tr = document.createElement("tr")

            for (let el of this.mapa[i]) {
                let defaultStyles = tr.style


                let casilla = document.createElement("td")

                casilla.textContent = el

                casilla.style.background = this.colorearCeldas(el)

                tr.appendChild(casilla)

                tr.style = defaultStyles
            }
            table.appendChild(tr)
        }
        tablero.appendChild(table)
    }

    colorearCeldas(el) {
        if (el == 1) {
            return "gray"
        } else if (el == 0) {
            return "green"
        } else if (el == "N") {
            return "yellow"
        } else if (el == "P") {
            return "blue"
        } else if (el == 3) {
            return "coral"
        }
    }
}

function verificarMapaActivo(mapas) {
    for (e of mapas) {
        if (e.show == true) {
            return e
        }
    }
}

window.onload = () => {

    var casa1 = new Mapa(false, 10, 10)
    var mapa = new Mapa(true, 20, 20,
        [
            new Npc(3, 3, "Hola player"),
            new Npc(2, 2, "I'm fallin down")
        ],
        [
            new Pared(11, 11, 11, 0),
            new Pared(7, 2, 5, 2),
        ],
        [
            new Casa(9, 9, 11, 11, casa1),
        ]
    )
    document.onkeydown = (e) => {
        e.key == "ArrowDown" ? verificarMapaActivo([mapa, casa1]).mover("down") : null
        e.key == "ArrowUp" ? verificarMapaActivo([mapa, casa1]).mover("up") : null
        e.key == "ArrowLeft" ? verificarMapaActivo([mapa, casa1]).mover("left") : null
        e.key == "ArrowRight" ? verificarMapaActivo([mapa, casa1]).mover("right") : null

    }
}