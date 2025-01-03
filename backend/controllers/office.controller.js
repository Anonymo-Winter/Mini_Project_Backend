import bcryptjs from "bcryptjs";
import generateTokenAndCookies from "../utils/generateTokenAndCookies.js";
import prisma from "../prisma/index.js";

export const createOffice = async (req, res) => {
  const { name, latitude, longitude, id } = req.body;
  try {
    if (!name || !latitude || !longitude || !id) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const office = await prisma.$executeRaw`
    INSERT INTO "Office" (id, name, latitude, longitude, location)
    VALUES (${id}, ${name}, ${latitude}, ${longitude}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
  `;
    res.status(200).json({ success: true, office });
  } catch (error) {
    console.log("Error in createOffice ", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const findNearestOffice = async (issueLat, issueLon) => {
  // Fetch all offices with their latitude and longitude
  const offices = await prisma.office.findMany({
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
    },
  });

  if (offices.length === 0) {
    throw new Error("No offices available to assign.");
  }

  // Helper function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Find the nearest office
  let nearestOffice = null;
  let minDistance = Infinity;

  offices.forEach((office) => {
    const distance = calculateDistance(
      issueLat,
      issueLon,
      office.latitude,
      office.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestOffice = office;
    }
  });

  return {
    officeId: nearestOffice.id,
    officeName: nearestOffice.name,
    distance: minDistance,
  };
};

// Example Usage
// async () => {
//   const issueLat = 16.5062; // Example latitude for the issue
//   const issueLon = 80.648; // Example longitude for the issue

//   try {
//     const nearestOffice = await findNearestOffice(issueLat, issueLon, prisma);
//     console.log("Nearest Office:", nearestOffice);
//     /*
//         Output Example:
//         Nearest Office: { officeId: 'office-id', officeName: 'Main Office', distance: 2.3 }
//       */
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// };
