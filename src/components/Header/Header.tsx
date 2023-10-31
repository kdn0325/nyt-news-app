import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import CountryOption from '../Country/Country';
import {useSelector} from 'react-redux';
import {
  fetchDataAsync,
  resetData,
  setHeadline,
  setPeriod,
} from '../../redux/slices/articles';
import {useAppDispatch} from '../../redux/store';
import Modal from 'react-native-modal';
import {RootState} from '../../redux/store/reducer';
import TitleButton from '../Button/Button';
import DatePicker from 'react-native-date-picker';
import useDateFormatter from '../../hook/useDateFormat';
import {CountryOptionList} from '../../data';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from '@reduxjs/toolkit';
import useTextTruncation from '../../hook/useTextTruncation';

const Header = () => {
  // yyyy.mm.dd 형식
  const {getFormattedDate} = useDateFormatter();

  const truncateText = useTextTruncation(5);

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDateText, setSelectedDateText] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useAppDispatch();
  const headline = useSelector((state: RootState) => state.articles.headline);

  const page = useSelector((state: RootState) => state.articles.page);

  const updateHeadline = (newHeadline: string) => {
    dispatch(setHeadline(newHeadline));
  };
  const updatePeriod = (newPeriod: string) => {
    dispatch(setPeriod(newPeriod));
  };

  /* 적용 데이터로 Refresh */
  const applyFilter = () => {
    /* 헤드라인 전달 */
    dispatch(setHeadline(headline));
    /* 날짜 포맷팅 후 전ㄴ달 */
    dispatch(setPeriod(getFormattedDate(date)));

    /* 데이터 Refresh */
    dispatch(resetData());

    setModalVisible(!isModalVisible);
    dispatch(
      fetchDataAsync({
        headline,
        period: getFormattedDate(date),
        glocations: selectedCountries.length > 0 ? selectedCountries : null,
        page,
      }),
    );
  };

  /* 나라 선택 */
  const handleCountrySelection = (countries: string[]) => {
    setSelectedCountries(countries);
  };

  /* 모달 닫기 */
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const select = CountryOptionList.filter(country =>
    selectedCountries.includes(country.name),
  ).map(country => country.desc);

  /* 초기 데이터 외 - 총 데이터 -1개 */
  let countryResult =
    select.length === 0
      ? '전체 국가'
      : select.length === 1
      ? select[0]
      : `${select[0]} 외 ${select.length - 1}개`;

  const selectedStyle = (isSelected: string | boolean) =>
    isSelected ? styles.selectedModal : styles.headerModal;
  const selectedTextStyle = (isSelected: string | boolean) =>
    isSelected ? styles.selectTitle : styles.headerTitle;

  return (
    <View>
      <View style={styles.headerContainer}>
        <View>
          <View style={styles.headerTextContainer}>
            <Pressable onPress={toggleModal} style={selectedStyle(headline)}>
              <Image
                source={
                  headline
                    ? require('../../assets/image/search-check.png')
                    : require('../../assets/image/search.png')
                }
              />
              <Text style={selectedTextStyle(headline)}>
                {/* 길어지면 말줄임표 적용 */}
                {headline ? truncateText(headline) : '전체 헤드라인'}
              </Text>
            </Pressable>
            <Pressable
              onPress={toggleModal}
              style={selectedStyle(selectedDateText)}>
              <Image
                source={
                  selectedDateText
                    ? require('../../assets/image/calendar-check.png')
                    : require('../../assets/image/calendar.png')
                }
              />
              <Text style={selectedTextStyle(selectedDateText)}>
                {selectedDateText ? selectedDateText : '전체 날짜'}
              </Text>
            </Pressable>
            <Pressable
              onPress={toggleModal}
              style={selectedStyle(select.length > 0)}>
              <Text style={selectedTextStyle(select.length > 0)}>
                {countryResult}
              </Text>
            </Pressable>
          </View>
        </View>
        {/* 필터 모달 생성 */}
        <Modal
          isVisible={isModalVisible}
          style={styles.modal}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.filterView}>
              <Text style={styles.pickTitle}>헤드라인</Text>
              <TextInput
                style={styles.headline}
                placeholder="검색하실 헤드라인을 입력해주세요."
                value={headline}
                onChangeText={updateHeadline}
              />
            </View>

            <View style={styles.filterView}>
              <Text style={styles.pickTitle}>날짜</Text>
              {/* DatePicker 생성 */}
              <DatePicker
                modal
                open={open}
                mode={'date'}
                date={date}
                locale="ko"
                onConfirm={selectDate => {
                  setOpen(false);
                  setDate(selectDate);

                  setSelectedDateText(getFormattedDate(selectDate));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setOpen(true)}>
                <View pointerEvents="none">
                  <TextInput
                    style={styles.dateSelect}
                    editable={false}
                    placeholder="날짜를 선택해주세요."
                    onChangeText={updatePeriod}
                    onFocus={() => setOpen(true)}
                    value={selectedDateText}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.filterView}>
              <Text style={styles.pickTitle}>국가</Text>
              {/* 국가 선택지 체크 박스 */}
              <CountryOption handleCountrySelection={handleCountrySelection} />
            </View>
            <Pressable style={styles.pressButton} onPress={() => applyFilter()}>
              <TitleButton title={'필터 적용하기'} />
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    height: 60,

    paddingHorizontal: 13,
  },
  headerTextContainer: {
    height: '100%',
    flexDirection: 'row',

    alignItems: 'center',
  },
  selectedModal: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3478F6',
    borderStyle: 'solid',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    marginRight: 7,
  },
  headerModal: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderStyle: 'solid',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    marginRight: 7,
  },

  selectTitle: {
    color: '#3478F6',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 4,
  },
  headerTitle: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '400',
    color: '#6D6D6D',
  },

  modal: {},
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
  },
  headline: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderStyle: 'solid',
    borderRadius: 8,
  },
  datePicker: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderStyle: 'solid',
    borderRadius: 8,
  },
  dateSelect: {
    width: '100%',
  },
  filterView: {
    marginBottom: 40,
  },
  pickTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pressButton: {
    width: '100%',
  },
});
