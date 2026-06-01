const pool = require("../config/db");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, content, type, category } = req.body;

    const image = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      "INSERT INTO blogs (title, image, content, type, category) VALUES (?, ?, ?, ?, ?)",
      [title, image, content, type, category],
    );

    res.status(201).json({
      message: "Blog created",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const [blogs] = await pool.query("SELECT * FROM blogs ORDER BY id DESC");

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE BLOG
exports.getBlogById = async (req, res) => {
  try {
    const [blog] = await pool.query("SELECT * FROM blogs WHERE id=?", [
      req.params.id,
    ]);

    res.json(blog[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const { title, image, content, type, category } = req.body;

    await pool.query(
      "UPDATE blogs SET title=?, image=?, content=?, type=?, category=? WHERE id=?",
      [title, image, content, type, category, req.params.id],
    );

    res.json({
      message: "Blog updated",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    await pool.query("DELETE FROM blogs WHERE id=?", [req.params.id]);

    res.json({
      message: "Blog deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
