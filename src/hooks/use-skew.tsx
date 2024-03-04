// salute to github.com
import React, { useEffect } from 'react'

interface AnimationState {
  skewX: number
  skewY: number
}
function goTowardsValue(current: number, to: number, speed: number) {
  return Math.round((current + (to - current) * speed) * 1000) / 1000
}
const skewSpeed = 0.15
const snapThreshold = 0.005
const perspective = 700
export default function useSkew(ref: React.RefObject<HTMLDivElement>, enable = true) {
  useEffect(() => {
    const divElm = ref.current as any
    if (!enable) {
      return
    }
    if (!divElm) {
      return
    }
    const currentState: AnimationState = {
      skewX: 0,
      skewY: 0,
    }
    const animationTargets: AnimationState = {
      skewX: 0,
      skewY: 0,
    }
    let isAnimating = false
    let shouldAnimate = false
    let rect: DOMRect
    function animateTowardsTarget() {
      // Create a slight delay by going *towards* the target, rather than snapping to it
      currentState.skewX = goTowardsValue(currentState.skewX, animationTargets.skewX, skewSpeed)
      currentState.skewY = goTowardsValue(currentState.skewY, animationTargets.skewY, skewSpeed)

      // Stop if we're really close to all targets
      if (
        Math.abs(animationTargets.skewX - currentState.skewX) < snapThreshold &&
        Math.abs(animationTargets.skewY - currentState.skewY) < snapThreshold &&
        shouldAnimate === false
      ) {
        currentState.skewX = animationTargets.skewX
        currentState.skewY = animationTargets.skewY
        divElm.style.setProperty(
          'transform',
          `perspective(${perspective}px) rotateX(${
            Math.round(currentState.skewX * 100) / 100
          }deg) rotateY(${Math.round(currentState.skewY * 100) / 100}deg)`
        )
        isAnimating = false
        return
      }

      divElm.style.setProperty(
        'transform',
        `perspective(${perspective}px) rotateX(${
          Math.round(currentState.skewX * 100) / 100
        }deg) rotateY(${Math.round(currentState.skewY * 100) / 100}deg)`
      )

      window.requestAnimationFrame(animateTowardsTarget)
    }
    function mousemove(e: MouseEvent) {
      if (shouldAnimate === false) {
        rect = divElm.getBoundingClientRect()
      }

      shouldAnimate = true
      // Calculate mouse position relative to the card
      animationTargets.skewY = -((e.clientX - rect.left - rect.width / 2) / rect.width) * 3
      animationTargets.skewX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 2

      if (isAnimating === false) {
        isAnimating = true
        shouldAnimate = true
        window.requestAnimationFrame(animateTowardsTarget)
      }
    }
    function mouseleave() {
      animationTargets.skewX = 0
      animationTargets.skewY = 0
      shouldAnimate = false
    }

    divElm.addEventListener('mousemove', mousemove)
    divElm.addEventListener('mouseleave', mouseleave)
    return () => {
      divElm.removeEventListener('mousemove', mousemove)
      divElm.removeEventListener('mouseleave', mouseleave)
    }
  }, [ref.current, enable])
}
