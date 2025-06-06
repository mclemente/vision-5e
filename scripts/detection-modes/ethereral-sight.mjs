import { DETECTION_LEVELS } from "../const.mjs";
import DetectionModeT20 from "./base.mjs";

/**
 * The detection mode for Ethereal Sight.
 */
export default class DetectionModeEtherealSight extends DetectionModeT20 {
    constructor() {
        super({
            id: "etherealSight",
            label: "VISION5E.EtherealSight",
            type: DetectionModeT20.DETECTION_TYPES.OTHER,
            walls: false,
            angle: false,
            sort: 1,
        });
    }

    /** @override */
    static getDetectionFilter() {
        return this._detectionFilter ??= CONFIG.Canvas.detectionModes.seeInvisibility.constructor.getDetectionFilter();
    }

    /** @override */
    _canDetect(visionSource, target) {
        // Only ethereal tokens can be detected
        return !visionSource.object.document.hasStatusEffect(CONFIG.specialStatusEffects.DEFEATED)
            && target instanceof foundry.canvas.placeables.Token
            && target.document.hasStatusEffect(CONFIG.specialStatusEffects.ETHEREAL);
    }

    /** @override */
    _testPoint(visionSource, mode, target, test) {
        if (!super._testPoint(visionSource, mode, target, test)) {
            return false;
        }

        const visionSources = canvas.effects.visionSources;

        canvas.effects.visionSources = new foundry.utils.Collection();
        canvas.effects.visionSources.set(visionSource.sourceId, visionSource);

        const detectionModes = visionSource.object.document.detectionModes;
        const detectionLevel = target._detectionLevel;

        target._detectionLevel = DETECTION_LEVELS.NONE;

        visionSource.object.document.detectionModes = detectionModes.filter(
            ({ id }) => {
                const mode = CONFIG.Canvas.detectionModes[id];

                return mode && mode !== this && mode.type === DetectionModeT20.DETECTION_TYPES.SIGHT && !mode.imprecise;
            },
        );

        target.document.actor.statuses.delete(CONFIG.specialStatusEffects.ETHEREAL);

        // Test whether this vision source sees the target without the ethereal status effect
        const result = canvas.visibility.testVisibility(test.point, { tolerance: 0, object: target });

        target.document.actor.statuses.add(CONFIG.specialStatusEffects.ETHEREAL);
        target._detectionLevel = detectionLevel;
        visionSource.object.document.detectionModes = detectionModes;
        canvas.effects.visionSources = visionSources;

        return result;
    }
}
