const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;
  user_id;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.user_id = row.user_id;
    this.created_at = row.created_at;
  }

  static async insert({ text, user_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO posts (text, user_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [text, user_id]
    );

    return new Post(rows[0]);
  }
};
