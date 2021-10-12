import classNames from 'classnames'

import { Item } from '../types'
import styles from './PanelItem.module.scss'

interface Props {
  panelOpen: boolean
  activeItem: Item
}
function PanelItem({ panelOpen, activeItem }: Props) {
  const className = classNames(
    styles.panelItemContainer,
    panelOpen ? styles.open : null
  )

  return (
    <div className={className}>
      <div className={styles.panelItem}>{activeItem.component}</div>
    </div>
  )
}

export default PanelItem
