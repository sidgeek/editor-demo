import { PROPERTIES_TO_INCLUDE } from '../constants/constants'
import { HandlerOptions, RootHandlerOptions } from '../constants/interfaces'
import CanvasHandler from './CanvasHandler'
import EventsHandler from './EventsHandler'
import FrameHandler from './FrameHandler'
import ObjectHandler from './ObjectsHandler'
import ZoomHandler from './ZoomHandler'

class Handlers {
  public frameHandler: FrameHandler
  public eventsHandler: EventsHandler
  public canvasHandler: CanvasHandler
  public objectsHandler: ObjectHandler
  public zoomHandler: ZoomHandler
  public propertiesToInclude: string[]

  constructor(props: RootHandlerOptions) {
    this.propertiesToInclude = PROPERTIES_TO_INCLUDE
    const handlerOptions: HandlerOptions = {
      root: this,
      canvas: props.canvas,
      context: props.context,
    }
    this.canvasHandler = new CanvasHandler(handlerOptions)
    this.frameHandler = new FrameHandler(handlerOptions)
    this.objectsHandler = new ObjectHandler(handlerOptions)
    this.zoomHandler = new ZoomHandler(handlerOptions)
    this.eventsHandler = new EventsHandler(handlerOptions)
  }

  destroy = () => {}
}

export default Handlers
