import multer from "multer";

export const storageUserPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/uploads/photos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split("/")[1];
    const filename = `photo-${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});
