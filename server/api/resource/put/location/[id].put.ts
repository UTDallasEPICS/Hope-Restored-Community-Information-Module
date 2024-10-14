import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdateLocationAttributes = {
    resourceId: number;
    locations: {
        id?: number; // Optional id for existing locations
        addressLine1: string;
        addressLine2?: string; // Optional field
        city: string;
        state: string;
        postalCode: string;
        country: string;
        longitude: number;
        latitude: number;
    }[];
};

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateLocationAttributes>(event);
    const { resourceId, locations } = body;

    if (!resourceId) {
        return { error: "Resource ID is required" };
    }

    try {
        // Check if the resource exists
        const resource = await prisma.resource.findUnique({
            where: { id: resourceId },
            include: { locations: true },
        });

        if (!resource) {
            return { error: "Resource not found" };
        }

        const updatedLocations = await Promise.all(
            locations.map(async (location) => {
                // Provide a default value for addressLine2 if it's undefined
                const addressLine2 = location.addressLine2 || ""; // Default to an empty string

                // If an ID is provided, update the existing location; otherwise, create a new one
                return await prisma.location.upsert({
                    where: { id: location.id || -1 }, // Use a non-existent ID to trigger create if no ID is provided
                    update: {
                        addressLine1: location.addressLine1,
                        addressLine2: addressLine2, // Use the default value
                        city: location.city,
                        state: location.state,
                        postalCode: location.postalCode,
                        country: location.country,
                        longitude: location.longitude,
                        latitude: location.latitude,
                    },
                    create: {
                        addressLine1: location.addressLine1,
                        addressLine2: addressLine2, // Use the default value
                        city: location.city,
                        state: location.state,
                        postalCode: location.postalCode,
                        country: location.country,
                        longitude: location.longitude,
                        latitude: location.latitude,
                        resource: { connect: { id: resourceId } }, // Connect to the resource
                    },
                });
            })
        );

        return { success: true, updatedLocations };
        
    } catch (error) {
        console.error("Error updating locations:", error);
        return { error: "Failed to update locations" };
    }
});
