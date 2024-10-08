import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

// Initialize the Prisma client
const prisma = new PrismaClient()

// Define TypeScript interfaces for request body
interface CreateResourceBody {
  name: string
  description: string
  eligibility?: boolean
  cost?: number
  // Personal entity with multiple phone numbers
  personal?: {
    name: string
    description: string
    phoneNumbers: {
      number: number
      type: string
    }[]
  }
  // Direct phone number attached to the resource
  phoneNumber?: {
    number: number
    type: string
  }
  externalLink?: {
    name: string
    link: string
  }
  language?: {
    name: string
  }
  tags?: {
    name: string
  }
  groups?: {
    name: string
  }
  demographics?: {
    name: string
  }[]
  locations?: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    longitude: number
    latitude: number
  }[]
}


// The API handler function

export default defineEventHandler(async(event: any) => {
  const body = await readBody<CreateResourceBody>(event)
  const { name, description } = body

  if (!name || !description) {
    return { error: 'Name and description are required fields' }
  }

  try {
    const resource = await prisma.resources.create({
      data: {
        name,
        description,
        eligibility: body.eligibility ?? false,
        cost: body.cost ?? 0,
        // Handle personal and phoneNumbers creation logic
          phoneNumber: body.phoneNumber
          ? {
              create: {
                number: body.phoneNumber.number,
                type: body.phoneNumber.type,
                // Include personal details, since the field is required
                personal: body.personal
                  ? {
                      create: {
                        name: body.personal.name,
                        description: body.personal.description,
                      },
                    }
                  : {
                      // Provide default or fallback data for personal if it's mandatory
                      create: {
                        name: "Unknown", // Or any fallback value
                        description: "No description provided",
                      },
                    },
              },
            }
          : undefined,
        
        externalLink: body.externalLink
          ? {
              create: {
                name: body.externalLink.name,
                link: body.externalLink.link,
              },
            }
          : undefined,
        language: body.language
          ? {
              create: {
                name: body.language.name,
              },
            }
          : undefined,
        tags: body.tags
          ? {
              create: {
                name: body.tags.name,
              },
            }
          : undefined,
        groups: body.groups
          ? {
              create: {
                name: body.groups.name,
              },
            }
          : undefined,
        Demo: body.demographics
          ? {
              create: body.demographics.map((demographic) => ({
                name: demographic.name,
              })),
            }
          : undefined,
        locations: body.locations
          ? {
              create: body.locations.map((location) => ({
                addressLine1: location.addressLine1,
                addressLine2: location.addressLine2 ?? "",
                city: location.city,
                state: location.state,
                postalCode: location.postalCode,
                country: location.country,
                longitude: location.longitude,
                latitude: location.latitude,
              })),
            }
          : undefined,
      },
    })
    
    return { success: true, resource }
  } catch (error) {
    console.error('Error creating resource:', error)
    return { error: 'Failed to create resource' }
  }

})