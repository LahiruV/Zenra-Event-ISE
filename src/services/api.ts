import { CreateFeedbackDto, Feedback, GetFeedbacksResponse, GetInquiriesResponse, Inquiry, UpdateInquiryDto } from './types'
import type { LoginDto, RegisterDto, AdminLoginDto, AdminRegisterDto } from './types'
import { API_URL } from './url'

// // Feedback API calls
export async function getFeedbacks(): Promise<GetFeedbacksResponse> {
  const response = await fetch(`${API_URL}/feedback`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch feedbacks')
  }

  return response.json()
}

export async function createFeedback(feedback: CreateFeedbackDto): Promise<Feedback> {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(feedback),
  })

  if (!response.ok) {
    throw new Error('Failed to create feedback')
  }

  return response.json()
}

export async function updateFeedback(id: string, feedback: Partial<CreateFeedbackDto>): Promise<Feedback> {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(feedback),
  })

  if (!response.ok) {
    throw new Error('Failed to update feedback')
  }

  return response.json()
}

export async function deleteFeedback(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete feedback')
  }
}

// Inquiry API calls
export async function getInquiries(): Promise<GetInquiriesResponse> {
  const response = await fetch(`${API_URL}/inquiries`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch inquiries')
  }

  return response.json()
}

export async function getInquiry(id: string): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch inquiry')
  }

  return response.json()
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(inquiry),
  })

  if (!response.ok) {
    throw new Error('Failed to create inquiry')
  }

  return response.json()
}

export async function updateInquiry(id: string, inquiry: UpdateInquiryDto): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(inquiry),
  })

  if (!response.ok) {
    throw new Error('Failed to update inquiry')
  }

  return response.json()
}

export async function deleteInquiry(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete inquiry')
  }
}

export async function completeInquiry(id: string): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries/${id}/complete`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to complete inquiry')
  }

  return response.json()
}

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

export async function getUser(): Promise<{ token: string }> {
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
