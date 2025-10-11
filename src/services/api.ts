import type { LoginDto, RegisterDto, AdminLoginDto, AdminRegisterDto, BookingDto, UpdateBookingDto, UpdateBookingStatusDto, PhotographerDto } from './types'
import { API_URL } from './url'

// Authentication APIs

export async function login(credentials: LoginDto): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  return response.json()
}

export async function register(data: RegisterDto): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Registration failed')
  }
  return response.json()
}

export async function adminLogin(credentials: AdminLoginDto): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    throw new Error('Invalid admin credentials')
  }
  return response.json()
}

export async function adminRegister(data: AdminRegisterDto): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Admin registration failed')
  }

  return response.json()
}

// User Management APIs

export async function getUser(): Promise<any> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export async function getAllClients(): Promise<any[]> {
  const response = await fetch(`${API_URL}/auth/clients`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  return response.json()
}

export async function getAllAdmins(): Promise<any[]> {
  const response = await fetch(`${API_URL}/auth/admins`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch admins')
  }
  return response.json()
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/auth/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}

export async function updateUser(id: string, data: Partial<RegisterDto> & { isAdmin?: boolean }): Promise<void> {
  const response = await fetch(`${API_URL}/auth/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.json()
}

// Booking Management APIs

export async function createBooking(data: BookingDto): Promise<any> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create booking')
  }
  return response.json()
}

export async function getUserBookings(userId: string): Promise<any[]> {
  const response = await fetch(`${API_URL}/bookings/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch user bookings')
  }
  return response.json()
}

export async function getAllBookings(): Promise<any[]> {
  const response = await fetch(`${API_URL}/bookings`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch bookings')
  }
  return response.json()
}

export async function updateBooking(id: string, data: UpdateBookingDto): Promise<any> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update booking')
  }
  return response.json()
}

export async function updateBookingStatus(id: string, data: UpdateBookingStatusDto): Promise<any> {
  const response = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update booking status')
  }
  return response.json()
}

export async function deleteBooking(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to delete booking')
  }
}

// Email Service API

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const response = await fetch(`${API_URL}/mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: to, content: text, header: subject }),
  })
  if (!response.ok) {
    throw new Error('Failed to send email')
  }
}

// Photographer Management APIs

export async function createPhotographer(data: PhotographerDto): Promise<any> {
  const response = await fetch(`${API_URL}/photographers/register`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create booking')
  }
  return response.json()
}

export async function updatePhotographer(id: string, data: Partial<PhotographerDto>): Promise<any> {
  const response = await fetch(`${API_URL}/photographers/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update photographer')
  }
  return response.json()
}

export async function getAllPhotographers(): Promise<any[]> {
  const response = await fetch(`${API_URL}/photographers`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch photographers')
  }
  return response.json()
}

export async function deletePhotographer(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/photographers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to delete photographer')
  }
}
