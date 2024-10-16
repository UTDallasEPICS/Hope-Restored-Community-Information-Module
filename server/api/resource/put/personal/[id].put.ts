import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdatePersonal = {
    personalId: number;
    name: string;
    description: string;
}


export default defineEventHandler(async(event) => {
    const body = await readBody<UpdatePersonal>(event);
    const {personalId, name, description} = body;

    if(!personalId)
        return {error: "Personal Id is required"};
    if(!name && !description)
        return {error: "Description or Name is required"}
    
    try {
        const personal = await prisma.personal.findUnique({
            where: {id: personalId},
        })

        if(!personal)
            return {error: "Personal not found"};
        const UpdatedPersonal = await prisma.personal.update({
            where: {id: personalId},
            data: {
                name: name,
                description: description
            }
        })

        return { success: true, UpdatedPersonal };

    } catch (error) {
        console.error("Error updating phone numbers: ", error);
        return {error: "Failed to update phone numbers"};
    } 
})