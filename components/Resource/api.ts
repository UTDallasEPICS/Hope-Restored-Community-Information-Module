export interface Resource {
  id: number;
  name: string;
  description: string;
  services: string[];
  demographics: string[];
  phoneNumbers?: string[];
  emails?: string[];
  addresses?: string[];
}

// TODO
