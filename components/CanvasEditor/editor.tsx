import './objects'

import { fabric } from 'fabric'
import { useContext, useEffect, useRef } from 'react'

import { FabricCanvas } from './constants/interfaces'
import { EditorContext } from './context'
import Handlers from './handlers'

function Editor() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const context = useContext(EditorContext)
  const { setHandlers } = context

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const { clientHeight, clientWidth } = container

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#f6f7f9',
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true,
    }) as FabricCanvas
    const handlers = new Handlers({
      canvas: canvas,
      context: context,
    })
    setHandlers(handlers)
    context.setCanvas(canvas)

    const resizeObserver = new ResizeObserver((entries) => {
      const { width = clientWidth, height = clientHeight } =
        (entries[0] && entries[0].contentRect) || {}
      console.log('>>> cc:', width, height)
      handlers.canvasHandler.resize(width, height)
    })
    resizeObserver.observe(container)
    return () => {
      handlers.destroy()
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useAddTemplateDataToCanvas()
  // useGuidelinesHandler()
  // useCanvasZoomAndDrag()
  return (
    <div
      ref={containerRef}
      style={{ flex: 1, position: 'relative', height: '100%' }}
    >
      <div style={{ position: 'absolute' }}>
        <canvas id="canvas" style={{ border: '1px solid red' }}></canvas>
      </div>
    </div>
  )
}

export default Editor
