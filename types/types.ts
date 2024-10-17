interface Resource {
    id: number;
    name: string;
    description: string;
    locations: {
      id: number;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      longitude: number;
      latitude: number;
      resourceId: number;
    }[];
    Demo: {
      id: number;
      name: string;
    }[];
    phoneNumbers: {
      id: number;
      number: string;
      type: string;
    }[];
    languages: {
      id: number;
      name: string;
    }[];
  }
  