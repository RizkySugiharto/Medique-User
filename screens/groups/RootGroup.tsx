import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';
import HomeScreen from '../HomeScreen';
import ActivityScreen from '../ActivityScreen';
import SessionStorage from 'react-native-session-storage';
import FavoriteScreen from '../FavoriteScreen';
import ProfileScreen from '../ProfileScreen';
import Activity from '../ActivityScreen';

function TabBar({ state, descriptors, navigation}: BottomTabBarProps) {
  const navbarStatusView = SessionStorage.getItem('@navbar_status_view')

  return (
    <>
      {navbarStatusView && 
      <View style={{
        backgroundColor: Colors.secondary,
        borderColor: Colors.primary,
        overflow: 'hidden',
        borderWidth: 2,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingBottom: 46,
        position: 'absolute',
        bottom: 70,
        left: 24,
        right: 24,
      }}>
        {navbarStatusView}
      </View>
      }
      <View style={[styles.tabBar]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icons = [[
              require('../../assets/img/ic_tab_home_inactive.png'),
              require('../../assets/img/ic_tab_home_active.png'),
            ],[
              require('../../assets/img/ic_tab_favorite_inactive.png'),
              require('../../assets/img/ic_tab_favorite_active.png'),
            ],[
              require('../../assets/img/ic_tab_activity_inactive.png'),
              require('../../assets/img/ic_tab_activity_active.png'),
            ],[
              require('../../assets/img/ic_tab_profile_inactive.png'),
              require('../../assets/img/ic_tab_profile_active.png'),
            ],
          ]
          
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.85}
                style={[styles.tabBarButton, isFocused && styles.tabBarButtonOnActive]}>
                  <Image source={icons[index][isFocused ? 1 : 0]} />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    </>
  )
}

export default (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Favorite' component={FavoriteScreen}/>
      <Tab.Screen name='Activity' component={Activity}/>
      <Tab.Screen name='Profile' component={ProfileScreen}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    padding: 4,
    borderRadius: 48,
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  tabBarButton: {
    backgroundColor: 'transparent',
    borderRadius: 48,
    padding: 26,
  },
  tabBarButtonOnActive: {
    backgroundColor: Colors.secondary,
  }
})