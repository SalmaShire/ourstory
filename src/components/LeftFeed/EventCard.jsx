import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

function EventCard({ event }) {
  const yearsAgo = formatDistanceToNowStrict(new Date(event.date), { unit: 'year' });

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <div className="event-header">
          <h4>{event.title}</h4>
          <span className="event-time">{yearsAgo} ago</span>
        </div>
        <p className="event-location">📍 {event.location}</p>
        <div className="tags">
          {event.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
