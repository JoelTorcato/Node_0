import { randomUUID } from 'crypto';
import { sql } from './db.js';

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) 
    {
      videos = await sql`SELECT * FROM videos 
      WHERE id = ${search}
      OR title ILIKE ${'%' + search + '%'}`;
    } else 
    {
      videos = await sql`SELECT * FROM videos`;
    }
    return videos;
  }

  async create(video) 
  {
    const videoId = randomUUID();
    const { title, description, duration, channel } = video;

    await sql`INSERT INTO videos (id, title, description, duration, channel) VALUES (${videoId}, ${title}, ${description}, ${duration}, ${channel})`;
  }

  async update(id, video) 
  {
    const { title, description, duration, channel } = video

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration}, channel = ${channel} WHERE id = ${id}`
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
