const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- 1. CATEGORIES CRUD ---

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new category
router.post('/categories', async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  try {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name.trim()]);
    res.status(201).json({ id: result.insertId, name: name.trim() });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Category already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Optional check: are there products using this category?
    // We won't block it, or we can just let it delete.
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- 2. BADGES CRUD ---

// Get all badges
router.get('/badges', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM badges ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new badge
router.post('/badges', async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Badge name is required' });
  }
  try {
    const [result] = await db.query('INSERT INTO badges (name) VALUES (?)', [name.trim()]);
    res.status(201).json({ id: result.insertId, name: name.trim() });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Badge already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete a badge
router.delete('/badges/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM badges WHERE id = ?', [id]);
    res.json({ message: 'Badge deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- 3. COLORS CRUD ---

// Get all colors
router.get('/colors', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM colors ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new color
router.post('/colors', async (req, res) => {
  const { id, class: colorClass, name, family } = req.body;
  if (!id || !colorClass || !name || !family) {
    return res.status(400).json({ error: 'Color ID, CSS class, Name, and Family are required' });
  }
  try {
    await db.query(
      'INSERT INTO colors (id, class, name, family) VALUES (?, ?, ?, ?)',
      [id.trim().toLowerCase(), colorClass.trim(), name.trim(), family.trim().toLowerCase()]
    );
    res.status(201).json({ id, class: colorClass, name, family });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Color ID already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete a color
router.delete('/colors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM colors WHERE id = ?', [id]);
    res.json({ message: 'Color deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
