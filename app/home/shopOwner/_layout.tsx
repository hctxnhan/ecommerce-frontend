import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Manage Shop',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />

      <Tabs.Screen
        name="ManageProduct"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="ManageVoucher"
        options={{
          title: 'Vouchers',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="ManageOrder"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          )
        }}
      />
    </Tabs>
  );
}
