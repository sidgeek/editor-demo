// @ts-nocheck
import { fabric } from 'fabric'

import { CallbackFunction } from '../constants/interfaces'

class BackgroundObject extends fabric.Image {
  static type = 'Background'
  initialize(element: any, options: any) {
    super.initialize(element, {
      ...options,
      crossOrigin: 'anonymous',
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      hoverCursor: 'default',
      strokeWidth: 0,
      selectable: false,
      evented: false,
    })
    return this
  }

  static fromObject(options: BackgroundOptions, callback: CallbackFunction) {
    fabric.util.loadImage(options.src, function (img) {
      return callback && callback(new fabric.Background(img, options))
    })
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
}

fabric.Background = fabric.util.createClass(BackgroundObject, {
  type: BackgroundObject.type,
})
fabric.Background.fromObject = BackgroundObject.fromObject

export interface BackgroundOptions extends fabric.IImageOptions {
  id: string
  name?: string
  description?: string
  src: string
}

declare module 'fabric' {
  namespace fabric {
    class Background extends BackgroundObject {
      constructor(options: BackgroundOptions)
    }
  }
}
