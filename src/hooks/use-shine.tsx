import React, { useEffect } from 'react'
export default function useShine(ref: React.RefObject<HTMLDivElement>, enable = true) {
  useEffect(() => {
    const div = ref.current as any
    if (!div) {
      return
    }
    if (!enable) {
      return
    }
    const lastMousePos = {
      clientX: 0,
      clientY: 0,
    }
    let needsAnimate = false
    function animateToTarget() {
      const rect = div.getBoundingClientRect()
      const y = lastMousePos.clientY - rect.top
      const x = lastMousePos.clientX - rect.left
      div.style.setProperty('--mouse-x', `${x}px`)
      div.style.setProperty('--mouse-y', `${y}px`)
      needsAnimate = false
    }
    function handler(e) {
      lastMousePos.clientX = e.clientX
      lastMousePos.clientY = e.clientY
      if (!needsAnimate) {
        window.requestAnimationFrame(animateToTarget)
      }
      needsAnimate = true
    }
    div.addEventListener('mousemove', handler)
    return () => {
      div.removeEventListener('mousemove', handler)
    }
  }, [ref.current, enable])
}
