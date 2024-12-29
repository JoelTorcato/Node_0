import { randomUUID } from 'crypto';

export class DatabaseMemory{
  #videos = new Map(); // We use a # when is a private class field

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1] // title, description...

        return {
          id, 
          ...data, // The spread operator (...) expands arrays, objects, or iterables conveniently.
        }

    }) // it converts a data structure that is not an array, to an array. 
      .filter(video => {
        if (search) {
          return video.title.includes(search)
        }
        return true // Otherwise return all videos
    })
  }

// .map(), used to iterate through an array and make some modifications
// .map() (Array Method) different from new Map() (JavaScript Map Object)

  create(videos) {
    const videosId = randomUUID(); 

    this.#videos.set(videosId, videos); 
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}