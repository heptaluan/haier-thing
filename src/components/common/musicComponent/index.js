import React from 'react'
import './index.scss'
import { Button } from 'antd'
import IconFont from '../IconFont/index'

const MusicComponent = () => {
  return (
    <div className="music-box-wrap">
      <div className="music-box">
        <Button>
          <IconFont
            style={{ fontSize: '24px' }}
            type="icon-bofangqishangyishou"
          />
        </Button>
        <Button>
          <IconFont style={{ fontSize: '24px' }} type="icon-bofangqi-bofang" />
        </Button>
        <Button>
          <IconFont style={{ fontSize: '24px' }} type="icon-bofangqi-zanting" />
        </Button>
        <Button>
          <IconFont
            style={{ fontSize: '24px' }}
            type="icon-bofangqixiayishou"
          />
        </Button>
      </div>
    </div>
  )
}

export default MusicComponent
