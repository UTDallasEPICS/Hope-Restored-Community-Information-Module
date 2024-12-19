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
  phoneNumberString += phoneNumber.number;
  if (phoneNumber.name) {
    phoneNumberString += ` (${phoneNumber.name})`;
  }
  return phoneNumberString;
}

type EmailDB = Prisma.EmailGetPayload<{}>;
export function emailToString(email: EmailDB): string {
  let emailString = email.email;
  if (email.name) {
    emailString += ` (${email.name})`;
  }
  return emailString;
}
