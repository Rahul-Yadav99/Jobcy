import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { useRole } from '@/hooks/useRole'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../global.css'

const queryClient = new QueryClient()

const NavigationGuard = () => {
  const router = useRouter()
  const segments = useSegments()
  const { isAuthenticated, isLoading } = useAuth()
  const { role } = useRole();

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
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationGuard />
          <StatusBar style="dark" />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout