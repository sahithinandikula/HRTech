import { useEffect, useRef, useState } from 'react'

function ThreeDBackground() {
  const canvasRef = useRef(null)
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // 2. Check hardware capability (CPU cores). If less than 4 cores, flag as low performance.
    const cores = navigator.hardwareConcurrency || 4
    const lowPerf = prefersReducedMotion || cores < 4
    
    setIsLowPerformance(lowPerf)
    if (lowPerf) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = []
    const maxParticles = Math.min(60, Math.floor((width * height) / 20000)) // Scaled density
    const mouse = { x: null, y: null, radius: 150 }

    // Particle constructor helper
    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.radius = Math.random() * 2.5 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Wrap around boundaries
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(37, 99, 235, 0.4)' // Soft blue brand color
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)

      // Draw lines and update particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.update()
        p1.draw()

        // Interact with mouse (subtle magnetic pull)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x
          const dy = mouse.y - p1.y
          const dist = Math.hypot(dx, dy)
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            p1.x -= dx * force * 0.03
            p1.y -= dy * force * 0.03
          }
        }

        // Connect near particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)

          if (dist < 100) {
            const alpha = (100 - dist) / 100 * 0.15
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})` // Soft purple connection line
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Event listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    // Start loop
    animate()

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (isLowPerformance) {
    return null // Render nothing to keep system performance perfect on weaker systems
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
      className="animate-fade-in"
    />
  )
}

export default ThreeDBackground
