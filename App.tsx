import {Image, Platform} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home/Home';
import Bookmark from './src/screens/Bookmark/Bookmark';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './src/redux/store/index';

const Tab = createBottomTabNavigator();

/* 루트 네비게이션 타입 */
export type RootStackParamList = {
  Home: undefined;
  Bookmark: undefined;
};

/* 모바일뷰 */

const renderTabBarIcon = (focused: boolean, routeName: string) => {
  const homeIcon = focused
    ? require('./src/assets/image/home_fill.png')
    : require('./src/assets/image/home.png');
  const bookmarkIcon = focused
    ? require('./src/assets/image/bookmark_fill.png')
    : require('./src/assets/image/bookmark.png');

  let iconName;
  if (routeName === 'Home') {
    iconName = homeIcon;
  } else if (routeName === 'Bookmark') {
    iconName = bookmarkIcon;
  }

  return <Image source={iconName} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#6D6D6D',
            tabBarLabelStyle: {
              // marginTop: 9,
            },
            tabBarStyle: {
              ...Platform.select({
                ios: {
                  backgroundColor: '#000',
                  height: 95,
                },
                android: {
                  backgroundColor: '#000',
                  paddingVertical: 10,
                  height: 70,
                },
              }),
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },

            tabBarIcon: ({focused}) => renderTabBarIcon(focused, route.name),
          })}>
          {/* 앱 시작시 처음 화면 */}
          <Tab.Screen name="Home" component={Home} options={{title: '홈'}} />
          <Tab.Screen
            name="Bookmark"
            component={Bookmark}
            options={{title: '스크랩'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
