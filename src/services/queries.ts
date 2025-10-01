import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from './api'
import type { LoginDto, RegisterDto, AdminLoginDto, AdminRegisterDto } from './types'

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