import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { useRole } from '@/hooks/useRole'
import { primaryColor } from '@/utils/colors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import '../global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

const NavigationGuard = () => {
  const router = useRouter()
  const segments = useSegments()
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const { role, loading: isRoleLoading } = useRole();

  const isLoading = isAuthLoading || (isAuthenticated && isRoleLoading && !role);

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = (segments as any).includes('(auth)') || (segments as any).includes('sign-up');

    if (!isAuthenticated) {
      if (!inAuthGroup) {
        router.replace('/(auth)')
      }
    } else {
      if (inAuthGroup) {
        if (role === 'student') {
          router.replace('/(student)')
        } else if (role === 'recruiter') {
          router.replace('/(recruiter)')
        }
      }
    }
  }, [isLoading, isAuthenticated, role, segments])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    )
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationGuard />
          <StatusBar style="dark" />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout
