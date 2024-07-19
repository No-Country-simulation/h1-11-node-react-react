import { Sex } from "@prisma/client";

export interface UserResponse {
  id: string;
  name: string;
  lastName: string;
  email: string;
  dni: string;
  address: string;
  phone: string;
  province: string;
  location: string;
  sex: Sex;
  isValidateEmail: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  doctor?: any;
  patient?: any;
}
