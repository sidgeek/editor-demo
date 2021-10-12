import { ContentItem, TextContent } from '@src/components/LeftToolBar'

import { Item } from './types'

export const tabItems: Item[] = [
  {
    name: '文字',
    component: <TextContent />,
  },
  {
    name: '元素',
    component: <ContentItem />,
  },
]
