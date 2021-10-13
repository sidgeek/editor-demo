import { FabricCanvas, HandlerOptions } from '../constants/interfaces'
import { IEditorContext } from '../context'
import Handlers from '.'

class BaseHandler {
  public canvas: FabricCanvas
  public root: Handlers
  public context: IEditorContext
  constructor({ canvas, root, context }: HandlerOptions) {
    this.canvas = canvas
    this.root = root
    this.context = context
  }
}
export default BaseHandler
