'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { sendAuthEmail, verifyAuthEmail, authenticate, logout as sdkLogout } from '@/lib/storentiaClient'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  authenticated: boolean
  loading: boolean
  sendEmail: (email: string) => Promise<{ success: boolean; error?: string }>
  verifyEmail: (email: string, code: string) => Promise<{ success: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const customerId = localStorage.getItem('customer-id')
    const customerEmail = localStorage.getItem('customer-email')
    if (customerId && customerEmail) {
      setUser({ id: customerId, email: customerEmail })
      setAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [])

  const sendEmail = async (email: string) => {
    try {
      const result = await sendAuthEmail(email)
      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to send email'
      return { success: false, error: errorMsg }
    }
  }

  const verifyEmail = async (email: string, code: string) => {
    try {
      const result = await verifyAuthEmail(email, code)
      if (result.success && result.customer) {
        setUser({ id: result.customer.id, email: result.customer.email, name: result.customer.name })
        setAuthenticated(true)
      }
      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Verification failed'
      return { success: false, error: errorMsg }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await authenticate(email, password)
      if (result.success && result.user) {
        setUser({ id: result.user.id, email: result.user.email, name: result.user.name })
        setAuthenticated(true)
      }
      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed'
      return { success: false, error: errorMsg }
    }
  }

  const logout = () => {
    sdkLogout()
    setUser(null)
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, authenticated, loading, sendEmail, verifyEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
