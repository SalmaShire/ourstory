import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

function MainEventCard({ title, description, location, tags, date, image }) {
  const yearsAgo = date
    ? formatDistanceToNowStrict(new Date(date), { unit: 'year' })
    : null;

  return (
    <div className="main-event">
      <img src={image} alt={title} className="main-event-image" />
      
      <div className="main-event-content">
        <h2 className="main-event-title">{title}</h2>
        <p className="main-event-description">{description}</p>
        <p className="main-event-location">📍 {location}</p>
        
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        
        
        {yearsAgo && <div className="main-event-time">{yearsAgo} ago</div>}
      </div>
    </div>
  );
}

export default MainEventCard;
