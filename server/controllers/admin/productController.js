const { imageUploadUtil } = require("../../helpers/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Image upload failed", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};


module.exports = {
  handleImageUpload,
};
