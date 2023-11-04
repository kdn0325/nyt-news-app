import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleButton from '../Button/Button';

import {RootStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

/* 스크랩된 기사가 없으면 Nodata */
const Nodata = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <View style={styles.emptyMessageContainer}>
      <Image
        style={styles.bookmarkImage}
        source={require('../../assets/image/bookmark.png')}
      />
      <Text style={styles.emptyMessageText}>저장된 스크랩이 없습니다.</Text>
      <Pressable
        style={styles.pressButton}
        onPress={() => navigation.navigate('Home')}>
        <TitleButton title={'스크랩 하러 가기'} />
      </Pressable>
    </View>
  );
};

export default Nodata;

const styles = StyleSheet.create({
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageText: {
    fontSize: 18,
    marginTop: 8,
    color: 'gray',
    fontWeight: '600',
  },
  pressButton: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bookmarkImage: {
    width: 36,
    height: 36,
  },
});
