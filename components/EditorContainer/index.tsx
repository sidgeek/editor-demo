import CanvasEditor from '@components/CanvasEditor'
import EditPanel from '@components/EditPanel'
import TopMenu from '@components/TopMenu'
import React from 'react'

import Panels from '../Panels'
import styles from './EditorContainer.module.scss'

export default function EditorContainer() {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorTopMenu}>
        <TopMenu />
      </div>
      <div className={styles.editorBottomContainer}>
        <Panels />
        <div className={styles.editorBottomRightContainer}>
          <div id="pane" className={styles.editor}>
            <CanvasEditor />
          </div>
          <div className={styles.editorPane}>
            <EditPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
