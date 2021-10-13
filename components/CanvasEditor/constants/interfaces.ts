import { fabric } from 'fabric'

import { IEditorContext } from '../context/editor'
import Handlers from '../handlers'

export interface FabricWheelEvent {
  e: WheelEvent
  target?: fabric.Object | undefined
  subTargets?: fabric.Object[] | undefined
  button?: number | undefined
  isClick?: boolean | undefined
  pointer?: fabric.IPoint | undefined
  absolutePointer?: fabric.IPoint | undefined
  transform?:
    | {
        corner: string
        original: fabric.Object
        originX: string
        originY: string
        width: number
      }
    | undefined
}

export interface HandlerOptions {
  root: Handlers
  context: IEditorContext
  canvas: FabricCanvas
}

export interface RootHandlerOptions {
  context: IEditorContext
  canvas: FabricCanvas
}

export interface EditorOptions {
  id: string
  context: any
}

export interface CanvasOptions {
  width: number
  height: number
}

export type CanvasObjectOptions = CanvasOptions

export interface FabricCanvasOption {
  wrapperEl: HTMLElement
}

export type FabricCanvas<T = fabric.Canvas> = T & FabricCanvasOption

export type CallbackFunction = (params?: any) => any
