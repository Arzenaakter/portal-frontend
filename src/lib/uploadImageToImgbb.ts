import axios from "axios";

export const uploadImageToImgbb = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "NEXT_PUBLIC_IMGBB_API_KEY is missing. Add it to your .env.local file.",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
  );

  const imageUrl = response.data?.data?.url;

  if (!imageUrl) {
    throw new Error("Image upload failed. No URL was returned.");
  }

  return imageUrl;
};
