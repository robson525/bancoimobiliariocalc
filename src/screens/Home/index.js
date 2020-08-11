import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import config from '../../config';

const Stack = createStackNavigator();

// eslint-disable-next-line react/prop-types
function HomeScreen({ navigation: { navigate } }) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>
        Home
      </Text>

      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => {
            // navigate('PlayerScreen', { podcast: item });
          }}
        >
          <Text>
            Podcast: 0
            {item}
          </Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}

function HomeTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Home.name} component={HomeScreen} options={{ title: `${config.Screen.Home.title}` }} />
    </Stack.Navigator>
  );
}

export default HomeTabStack;
