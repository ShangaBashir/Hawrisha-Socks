const db = require('./db');

async function initializeDatabase() {
  try {
    console.log('Initializing database schema and seed data...');

    // 1. Create products table
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        category VARCHAR(100) NOT NULL,
        color_family VARCHAR(50),
        badge VARCHAR(100),
        description TEXT,
        image_url VARCHAR(255)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Create product_colors table
    await db.query(`
      CREATE TABLE IF NOT EXISTS product_colors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        color_class VARCHAR(100) NOT NULL,
        color_name VARCHAR(100) NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Create categories table
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Create badges table
    await db.query(`
      CREATE TABLE IF NOT EXISTS badges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Create colors table
    await db.query(`
      CREATE TABLE IF NOT EXISTS colors (
        id VARCHAR(50) PRIMARY KEY,
        class VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        family VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed default categories if empty
    const [categories] = await db.query('SELECT COUNT(*) as count FROM categories');
    if (categories[0].count === 0) {
      const defaultCategories = ['Animals', 'Fruits', 'Patterns', 'Cozy Crew'];
      for (const cat of defaultCategories) {
        await db.query('INSERT IGNORE INTO categories (name) VALUES (?)', [cat]);
      }
      console.log('Seeded default categories.');
    }

    // Seed default badges if empty
    const [badges] = await db.query('SELECT COUNT(*) as count FROM badges');
    if (badges[0].count === 0) {
      const defaultBadges = ['Bestseller', 'New', 'Sale'];
      for (const badge of defaultBadges) {
        await db.query('INSERT IGNORE INTO badges (name) VALUES (?)', [badge]);
      }
      console.log('Seeded default badges.');
    }

    // Seed default colors if empty
    const [colors] = await db.query('SELECT COUNT(*) as count FROM colors');
    if (colors[0].count === 0) {
      const defaultColors = [
        { id: 'beige', class: 'bg-[#F5F5DC]', name: 'Classic Beige', family: 'beige' },
        { id: 'sage', class: 'bg-[#B2AC88]', name: 'Sage Green', family: 'sage' },
        { id: 'slate', class: 'bg-[#36454F]', name: 'Charcoal Slate', family: 'slate' },
        { id: 'rose', class: 'bg-[#C08081]', name: 'Dusk Rose', family: 'rose' },
        { id: 'yellow', class: 'bg-yellow-400', name: 'Lemon Yellow', family: 'yellow' },
        { id: 'green', class: 'bg-emerald-600', name: 'Avocado Green', family: 'green' },
        { id: 'purple', class: 'bg-purple-400', name: 'Soft Lavender', family: 'purple' },
        { id: 'orange', class: 'bg-orange-500', name: 'Citrus Orange', family: 'orange' }
      ];
      for (const color of defaultColors) {
        await db.query(
          'INSERT IGNORE INTO colors (id, class, name, family) VALUES (?, ?, ?, ?)',
          [color.id, color.class, color.name, color.family]
        );
      }
      console.log('Seeded default colors.');
    }

    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
}

module.exports = initializeDatabase;
