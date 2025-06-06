import { DETECTION_LEVELS } from "../const.mjs";
import DetectionModeT20 from "./base.mjs";

/**
 * The detection mode for See Invisibility.
 */
export default class DetectionModeSeeInvisibility extends DetectionModeT20 {
    constructor() {
        super({
            id: "seeInvisibility",
            label: "VISION5E.SeeInvisibility",
            type: DetectionModeT20.DETECTION_TYPES.OTHER,
            walls: false,
            angle: false,
        });
    }

    /** @override */
    static getDetectionFilter() {
        return this._detectionFilter ??= foundry.canvas.rendering.filters.GlowOverlayFilter.create({
            glowColor: [0, 0.60, 0.33, 1],
        });
    }

    /** @override */
    _canDetect(visionSource, target) {
        // Only invisible and ethereal tokens can be detected
        return !visionSource.object.document.hasStatusEffect(CONFIG.specialStatusEffects.DEFEATED)
            && target instanceof foundry.canvas.placeables.Token && (target.document.hasStatusEffect(CONFIG.specialStatusEffects.INVISIBLE)
                || target.document.hasStatusEffect(CONFIG.specialStatusEffects.ETHEREAL));
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

        const wasInvisible = target.document.actor.statuses.delete(CONFIG.specialStatusEffects.INVISIBLE);
        const wasEthereal = target.document.actor.statuses.delete(CONFIG.specialStatusEffects.ETHEREAL);

        // Test whether this vision source sees the target without the invisible and ethereal status effect
        const result = canvas.visibility.testVisibility(test.point, { tolerance: 0, object: target });

        if (wasInvisible) {
            target.document.actor.statuses.add(CONFIG.specialStatusEffects.INVISIBLE);
        }

        if (wasEthereal) {
            target.document.actor.statuses.add(CONFIG.specialStatusEffects.ETHEREAL);
        }

        target._detectionLevel = detectionLevel;
        visionSource.object.document.detectionModes = detectionModes;
        canvas.effects.visionSources = visionSources;

        return result;
    }
}
