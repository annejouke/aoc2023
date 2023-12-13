
export const trim = (s: string) => s.trim()

export function games(data: string): [number, number, number, number] {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (const game of data.split(';').map(trim)) {
        for (const colorPair of game.split(',').map(trim)) {
            const [countRaw, color] = colorPair.split(' ');

            const count = parseInt(countRaw);

            if (color === 'red') {
                maxRed = count >= maxRed ? count : maxRed;
            }

            if (color === 'green') {
                maxGreen = count >= maxGreen ? count : maxGreen;
            }

            if (color === 'blue') {
                maxBlue = count >= maxBlue ? count : maxBlue;
            }
        }
    }

    const power = maxRed * maxGreen * maxBlue;

    return [maxRed, maxGreen, maxBlue, power];
}

export function digest(data: string) {
    return data.split('\n').reduce((record: Record<number, [number, number, number, number]>, line) => {
        const [idTag, rest] = line.split(':');

        const [,id] = idTag.split(' ');

        record[parseInt(id)] = games(rest);

        return record;
    }, {})
}

export function logic(data: string): void {
    const record = digest(data);

    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;

    let idSum = 0;
    let powerSum = 0;

    for (const [key, [red, green, blue, power]] of Object.entries(record)) {
        if (red <= maxRed && green <= maxGreen && blue <= maxBlue) {
            idSum += parseInt(key);
        }
    
        powerSum += power;
    }

    console.log({ idSum, powerSum })
}
