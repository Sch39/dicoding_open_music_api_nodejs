const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const mapAlbumDBToModel = require('../../utils/mapper/mapAlbumDBToModel');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({
    name, year,
  }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO albums(id, name, year) VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Failed add album');
    }
    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT albums.*, songs.id as song_id, songs.title, songs.performer FROM albums LEFT JOIN songs ON albums.id=songs.album_id WHERE albums.id=$1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album not found!');
    }
    const album = result.rows.map(mapAlbumDBToModel)[0];
    if (!result.rows[0].song_id) {
      album.songs = [];
    } else {
      album.songs = result.rows.map((
        { song_id: songId, title, performer },
      ) => ({ id: songId, title, performer }));
    }

    return album;
  }

  async editAlbumById(id, {
    name, year,
  }) {
    const query = {
      text: 'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING *',
      values: [name, year, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Failed update album. Id not found!');
    }
    return result.rows.map(mapAlbumDBToModel)[0];
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id=$1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Failed delete album. Id not found!');
    }
    return result.rows[0].id;
  }
}

module.exports = AlbumsService;
