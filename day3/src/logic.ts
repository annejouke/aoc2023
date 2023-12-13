import { NUMBERS } from "./constant";

class Part {
    tiles: Tile[] = [];

    bindTile(tile: Tile) {
        tile.part = this;
        this.tiles.push(tile);
    }

    value() {
        return this.tiles.map(tile => tile.char).join('');
    }
}

class Tile {
    char: string;
    part?: Part;
    map: Tile[][];
    x!: number;
    y!: number;

    constructor(char: string, x: number, y: number, map: Tile[][]) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.map = map;

        map[x][y] = this;
    }

    isNumber() {
        return NUMBERS.includes(this.char)
    }

    isSymbol() {
        return this.char !== '.' && !NUMBERS.includes(this.char)
    }

    isValidNumberPart() {
        if (!this.isNumber()) {
            return false;
        }

        const neighbors = this.neighborsOf();

        for (const neighbor of neighbors) {
            const [x, y] = neighbor;

            if (this.map[x] && this.map[x][y] && this.map[x][y].isSymbol()) {
                return true;
            }
        }

        return false;
    }

    neighborsOf() {
        return [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
        ];
    }
}

export function logic(data: string): void {
    const list: Tile[]  = []
    const map: Tile[][] = [];

    let x = 0;
    let y = 0;
    let currentPart: Part | undefined;

    for (const line of data.split('\n')) {
        y = 0;

        for (const char of line) {

            if (!map[x]) {
                map[x] = [];
            }

            const newTile = new Tile(char, x, y, map);

            list.push(newTile);

            if (newTile.isNumber()) {
                if (!currentPart) {
                    currentPart = new Part();
                }

                currentPart.bindTile(newTile);
            } else {
                currentPart = undefined;
            }

            y++;
        }

        currentPart = undefined;

        x++;
    }

    const validNumberParts = list
        .filter(tile => tile.isValidNumberPart())
        .reduce((list, tile) => {
            if (tile.part && !list.includes(tile.part)) {
                console.log(tile.part.value());
                list.push(tile.part);
            }

            return list;
        }, new Array<Part>())
        .map(p => parseInt(p.value()))
        .reduce((sum, value) => sum + value, 0);


    console.log({ validNumberParts })
}
