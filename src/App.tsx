import react, { useState, useEffect } from 'react'
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { setupPlayer, addTracks } from '../musicPlayerServices'
import Musicplayer from './screens/Musicplayer';


function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTracks()
    }
    setIsPlayerReady(true)
  }

  useEffect(() => {
    setup()


  }, [])

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Musicplayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});

export default App;
