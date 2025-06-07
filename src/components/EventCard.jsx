import React from 'react'

const EventCard = ({ image, title, date }) => {
  return (
    <div className='card'>
      <img src={image} alt="" />
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-date">{date}</div>
      </div>
    </div>
  )
}

export default EventCard