import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import '../global.css'

const queryClient = new QueryClient()

const NavigationGuard = () => {
  const router = useRouter()
  const segments = useSegments()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)')
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(main)')
    }
  }, [isLoading, isAuthenticated, segments])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <Slot />
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationGuard />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default RootLayout