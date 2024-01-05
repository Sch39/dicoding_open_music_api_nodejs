/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
      notNull: false,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
  });

  pgm.addConstraint('songs', 'fk_songs.albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE SET NULL');
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
};
