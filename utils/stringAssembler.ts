import { Prisma } from "@prisma/client";

type LocationDB = Prisma.LocationGetPayload<{}>;
export function locationToString(location: LocationDB): string {
  let locationString = location.addressLine1;
  if (location.addressLine2) {
    locationString += `, ${location.addressLine2}`;
  }
  locationString += `, ${location.city}, ${location.state} ${location.postalCode}`;
  return locationString;
}

type PhoneNumberDB = Prisma.PhoneNumberGetPayload<{}>;
export function phoneNumberToString(phoneNumber: PhoneNumberDB): string {
  let phoneNumberString = "";
  if (phoneNumber.type) {
    phoneNumberString += `${phoneNumber.type}: `;
  }
  phoneNumberString += phoneNumber.number;
  if (phoneNumber.personalId) {
    phoneNumberString += `Fix API call to add personal`; //` (${phoneNumber.personalId})`;
  }
  return phoneNumberString;
}
