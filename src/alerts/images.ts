import { type ImageAnimation, ImageAnimationCurves, buildImageAnimationCurves } from './animation'

export const IMAGE_ANIMATIONS: ImageAnimation[] = [
  {
    // Pan left across bottom half of image
    durationMs: 2000,
    scale: [1.5],
    offset: [{x: 0.43, y: 0.38}, {x: 0.57, y: 0.38}],
    opacity: [1.0],
    background: [0.0, 0.9, 0.7],
    fadeInDurationMs: 100,
    fadeOutDurationMs: 100,
  },
  {
    // Zoom out from center of image
    durationMs: 3000,
    scale: [1.6666, 1.3333],
    offset: [{x: 0.5, y: 0.5}],
    opacity: [1.0],
    background: [0.7, 0.9],
    fadeInDurationMs: 200,
    fadeOutDurationMs: 100,
  },
  /*
  {
    // Quick hold on still image, bottom half
    durationMs: 500,
    scale: [1.0],
    offset: [{x: 0.5, y: 0.45}],
    opacity: [1.0],
    background: [1.0],
    fadeInDurationMs: 0,
    fadeOutDurationMs: 0,
  },
  */
  {
    // Pan right across top half of image
    durationMs: 2000,
    scale: [1.5],
    offset: [{x: 0.57, y: 0.62}, {x: 0.43, y: 0.62}],
    opacity: [1.0],
    background: [0.9, 0.7],
    fadeInDurationMs: 100,
    fadeOutDurationMs: 100,
  },
  {
    // Pan upward from bottom of image, zoomed in slightly
    durationMs: 1500,
    scale: [1.2, 1.3333],
    offset: [{x: 0.5, y: 0.4}, {x: 0.5, y: 0.6}],
    opacity: [1.0],
    background: [0.7, 0.9],
    fadeInDurationMs: 200,
    fadeOutDurationMs: 200,
  },
  {
    // Hold on full image, centered and pillarboxed
    durationMs: 5000,
    scale: [0.75],
    offset: [{x: 0.5, y: 0.5}],
    opacity: [1.0],
    background: [0.9, 0.97, 0.9, 0.0],
    fadeInDurationMs: 0,
    fadeOutDurationMs: 400,
  },
]

export const IMAGE_ANIMATION_CURVES: ImageAnimationCurves[] = IMAGE_ANIMATIONS.map(buildImageAnimationCurves)

// How long to hold on the onscreen alert text before we start showing images
export const INTRO_DURATION_MS = 2000

// How long each image is held onscreen before we switch to the next image
export const IMAGE_DURATION_MS = IMAGE_ANIMATIONS.reduce((acc, x) => acc + x.durationMs, 0)

// How long to hold on the outro alert text after images are finished
export const OUTRO_DURATION_MS = 1500

/**
 * Returns the total duration for which a GeneratedImagesToast should be rendered, given
 * some basic information about the alert.
 */
export function getImageAlertDuration(numImages: number): number {
  return INTRO_DURATION_MS + (IMAGE_DURATION_MS * numImages) + OUTRO_DURATION_MS
}
