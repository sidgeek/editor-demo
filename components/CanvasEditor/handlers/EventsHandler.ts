import { fabric } from 'fabric'

import { HandlerOptions } from '../constants/interfaces'
import BaseHandler from './BaseHandler'

class EventsHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
    this.initialize()
  }

  initialize() {
    this.canvas.wrapperEl.tabIndex = 1
    this.canvas.wrapperEl.style.outline = 'none'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.canvas.on({
      'mouse:out': this.onMouseOut,
    })
  }

  destroy() {
    this.canvas.off({
      'mouse:wheel': this.onMouseWheel,
      'mouse:out': this.onMouseOut,
    })
  }

  onMouseOut = () => {
    this.canvas.renderAll()
  }

  onMouseWheel = (event: any) => {
    const isCtrlKey = event.e.ctrlKey
    if (isCtrlKey) {
      this.handleZoom(event)
    } else {
      this.handlePan(event)
    }
  }

  handlePan = (event: any) => {
    const delta = event.e.deltaY
    // const isShiftKey = event.e.shiftKey
    const pointX = 0
    const pointY = delta > 0 ? -30 : 30

    // if (isShiftKey) {
    //   pointY = 0
    //   pointX = delta > 0 ? -30 : 30
    // }
    const point = new fabric.Point(pointX, pointY)
    this.canvas.relativePan(point)
  }

  handleZoom = (event: any) => {
    const delta = event.e.deltaY
    let zoomRatio = this.canvas.getZoom()
    if (delta > 0) {
      zoomRatio -= 0.02
    } else {
      zoomRatio += 0.02
    }
    this.root.zoomHandler.zoomToPoint(
      new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2),
      zoomRatio
    )
    event.e.preventDefault()
    event.e.stopPropagation()
  }
}

export default EventsHandler
