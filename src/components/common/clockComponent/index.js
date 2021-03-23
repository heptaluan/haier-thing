import React, { useState, useEffect } from 'react'
import './index.scss'

const ClockComponent = () => {

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setDate(v => v = new Date())
    }, 1000)
    return() => clearInterval(id)
  }, [])

  return (
    <div>
      {date.toLocaleTimeString()}
    </div>
  )
}

export default ClockComponent
