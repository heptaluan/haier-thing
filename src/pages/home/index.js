import React from 'react'
import { Link } from 'react-router-dom'
import HomeTopHeader from '../../components/home/homeTopHeader/index'
import './index.scss'

const Home = () => {
  return (
    <div className="home">
      <HomeTopHeader></HomeTopHeader>
      <ul>
        <li>
          <Link to="/family">智慧家庭</Link>
        </li>
        <li>
          <Link to="/park">智慧园区</Link>
        </li>
        <li>
          <Link to="/hotel">智慧酒店</Link>
        </li>
        <li>
          <Link to="/education">智慧教育</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
