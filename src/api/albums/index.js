const { AlbumPayloadSchema } = require('../../validator/albums/schema');
const InvariantError = require('../../exceptions/InvariantError');

const AlbumsValidator = {
  validatedAlbumsPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
