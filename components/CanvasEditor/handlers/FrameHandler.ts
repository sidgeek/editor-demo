import { fabric } from 'fabric'

import {
  FRAME_BORDER_STROKE_WIDTH,
  FRAME_INIT_HEIGHT,
  FRAME_INIT_WIDTH,
} from '../constants/constants'
import { HandlerOptions } from '../constants/interfaces'
import { FrameOptions } from '../objects'
import BaseHandler from './BaseHandler'

function makeFrameBorder(width: number, height: number) {
  const lineStroke = 'black'
  const x = 0,
    y = 0
  const xEnd = x + width
  const yEnd = y + height

  const lineConfig = {
    stroke: lineStroke,
    type: 'line',
    strokeWidth: FRAME_BORDER_STROKE_WIDTH,
    strokeDashArray: [5, 5],
  }

  const groupConfig = {
    evented: false,
    selectable: false,
    name: 'FrameBorder',
    index: 999,
  }
  const lineXTop = new fabric.Line([x, y, xEnd, y], lineConfig)
  const lineXBottom = new fabric.Line([x, yEnd, xEnd, yEnd], lineConfig)
  const lineYLeft = new fabric.Line([x, y, x, yEnd], lineConfig)
  const lineYRight = new fabric.Line([xEnd, y, xEnd, yEnd], lineConfig)

  const group = new fabric.Group(
    [lineXTop, lineXBottom, lineYLeft, lineYRight],
    groupConfig
  )

  return group
}

class FrameHandler extends BaseHandler {
  frame: fabric.Frame

  constructor(props: HandlerOptions) {
    super(props)

    this.frame = new fabric.Frame({
      width: FRAME_INIT_WIDTH,
      height: FRAME_INIT_HEIGHT,
      id: '',
      name: 'Initial Frame',
      fill: '#ffffff',
      hoverCursor: 'default',
    })
    this.canvas.add(this.frame)
    this.frame.center()
  }

  get = () => {
    return this.canvas
      .getObjects()
      .find((object) => object.type === 'Frame') as fabric.Frame
  }

  getBorder = () => {
    return this.canvas
      .getObjects()
      .find((object) => object.name === 'FrameBorder') as fabric.Object
  }

  updateSize = (newSize: { width: number; height: number }) => {
    const frame = this.get()
    frame.set('width', newSize.width)
    frame.set('height', newSize.height)
    frame.center()
  }

  addFrameBorder = (newSize: { width: number; height: number }) => {
    const frameBorder = makeFrameBorder(newSize.width, newSize.height)
    this.canvas.add(frameBorder)
    frameBorder.center()
  }

  setBackgroundColor = (color: string) => {
    const frame = this.get()
    frame.set('fill', color)
    this.canvas.renderAll()
  }

  // url: string
  setBackgroundImageURL = async () => {
    // to be add
  }

  getBackgroundImage = () => {
    // to be add
  }

  removeBackgroundImage = () => {
    // to be add
  }

  reset = () => {
    // to be add
  }

  setSelectionBorder = () => {
    // to be add
  }

  getOptions = (): FrameOptions => {
    const frame = this.get()
    return frame.toJSON(this.root.propertiesToInclude) as FrameOptions
  }

  getFitRatio = () => {
    const canvasWidth = this.canvas.getWidth() - 32
    const canvasHeight = this.canvas.getHeight() - 32
    const options = this.getOptions()

    let scaleX = canvasWidth / options.width
    const scaleY = canvasHeight / options.height

    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}

export default FrameHandler
