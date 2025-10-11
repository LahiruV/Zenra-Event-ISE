export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  password: string
  phone: string
  dob: string
}

export interface AdminLoginDto {
  email: string
  password: string
}

export interface AdminRegisterDto {
  name: string
  email: string
  password: string
  adminCode: string
}

export interface Client {
  _id: string
  name: string
  email: string
  dob: string
  phone: string
  isAdmin?: boolean
}

export interface Booking {
  _id?: string
  userId: string
  eventId: string
  eventName: string
  eventPrice: string
  date: string
  name: string
  email: string
  phone: string
  specialNeed: string
  createdAt?: string
  isPending: boolean
}

export interface BookingDto {
  userId: string
  eventId: string
  eventName: string
  eventPrice: string
  date: string
  name: string
  email: string
  phone: string
  specialNeed: string
  isPending: boolean
}

export interface UpdateBookingStatusDto {
  isPending: boolean
}

export interface UpdateBookingDto {
  date?: string
  name?: string
  email?: string
  phone?: string
  specialNeed?: string
  isPending?: boolean
}

export interface PhotographerDto {
  name: string
  email: string
  phone: string
  portfolioLink: string
}
