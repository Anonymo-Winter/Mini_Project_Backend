import bcryptjs from "bcryptjs";
import generateTokenAndCookies from "../utils/generateTokenAndCookies.js";
import prisma from "../prisma/index.js";

// Function to find the nearest office
const findNearestOffice = async (prisma, latitude, longitude) => {
    const [nearestOffice] = await prisma.$queryRaw`
        SELECT 
            id, 
            name, 
            latitude, 
            longitude,
            ST_Distance(
                location::geometry,
                ST_SetSRID(ST_MakePoint(${longitude}, ${latitude})::geometry, 4326)
            ) AS distance
        FROM "Office"
        ORDER BY location::geometry <-> ST_SetSRID(ST_MakePoint(${longitude}, ${latitude})::geometry, 4326)
        LIMIT 1;
    `;
    return nearestOffice;
};

// Create Issue controller
export const createIssue = async (req, res) => {
    const { title, description, latitude, longitude } = req.body;
    const {userId} = req;
    try {
        // Input validation
        if (!title || !description || !latitude || !longitude) {
            return res.status(400).json({ 
                success: false, 
                error: "All fields are required" 
            });
        }

        // Validate coordinates
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        
        if (isNaN(lat) || isNaN(lng) || 
            lat < -90 || lat > 90 || 
            lng < -180 || lng > 180) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid coordinates" 
            });
        }

        const nearestOffice = await findNearestOffice(prisma, lat, lng);

        if (!nearestOffice) {
            return res.status(400).json({ 
                success: false, 
                error: "No nearest office found" 
            });
        }

        //Create the issue with the nearest office
        const issue = await prisma.issue.create({
            data: {
                title,
                description,
                latitude: lat,
                longitude: lng,
                officeId: nearestOffice.id,
                userId
            }
        });

        res.status(201).json({ 
            success: true, 
            issue 
        });

    } catch (error) {
        console.error("Error in createIssue:", error);
        res.status(500).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
};