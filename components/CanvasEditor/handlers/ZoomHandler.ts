import { fabric } from 'fabric'

import {
  CANVAS_ZOOM_MAX_VALUE,
  CANVAS_ZOOM_MIN_VALUE,
} from '../constants/constants'
import BaseHandler from './BaseHandler'

class ZoomHandler extends BaseHandler {
  zoomIn() {
    let zoomRatio = this.canvas.getZoom()
    zoomRatio += 0.05
    const center = this.canvas.getCenter()
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio)
    this.context.setZoomRatio(zoomRatio)
  }

  zoomOut() {
    let zoomRatio = this.canvas.getZoom()
    zoomRatio -= 0.05
    const center = this.canvas.getCenter()
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio)
    this.context.setZoomRatio(zoomRatio)
  }

  zoomToOne() {
    const center = this.canvas.getCenter()
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    this.zoomToPoint(new fabric.Point(center.left, center.top), 1)
    this.context.setZoomRatio(1)
  }

  zoomToFit() {
    const zoomFitRatio = this.root.frameHandler.getFitRatio()
    const center = this.canvas.getCenter()
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomFitRatio)
    this.context.setZoomRatio(zoomFitRatio)
  }

  zoomToRatio(zoomRatio: number) {
    const center = this.canvas.getCenter()
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio)
    this.context.setZoomRatio(zoomRatio)
  }

  zoomToPoint(point: fabric.Point, zoom: number) {
    const minZoom = CANVAS_ZOOM_MIN_VALUE
    const maxZoom = CANVAS_ZOOM_MAX_VALUE
    let zoomRatio = zoom
    if (zoom <= minZoom / 100) {
      zoomRatio = minZoom / 100
    } else if (zoom >= maxZoom / 100) {
      zoomRatio = maxZoom / 100
    }
    this.canvas.zoomToPoint(point, zoomRatio)
    this.context.setZoomRatio(zoomRatio)
  }
}

export default ZoomHandler
