import { sql } from './db.js';

(async () => 
  {
  try 
  {
    await sql`
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        duration INTEGER,
        channel TEXT,
      );
    `;
    console.log('Table "videos" created successfully!');
  } catch (error) 
  {
    console.error('Error creating table:', error);
  }
})();
