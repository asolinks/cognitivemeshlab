'use client'
import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number; vx: number; vy: number
  connections: number[]; pulsePhase: number
}

export default function MeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const count = Math.min(60, Math.floor((W * H) / 18000))
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
      }))
    }

    const COLORS = {
      node: [90, 110, 245],
      nodeTeal: [20, 184, 166],
      nodeAmber: [245, 158, 11],
      edge: [90, 110, 245],
    }

    let t = 0
    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)

      // Update positions
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        n.x = Math.max(0, Math.min(W, n.x))
        n.y = Math.max(0, Math.min(H, n.y))
      })

      // Draw edges
      const MAX_DIST = 180
      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35
            const pulse = Math.sin(t * 2 + a.pulsePhase) * 0.15 + 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${COLORS.edge.join(',')}, ${alpha + pulse})`
            ctx.lineWidth = 0.8
            ctx.stroke()

            // Data packet travelling along edge
            if (Math.random() < 0.001) {
              const progress = (t * 0.5) % 1
              const px = a.x + (b.x - a.x) * progress
              const py = a.y + (b.y - a.y) * progress
              ctx.beginPath()
              ctx.arc(px, py, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(${COLORS.nodeTeal.join(',')}, 0.9)`
              ctx.fill()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach((n, i) => {
        const pulse = Math.sin(t + n.pulsePhase) * 0.5 + 0.5
        const r = 2.5 + pulse * 1.5

        // Pick color variation
        const color = i % 7 === 0
          ? COLORS.nodeTeal
          : i % 11 === 0
            ? COLORS.nodeAmber
            : COLORS.node

        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4)
        grad.addColorStop(0, `rgba(${color.join(',')}, 0.4)`)
        grad.addColorStop(1, `rgba(${color.join(',')}, 0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color.join(',')}, ${0.7 + pulse * 0.3})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="mesh-canvas" aria-hidden="true" />
}
