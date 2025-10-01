import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from './api'
import type { CreateFeedbackDto, UpdateInquiryDto, LoginDto, RegisterDto, AdminLoginDto, AdminRegisterDto } from './types'

// Auth queries
export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (credentials: LoginDto) => api.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RegisterDto) => api.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useAdminLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (credentials: AdminLoginDto) => api.adminLogin(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useAdminRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AdminRegisterDto) => api.adminRegister(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

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

// // Feedback queries
export const useFeedbacks = () => {
  return useQuery({
    queryKey: ['feedbacks'],
    queryFn: api.getFeedbacks,
  })
}

export const useCreateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (feedback: CreateFeedbackDto) => api.createFeedback(feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    },
  })
}

// Inquiry queries
export const useInquiries = () => {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: api.getInquiries,
  })
}

export const useCreateInquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (inquiry: any) => api.createInquiry(inquiry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
  })
}

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInquiryDto }) =>
      api.updateInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
  })
}

export const useCompleteInquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.completeInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
  })
}

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
  })
}

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    },
  })
}