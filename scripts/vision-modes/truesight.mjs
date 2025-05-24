/**
 * The vision mode for Truesight.
 */
export default class VisionModeTruesight extends foundry.canvas.perception.VisionMode {
    constructor() {
        super({
            id: "truesight",
            label: "T20.SenseTruesight",
            vision: {
                darkness: { adaptive: false },
                defaults: { contrast: 0, saturation: 0, brightness: 1 },
            },
        });
    }
}
