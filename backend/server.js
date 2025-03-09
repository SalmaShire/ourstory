require("dotenv").config(); //load .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

//connecting to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

//post schema
const postSchema = new mongoose.Schema({
  username: String,
  timestamp: String,
  content: String,
  location: String,
  rating: String,
  review: String,
  likes: { type: Number, default: 0 },
  rsvps: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
});

const Post = mongoose.model("Post", postSchema);

//create post
app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

//get all posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

//update likes
app.put("/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(new mongoose.Types.ObjectId(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

//update rsvp 
app.put("/posts/:id/rsvp", async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { rsvps: 1 } }, //making sure it increment RSVP count only, dosent affect other counts
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost); //sends updated post to frontend to update
  } catch (error) {
    console.error("RSVP Error:", error);
    res.status(500).json({ message: "Error updating RSVP", error });
  }
});



app.put("/posts/:id/comment", async (req, res) => {
  try {
    const postId = req.params.id;
    const { username, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    //find and update post, pushing the new comment
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { username, text } } }, //push new comment to array
      { new: true } //return updated post
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Comment added to post:", postId, "New comments:", updatedPost.comments);
    res.json(updatedPost); //send updated post back to frontend
  } catch (error) {
    console.error("Comment Error:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
});




// start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
