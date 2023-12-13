import { COMPOUNDS, NUMBERS, NUMBER_WORDS } from "./constant";
import { data } from "./data";

const test: Record<number, number> = {
    1: 18,
    2: 87,
    3: 58,
    4: 96,
    16: 58,
    54: 77,
    80: 86,
}

console.log(run(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`))

function run(rawData: string) {
    let cleanData = rawData;

    for (const [key, value] of Object.entries(COMPOUNDS)) {
        cleanData = cleanData.replaceAll(key, value);
    }

    for (const [key, value] of Object.entries(NUMBER_WORDS)) {
        cleanData = cleanData.replaceAll(key, value);
    }

    let sum = 0;

    for (let line of cleanData.split('\n')) {
        if (!line) {
            continue;
        }

        let first = line.split('').find(c => NUMBERS.includes(c)) ?? '';
        let last = line.split('').reverse().find(c => NUMBERS.includes(c)) ?? '';

        if (!first) {
            console.log({ line, first })
        }

        if (!last) {
            console.log({ line, last })
        }

        const joined = parseInt(first + last);

        sum += joined;
    }

    return sum;
}
 
function main() {
    return run(data);
}

console.log(main());
