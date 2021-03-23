import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import IconFont from '../../components/common/IconFont/index'
import HomeTopHeader from '../../components/home/homeTopHeader/index'

const Home = () => {
  return (
    <div className="home-box">
      <HomeTopHeader></HomeTopHeader>
      <nav>
        <Link to="/family">
          <IconFont style={{ fontSize: '80px' }} type="icon-jiaju" />
          <div className="title">智慧家庭</div>
        </Link>
        <Link to="/park">
          <IconFont style={{ fontSize: '80px' }} type="icon-yuanqu" />
          <div className="title">智慧园区</div>
        </Link>
        <Link to="/hotel">
          <IconFont style={{ fontSize: '80px' }} type="icon-jiudian" />
          <div className="title">智慧酒店</div>
        </Link>
        <Link to="/education">
          <IconFont style={{ fontSize: '80px' }} type="icon-jiaoyu" />
          <div className="title">智慧教育</div>
        </Link>
      </nav>
    </div>
  )
}

export default Home
