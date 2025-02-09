import React, { useState } from 'react';
import './Community.css';
import profilePic from '../../assets/blank-profile-picture-973460_1280.webp';


function Community() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, username: 'Sophia Martinez', timestamp: '1h ago', content: 'The Twin Cities Jazz Festival was an incredible experience! The music, the vibe, everything was top-notch.', location: 'Downtown St. Paul, MN - 123 Jazz St.', rating: '⭐️⭐️⭐️⭐️⭐️', review: 'If you love jazz, this is the event for you. Come by next time and experience the magic!', likes: 14, comments: 5 },
    { id: 2, username: 'James Anderson', timestamp: '2h ago', content: 'The Winter Carnival at Rice Park was fantastic! The ice sculptures were breathtaking.', location: 'Rice Park, St. Paul, MN - 456 Snow Ave.', rating: '⭐️⭐️⭐️⭐️⭐️', review: 'Perfect for families and friends. Definitely a must-visit next winter!', likes: 23, comments: 8 },
    { id: 3, username: 'Emily Johnson', timestamp: '3h ago', content: 'The Farmers Market in downtown St. Paul was full of fresh produce and amazing local vendors.', location: 'Market Square, St. Paul, MN - 789 Fresh Ln.', rating: '⭐️⭐️⭐️⭐️', review: 'A great spot for food lovers. Highly recommend visiting early for the best selection!', likes: 9, comments: 2 },
    { id: 4, username: 'Michael Lee', timestamp: 'Yesterday', content: 'Minnesota State Fair was a blast! Loved the deep-fried food and entertainment.', location: '126 Fairground Rd., St. Paul, MN', rating: '⭐️⭐️⭐️⭐️⭐️', review: 'This fair gets better every year. If you haven’t been, don’t miss out next time!', likes: 31, comments: 10 },
    { id: 5, username: 'Sarah Kim', timestamp: '2 days ago', content: 'Art in Bloom at the Minneapolis Institute of Art was stunning.', location: '2400 3rd Ave S, Minneapolis, MN', rating: '⭐️⭐️⭐️⭐️', review: 'The floral arrangements were breathtaking. Perfect for art lovers!', likes: 18, comments: 6 },
    { id: 6, username: 'Daniel Roberts', timestamp: 'Last week', content: 'The Timberwolves game was intense! The energy was unreal.', location: 'Target Center, Minneapolis, MN', rating: '⭐️⭐️⭐️⭐️', review: 'Great atmosphere, awesome game. Can’t wait for the next one!', likes: 27, comments: 12 },
    { id: 7, username: 'Jessica Lopez', timestamp: '3 days ago', content: 'UMN students looking for volunteer opportunities, check out local food banks!', location: 'Minneapolis Food Bank - 101 Community Dr.', rating: '⭐️⭐️⭐️⭐️⭐️', review: 'Volunteering here was an amazing experience. They need more hands, so stop by if you can!', likes: 15, comments: 3 },
    { id: 8, username: 'Ryan Thomas', timestamp: '4 days ago', content: 'Stumbled upon a great free food distribution event near UMN!', location: 'Hope Community Center - 202 Helping Hands Ave.', rating: '⭐️⭐️⭐️⭐️', review: 'They provide food for students in need. If you’re struggling, stop by and check it out!', likes: 20, comments: 7 },
    { id: 9, username: 'Olivia Green', timestamp: '5 days ago', content: 'Looking for weekend volunteering? The Twin Cities Food Bank is always welcoming students!', location: 'Twin Cities Food Bank - 303 Charity Ln.', rating: '⭐️⭐️⭐️⭐️⭐️', review: 'A great way to give back and meet fellow students. Highly recommend joining!', likes: 12, comments: 4 },
  ]);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const newEntry = {
        id: posts.length + 1,
        username: 'Current User',
        timestamp: 'Just now',
        content: newPost,
        location: 'User Location',
        rating: '⭐️⭐️⭐️⭐️',
        review: 'Excited to share this with everyone!',
        likes: 0,
        comments: 0,
      };
      setPosts([newEntry, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleRSVP = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, rsvps: (post.rsvps || 0) + 1 } : post
      )
    );
  };

  return (
    <div className="community-page">
      <div className="content">
        <div className="new-post-container">
          <img src={profilePic} alt="User Profile" className="post-profile-image" />
          <textarea
            className="new-post-input"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button className="new-post-button" onClick={handlePostSubmit}>Post</button>
        </div>

        <main className="posts-section">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <div className="post-user-info">
                  <img src={profilePic} alt="User Profile" className="post-profile-image" />
                  <h3 className="post-username">{post.username}</h3>
                </div>
                <span className="post-timestamp">{post.timestamp}</span>
              </div>
              <hr className="post-divider" />
              <p className="post-content">{post.content}</p>
              <div className="post-details">
                <p>
                  <strong>Location:</strong>{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-link"
                  >
                    {post.location}
                  </a>
                </p>
                <p className="rating"><strong>Rating:</strong> {post.rating}</p>
                <p><strong>Review:</strong> {post.review}</p>
              </div>
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>Like ❤️ {post.likes}</button>
                <button>Comment {post.comments}</button>
                <button className="rsvp-button" onClick={() => handleRSVP(post.id)}>RSVP 🙌 {post.rsvps}</button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Community;