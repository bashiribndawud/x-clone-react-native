import { useSignOut } from '@/hooks/useSignOut';
import { Feather } from '@expo/vector-icons';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const SignOutButton = () => {
    const { handleSignOut } = useSignOut();
    return (
      <TouchableOpacity
        onPress={handleSignOut}
      >
        <Feather name="log-out" size={30} color={'#E0245E'} />
      </TouchableOpacity>
    )

}

export default SignOutButton;