import React, { useState, useEffect } from "react";
import "./Community.css";
import profilePic from "../../assets/blank-profile-picture-973460_1280.webp";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

const API_URL = "http://localhost:5050/posts";

function Community() {
  const [newPost, setNewPost] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});

  //here we fetch posts from MongoDB on load
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  //now we handle new post submission
  const handlePostSubmit = async () => {
    if (newPost.trim() && newLocation.trim() && newReview.trim() && newRating.trim()) {
      const newEntry = {
        username: "Current User",
        timestamp: new Date().toLocaleString(),
        content: newPost,
        location: newLocation,
        rating: newRating,
        review: newReview,
        likes: 0,
        rsvps: 0,
        comments: [],
      };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });

        if (response.ok) {
          const savedPost = await response.json();
          setPosts((prevPosts) => [savedPost, ...prevPosts]); 
          setNewPost("");
          setNewLocation("");
          setNewReview("");
          setNewRating("");
        } else {
          console.error("Failed to save post to MongoDB");
        }
      } catch (error) {
        console.error("Error posting:", error);
      }
    }
  };

  //here is where we handle likes, incrementing, etc
  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}/like`, {
        method: "PUT",
      });
  
      if (response.ok) {
        const updatedPost = await response.json();

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, likes: updatedPost.likes, rsvps: post.rsvps }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  

  const handleRSVP = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}/rsvp`, {
        method: "PUT",
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
  
        console.log("RSVP successful for post:", postId, "New RSVP count:", updatedPost.rsvps);
  
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, rsvps: updatedPost.rsvps || 1 } : post
          )
        );
      } else {
        console.error("Failed to RSVP:", await response.text());
      }
    } catch (error) {
      console.error("Error RSVPing:", error);
    }
  };
  

  const handleCommentSubmit = async (postId) => {
    if (!commentInputs[postId]?.trim()) return;
  
    try {
      const response = await fetch(`${API_URL}/${postId}/comment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Current User", text: commentInputs[postId] }),
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
  
        console.log("Comment added:", updatedPost.comments);
  
        //making sure new comments appear under post
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, comments: updatedPost.comments } : post
          )
        );
  
        setCommentInputs((prev) => ({
          ...prev,
          [postId]: "",
        }));
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
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
            placeholder="How was the event?"
          />
          <input className="new-post-input" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Location (e.g., Minneapolis, MN)" />
          <input className="new-post-input" value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Write a short review..." />
          <select className="new-post-input" value={newRating} onChange={(e) => setNewRating(e.target.value)}>
            <option value="">Select Rating</option>
            <option value="⭐️">⭐️</option>
            <option value="⭐️⭐️">⭐️⭐️</option>
            <option value="⭐️⭐️⭐️">⭐️⭐️⭐️</option>
            <option value="⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️</option>
            <option value="⭐️⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️⭐️</option>
          </select>
          <button className="new-post-button" onClick={handlePostSubmit}>Post</button>
        </div>

        <main className="posts-section">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <div className="post-header">
                <div className="post-user-info">
                  <img src={profilePic} alt="User Profile" className="post-profile-image" />
                  <h3 className="post-username">{post.username}</h3>
                </div>
                <span className="post-timestamp">{post.timestamp}</span>
              </div>
              <p className="post-content">{post.content}</p>
              <p><strong>Location:</strong> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.location)}`} target="_blank" rel="noopener noreferrer">{post.location}</a></p>
              <p className="rating"><strong>Rating:</strong> {post.rating}</p>
              <p><strong>Review:</strong> {post.review}</p>

              <div className="post-actions">
                <button className="action-button" onClick={() => handleLike(post._id)}>
                  <FaRegHeart className="action-icon" /> {post.likes}
                </button>
                <button className="action-button" onClick={() => setShowCommentBox((prev) => ({ ...prev, [post._id]: !prev[post._id] }))}>
                  <FaRegCommentDots className="action-icon" /> {post.comments.length}
                </button>
                <button className="action-button rsvp-button" onClick={() => handleRSVP(post._id)}>
                  <MdEventAvailable className="action-icon" /> {post.rsvps || 0}
                </button>
              </div>

      {showCommentBox[post._id] && (
        <div className="comment-box">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInputs[post._id] || ""}
            onChange={(e) => setCommentInputs((prev) => ({
              ...prev,
              [post._id]: e.target.value,
            }))}
            className="comment-input"
          />
          <button onClick={() => handleCommentSubmit(post._id)} className="comment-submit-button">
            Comment
          </button>
        </div>
      )}

<div className="comment-list">
  {post.comments.map((comment, index) => (
    <div key={index} className="comment">
      <img src={profilePic} alt="User Profile" className="comment-profile-image" />
      <div className="comment-content">
        <span className="comment-username">{comment.username}</span>
        <p>{comment.text}</p>
      </div>
    </div>
  ))}
</div>
    </div>
  ))}
</main>
      </div>
    </div>
  );
}

export default Community;
