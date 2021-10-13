import { fabric } from 'fabric'

import { CallbackFunction } from '../constants/interfaces'

export class StaticImageObject extends fabric.Image {
  static type = 'StaticImage'
  subtype = 'image'
  // @ts-ignore
  initialize(element: HTMLImageElement, options: StaticImageOptions) {
    this.subtype = options.subtype
    // @ts-ignore
    super.initialize(element, options)
    return this
  }

  static fromObject(options: StaticImageOptions, callback: CallbackFunction) {
    fabric.util.loadImage(options.src, function (img) {
      return callback && callback(new fabric.StaticImage(img, options))
    })
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
}

fabric.StaticImage = fabric.util.createClass(StaticImageObject, {
  type: StaticImageObject.type,
})
fabric.StaticImage.fromObject = StaticImageObject.fromObject

export interface StaticImageOptions extends fabric.IImageOptions {
  id: string
  name?: string
  description?: string
  subtype: string
  src: string
}

declare module 'fabric' {
  namespace fabric {
    class StaticImage extends StaticImageObject {
      constructor(element: HTMLImageElement, options: StaticImageOptions)
    }
  }
}
