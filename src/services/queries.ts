import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from './api'
import type { LoginDto, RegisterDto, AdminLoginDto, AdminRegisterDto, UpdateBookingStatusDto, UpdateBookingDto, BookingDto } from './types'

// Auth queries
export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (credentials: LoginDto) => api.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-login'] })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RegisterDto) => api.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-register'] })
    },
  })
}

export const useAdminLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (credentials: AdminLoginDto) => api.adminLogin(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-login'] })
    },
  })
}

export const useAdminRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AdminRegisterDto) => api.adminRegister(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-register'] })
    },
  })
}

// User queries

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: api.getUser,
    retry: false,
  })
}

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: api.getAllClients,
  })
}

export const useAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: api.getAllAdmins,
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['admins'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RegisterDto> }) => api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['admins'] })
    },
  })
}

// Booking queries

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: BookingDto) => api.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: api.getAllBookings,
  })
}

export const getUserBookings = (userId: string) => {
  return useQuery({
    queryKey: ['user-bookings', userId],
    queryFn: () => api.getUserBookings(userId),
    enabled: !!userId,
  })
}

export const useDeleteBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] })
    },
  })
}

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingStatusDto }) => api.updateBookingStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingDto }) => api.updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] })
    },
  })
}

// Mail queries

export const useSendMail = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { to: string; subject: string; text: string; html?: string }) => api.sendEmail(data.to, data.subject, data.text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['send-mail'] })
    },
  })
}

// Photographer queries

export const usePhotographers = () => {
  return useQuery({
    queryKey: ['photographers'],
    queryFn: api.getAllPhotographers,
  })
}

export const useAddPhotographer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; email: string; phone: string; portfolioLink: string }) => api.createPhotographer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photographers-create'] })
    },
  })
}

export const useUpdatePhotographer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: string; name: string; email: string; phone: string; portfolioLink: string }) => api.updatePhotographer(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photographers-update'] })
    },
  })
}

export const useDeletePhotographer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.deletePhotographer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photographers-delete'] })
    },
  })
}
