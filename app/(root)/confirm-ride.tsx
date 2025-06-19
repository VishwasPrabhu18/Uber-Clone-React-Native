import CustomeButton from '@/components/CustomeButton'
import DriverCard from '@/components/DriverCard'
import RideLayout from '@/components/RideLayout'
import { useDriverStore } from '@/store'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const ConfirmRide = () => {

  const {
    drivers,
    selectedDriver,
    setSelectedDriver
  } = useDriverStore();

  return (
    <RideLayout title='Choose a Driver' snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => <DriverCard item={item} selected={selectedDriver!} setSelected={() => setSelectedDriver(item.id)} />}
        ListFooterComponent={() => (
          <View className='mx-5 mt-10'>
            <CustomeButton
              title='Select Ride'
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  )
}

export default ConfirmRide