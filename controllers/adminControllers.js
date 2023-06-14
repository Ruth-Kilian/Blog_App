/* Controller function for admin user */

const Blog = require("../models/Blog");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// delete a user account
exports.deleteUserAccount = async (req, res) => {
  try {
    // get userId as a parameter
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    // if the user is not in the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the blog posts of the user
    const userBlogs = await Blog.find({ user: userId });

    // Delete the blog images
    userBlogs.forEach((blog) => {
      // constructs the image file path and uses fs to delete the corr. image file from the uploads folder
      const imagePath = path.join(__dirname, "../uploads", blog.image);
      fs.unlinkSync(imagePath);
    });

    // Delete user's blog posts
    await Blog.deleteMany({ user: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Delete the profile picture file
    if (user.profilePicture) {
      // constructs the image file path and uses fs to delete the corr. image file from the profilePics folder
      const profilePicturePath = path.join(
        __dirname,
        "../profilePics",
        user.profilePicture
      );
      fs.unlinkSync(profilePicturePath);
    }

    // send success message
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    // send error message
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user account" });
  }
};

// handles the deletion of a user's blog post
exports.deleteUserBlog = async (req, res) => {
  try {
    // expects the blogId as a parameter
    const blogId = req.params.id;

    // Find the blog by the provided blogId
    const blog = await Blog.findById(blogId);

    // if the blog is not in the database
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the image file
    const imagePath = `./uploads/${blog.image}`;
    fs.unlinkSync(imagePath);

    // Delete the blog post
    await Blog.findByIdAndDelete(blogId);

    // send success message
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("ADMIN DELETE BLOG ERROR: ", error);
    // send error message
    res.status(500).json({ message: "Internal server error" });
  }
};
