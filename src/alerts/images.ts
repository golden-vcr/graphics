// How long each image is held onscreen before we switch to the next image
export const IMAGE_DURATION_MS = 500

// Duration at the tail end of that time, during which the image reverses direction;
// i.e. (IMAGE_DURATION_MS - IMAGE_DURATION_TAIL_MS) is how long it will take the image
// to scroll completely across the screen from top to bottom (or bottom to top)
export const IMAGE_DURATION_TAIL_MS = 100

/**
 * Returns the total duration for which a GeneratedImagesToast should be rendered, given
 * some basic information about the alert.
 */
export function getImageAlertDuration(numImages: number): number {
  return IMAGE_DURATION_MS * numImages
}

export function computeImageProgress(elapsed: number): number {
  // Start with a sine wave that goes from 0 to 1 over one second, then scale it
  // horizontally so that its value hits 1 at the peak of our image's duration
  const elapsedSeconds = elapsed / 1000.0
  const peakTimeSeconds = (IMAGE_DURATION_MS - IMAGE_DURATION_TAIL_MS) / 1000.0
  const sineValue = Math.sin((0.5 * Math.PI * elapsedSeconds) / peakTimeSeconds)

  // Clamp values so our progress value is always [0..1], even if sampled at a time
  // that's beyond the expected image duration
  return Math.abs(sineValue)
}
