import React from 'react';
import './LeftFeed.css';
import EventCard from './EventCard';
import MainEventCard from './MainEventCard';
import logo from '../../assets/ourstory.svg';

const events = [
  {
    title: 'Mill City Museum Fire Restoration',
    description: 'The iconic Mill City Museum was rebuilt after a devastating fire in 1991.',
    location: '704 S 2nd St, Minneapolis, MN',
    tags: ['Historic Restoration', 'Architecture'],
    image: 'https://i.imgur.com/j0vZRir.jpeg',
    date: '1991-01-15',
  },
  {
    title: 'Stone Arch Bridge Festival',
    description: 'Annual arts and music festival along the historic Stone Arch Bridge.',
    location: 'Stone Arch Bridge, Minneapolis',
    tags: ['Festival', 'Arts', 'Community'],
    image: 'https://i.imgur.com/j0vZRir.jpeg',
    date: '2018-06-10',
  },
  {
    title: 'First Minnesota Infantry Monument',
    description: 'Dedicated to Minnesota soldiers who fought in the Battle of Gettysburg.',
    location: 'Battle Monument Rd, Gettysburg National Military Park',
    tags: ['Civil War', 'Military History'],
    image: 'https://i.imgur.com/j0vZRir.jpeg',
    date: '1890-07-03',
  },
];

function LeftFeed() {
  return (
    <div className="left-feed">
      <div className="search-bar">
        <img src={logo} alt="Our Story Logo" className="logo" width="50" height="50" />
        <input type="text" placeholder="Search OurStory" className="search-input" />
      </div>
      <MainEventCard
        title="Historic Opening of First Avenue"
        description="First Avenue, the iconic music venue, opened its doors in 1970 and hosted legendary performances."
        location="701 N 1st Ave, Minneapolis, MN"
        tags={['Music', 'Historic Venue']}
        image="https://i.imgur.com/j0vZRir.jpeg"
      />
      <div className="event-list">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

export default LeftFeed;
