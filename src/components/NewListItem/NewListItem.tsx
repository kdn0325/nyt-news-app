import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {toggleScrap} from '../../redux/slices/scrap';
import {useAppDispatch} from '../../redux/store';
import {RootState} from '../../redux/store/reducer';
import {IArticle} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import useDateFormatter from '../../hook/useDateFormat';
import useTextTruncation from '../../hook/useTextTruncation';

const NewListItem = ({item}: {item: IArticle}) => {
  const dispatch = useAppDispatch();

  const {formatDateToCustomString} = useDateFormatter();
  const truncateText = useTextTruncation(10);
  const scraps = useSelector((state: RootState) => state.scraps.scraps);
  const isScrapped = scraps.some(
    (scrapItem: IArticle) => scrapItem._id === item._id,
  );

  const {source, byline, pub_date} = item;

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Bookmark'>>();

  /* 해당 화면에서 스크랩 토글시 추가/제거 */
  const handleToggleScrap = () => {
    if (!isScrapped) {
      /* 시스템 Alert 생성 */
      Alert.alert('스크랩 완료');
      navigation.navigate('Bookmark');
    }
    dispatch(toggleScrap(item));
  };

  return (
    <TouchableOpacity
      style={styles.flatContainer}
      key={item._id}
      /* 리스트의 기사 클릭시 해당하는 기사 웹페이지 */
      onPress={() => Linking.openURL(item.web_url)}>
      <View style={styles.headlineContainer}>
        <Text numberOfLines={2} style={styles.headline}>
          {item.headline.main}
        </Text>
        <Pressable onPress={handleToggleScrap} style={styles.scrapButton}>
          <Image
            source={
              isScrapped
                ? require('../../assets/image/star-fill.png')
                : require('../../assets/image/star.png')
            }
            style={styles.star}
          />
        </Pressable>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.source}>{truncateText(source)}</Text>
        <Text style={styles.byline}>{truncateText(byline.original)}</Text>
        <Text style={styles.data}>{formatDateToCustomString(pub_date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewListItem;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flatContainer: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
    height: 104,
  },
  headlineContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    flex: 2,
    color: '#000',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemList: {
    paddingHorizontal: 20,
  },

  headline: {
    fontSize: 18,
    flex: 5,
    fontWeight: '600',
  },
  scrapButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  star: {
    width: 16,
    height: 16,
  },
  byline: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
  },
  data: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6D6D6D',
  },
  source: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
  },
});
