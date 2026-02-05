import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import '../global.css'

const RootLayout = () => {
  return (
    <>
      <StatusBar style='dark' />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  )
}

export default RootLayout