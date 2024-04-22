import { RedirectRoleHome } from '@/components/__custom__/Auth';
import { UserRole } from '@/types';
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
    <RedirectRoleHome role={UserRole.ADMIN}>
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
          name="request"
          options={{
            title: 'Requests',
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
    </RedirectRoleHome>
  );
}
