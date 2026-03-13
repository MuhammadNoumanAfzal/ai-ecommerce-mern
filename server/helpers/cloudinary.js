const cloudinary=require("cloudinary").v2;
const multer =require("multer");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({ 
        cloud_name: cloudName, 
        api_key: apiKey, 
        api_secret: apiSecret 
    });


const storage=new multer.memoryStorage();

async function imageUploadUtil(file) {
        if (!cloudName || !apiKey || !apiSecret) {
            throw new Error("Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
        }

        const result = await cloudinary.uploader.upload(file,{
            resource_type: 'auto',
        });
        return result
}

const upload=multer({storage:storage});

module.exports={upload,imageUploadUtil};
