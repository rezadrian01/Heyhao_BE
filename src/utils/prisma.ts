import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      photo_url: {
        needs: {
          photo: true,
        },
        compute(data) {
          if (data.photo) {
            return `${process.env.URL_ASSET_PHOTO}${data.photo}`;
          }
          return null;
        },
      },
    },
  },
});

export default prisma;
