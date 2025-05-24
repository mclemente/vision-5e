export class Matcher {
    /** @type {RegExp} */
    #pattern;

    constructor(object) {
        object = Object.fromEntries(Object.entries(object).map(([key, matches]) => [key, Array.from(new Set(
            (Array.isArray(matches) ? matches : [matches])
                .map((m) => (Array.isArray(m) ? m : [m]).map((m) => Array.isArray(m) ? m : [m]))
                .flatMap((m) => m.reduce((a, b) => a.flatMap((c) => b.map((d) => c + d)))),
        )).sort()]).sort((a, b) => a[0].compare(b[0])));

        this.#pattern = new RegExp(`^${Object.entries(object).map(([key, matches]) => `(?<${key}>${matches.map(RegExp.escape).join("|")})`).join("|")}$`, "i");

        const matches = Object.values(object).flat();

        if (matches.length !== new Set(matches).size) {
            throw new Error();
        }
    }

    /**
     * @param {string} string
     * @returns {string | undefined}
     */
    match(string) {
        const match = this.#pattern.exec(string);

        if (!match) {
            return;
        }

        for (const key in match.groups) {
            if (match.groups[key]) {
                return key;
            }
        }
    }
}

export function fromMeters(range, units) {
    switch (units) {
        case "km": return range / 1000;
        default: return range;
    }
}

export function toMeters(range, units) {
    switch (units) {
        case "km": return range * 1000;
        default: return range;
    }
}

export function convertUnits(range, fromUnits, toUnits) {
    return toMeters(fromMeters(range, fromUnits), toUnits);
}
