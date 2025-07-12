import SignOutButton from '@/components/SignOutButton';
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
      <SafeAreaView  className='flex-1'>
        <SignOutButton />
      </SafeAreaView>
    )

}

export default HomeScreen;