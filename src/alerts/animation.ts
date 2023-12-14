import { type CurveKey, Curve } from './curves'

/**
 * 2D position representing the position of an image within the frame, normalized to the
 * range [0..1], with the position at {x: 0.5, y: 0.5} representing an image that's
 * anchored in the center of the frame.
 */
export type Offset = {
  x: number
  y: number
}

/**
 * Properties that describe the display state of an image at a fixed point in time.
 */
export type ImageProperties = {
  scale: number
  offset: Offset
  opacity: number
  background: number
}

/**
 * Description of an animation that can be applied to an image, in a human-editable
 * format that describes the desired property values and their changes over time.
 */
export type ImageAnimation = {
  durationMs: number
  scale: number[]
  offset: Offset[]
  opacity: number[]
  background: number[]
  fadeInDurationMs: number
  fadeOutDurationMs: number
}

/**
 * Curves built from an ImageAnimation, allowing final ImageProperties values to be
 * efficiently sampled at arbitrary points in time.
 */
export class ImageAnimationCurves {
  scale: Curve
  offsetX: Curve
  offsetY: Curve
  opacity: Curve
  background: Curve

  constructor(scale: Curve, offsetX: Curve, offsetY: Curve, opacity: Curve, background: Curve) {
    this.scale = scale
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.opacity = opacity
    this.background = background
  }

  sample(at: number): ImageProperties {
    return {
      scale: this.scale.sample(at),
      offset: {
        x: this.offsetX.sample(at),
        y: this.offsetY.sample(at),
      },
      opacity: this.opacity.sample(at),
      background: this.background.sample(at),
    }
  }
}

export function buildImageAnimationCurves(anim: ImageAnimation): ImageAnimationCurves {
  const scale = buildScalarCurve(anim.durationMs, anim.scale)
  const [offsetX, offsetY] = buildOffsetCurve(anim.durationMs, anim.offset)
  const opacity = buildOpacityCurve(anim.durationMs, anim.opacity, anim.fadeInDurationMs, anim.fadeOutDurationMs)
  const background = buildScalarCurve(anim.durationMs, anim.background)
  return new ImageAnimationCurves(scale, offsetX, offsetY, opacity, background)
}

function buildScalarCurve(durationMs: number, values: number[]): Curve {
  const keys = [] as CurveKey[]
  const times = getKeyTimes(durationMs, values.length)
  for (let i = 0; i < times.length; i++) {
    keys.push({
      timeMs: times[i],
      value: values[i],
    })
  }
  return new Curve(keys)
}

function buildOffsetCurve(durationMs: number, values: Offset[]): [Curve, Curve] {
  const xValues = values.map((x) => x.x)
  const yValues = values.map((x) => x.y)
  return [buildScalarCurve(durationMs, xValues), buildScalarCurve(durationMs, yValues)]
}

function buildOpacityCurve(durationMs: number, values: number[], fadeInDurationMs: number, fadeOutDurationMs: number): Curve {
  const innerDuration = durationMs - (fadeInDurationMs + fadeOutDurationMs)
  if (innerDuration < 1) {
    throw new Error(`assertion failed: innerDuration >= 1 (${innerDuration} >= 1)`)
  }
  const innerKeyTimes = getKeyTimes(innerDuration, values.length).map((x) => x + fadeInDurationMs)
  const keys = [] as CurveKey[]
  if (fadeInDurationMs > 0) {
    keys.push({
      timeMs: 0,
      value: 0,
    })
  }
  for (let i = 0; i < innerKeyTimes.length; i++) {
    keys.push({
      timeMs: innerKeyTimes[i],
      value: values[i],
    })
  }
  if (fadeOutDurationMs > 0) {
    if (values.length === 1) {
      keys.push({
        timeMs: durationMs - fadeOutDurationMs,
        value: values[0],
      })
    }
    keys.push({
      timeMs: durationMs,
      value: 0,
    })
  }
  return new Curve(keys)
}

function getKeyTimes(durationMs: number, numKeys: number): number[] {  
  const times = [0] as number[]
  const interval = durationMs / Math.max(1, numKeys - 1)
  for (let i = 1; i < numKeys - 1; i++) {
    const prev = times[times.length - 1]
    times.push(prev + interval)
  }
  if (numKeys > 1) {
    times.push(durationMs)
  }
  if (times.length !== numKeys) {
    throw new Error(`assertion failed: times.length === numKeys (${times.length} === ${numKeys})`)
  }
  return times
}
