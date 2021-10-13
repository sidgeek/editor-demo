import { fabric } from 'fabric'
import isNaN from 'lodash/isNaN'

import { ObjectType, SCALE_FACTOR } from '../constants/constants'
import { loadImageFromURL } from './image-loader'

class ObjectToFabric {
  async run(item: any, options: any) {
    let object
    switch (item.type) {
      case ObjectType.TEXTAREA:
        object = await this.staticText(item, options)
        break
      case ObjectType.STATIC_IMAGE:
        object = await this.staticImage(item, options)
        break
    }

    return object
  }

  staticText(item: any, options: any) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const metadata = item.metadata
        const {
          textAlign,
          fontFamily,
          fontSize,
          fontWeight,
          charSpacing,
          lineHeight,
          value,
        } = metadata
        const textOptions = {
          ...baseOptions,
          text: value ? value : 'Default Text',
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineHeight && { lineHeight }),
        }
        const element = new fabric.Textarea(textOptions)

        const { top, left, width, height } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top + options.height / 2 - (height || 0) / 2,
            left: options.left + options.width / 2 - (width || 0) / 2,
          })
        }

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  staticImage(item: any, options: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options) as any
        const src = item.metadata.src
        const image = await loadImageFromURL(src)

        const { width, height } = baseOptions
        if (!width || !height) {
          baseOptions.width = image.width
          baseOptions.height = image.height
        }

        const element = new fabric.StaticImage(image, baseOptions)

        const { top, left } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top,
            left: options.left,
          })
          element.scaleToWidth(320)
        }
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  getBaseOptions(item: any, options: any) {
    const { left, top, width, height, scaleX, scaleY, index } = item
    const metadata = item.metadata ? item.metadata : {}
    const { fill, angle, originX, originY } = metadata
    const baseOptions = {
      angle: angle ? angle : 0,
      top: options.top + top,
      left: options.left + left,
      width: width * SCALE_FACTOR,
      height: height * SCALE_FACTOR,
      originX: originX || 'left',
      originY: originY || 'top',
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || '#000000',
      metadata: metadata,
      index: index,
    }
    return baseOptions
  }
}

export default new ObjectToFabric()
