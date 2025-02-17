const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { PUBLIC_DIR } = require("../helpers/const");

const uploadImage = async (id, file) => {
  const avatarURL = path.join("avatars", `${id}${file.originalname}`);

  try {
    const image = await Jimp.read(file.path);
    await image.resize(250, 250).write(path.join(PUBLIC_DIR, avatarURL));

    return avatarURL;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await fs.unlink(file.path);
  }
};

module.exports = { uploadImage };
