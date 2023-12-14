/** A single, 1D keyframe on an FCurve. */
export type CurveKey = {
  timeMs: number
  value: number
}

/** A curve containing linear animation data for a single float property. */
export class Curve {
  keys: CurveKey[]

  constructor(keys: CurveKey[]) {
    this.keys = keys
  }

  sample(at: number): number {
    // Find the two keyframes that surround the desired time, to the left and right
    const leftKeyIndex = this.findLastPrecedingOrOverlapping(at)
    const rightKeyIndex = leftKeyIndex + 1

    // If there's no valid key to the left...
    if (leftKeyIndex < 0) {
      // ...then we're either sampling a time before the first key, in which case we
      // should snap to the first key's value...
      if (rightKeyIndex < this.keys.length) {
        return this.keys[rightKeyIndex].value
      }
      // ...or we're sampling an empty curve and should return a zero value
      return 0
    }

    // Otherwise, we have a key to the left. If there's no valid key to the right, then
    // our left key is the last key in the curve and we're sampling beyond the curve's
    // duration, in whcih case we should snap to that final value
    if (rightKeyIndex >= this.keys.length) {
      return this.keys[leftKeyIndex].value
    }
    
    // Otherwise, we have both a valid left and right key, and we're sampling between
    // them: interpolate from the left value to the right value based on our sample time
    const left = this.keys[leftKeyIndex]
    const right = this.keys[rightKeyIndex]
    const t = (at - left.timeMs) / (right.timeMs - left.timeMs)
    return left.value + (right.value - left.value) * t
  }

  private findLastPrecedingOrOverlapping(at: number): number {
    let lastKeyIndexLte = -1
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i].timeMs <= at) {
        lastKeyIndexLte = i
      } else {
        break
      }
    }
    return lastKeyIndexLte
  }
}
