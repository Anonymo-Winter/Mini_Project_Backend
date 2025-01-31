import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (file, foldername) => {
    try {
        if (!file) {
            throw new Error("File is required!");
        }

        // Correct usage of the Cloudinary uploader with a folder option
        const response = await cloudinary.uploader.upload(file, {
            resource_type: "auto", // Automatically detect the file type
            folder: foldername, // Correct placement of the folder option
        });

        return response.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

export default uploadOnCloudinary;