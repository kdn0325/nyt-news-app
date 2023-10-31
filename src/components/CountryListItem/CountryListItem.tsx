import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ICountryOptionList} from '../../types';

const CountryListItem = ({
  item,
  isSelected,
  handleChecked,
}: {
  item: ICountryOptionList;
  isSelected: boolean;
  handleChecked: (name: string) => void;
}) => {
  /* isSelected로 클릭전 상태 , 클릭 후 상태 */
  return (
    <View
      style={
        isSelected
          ? [styles.countryContainer, styles.selectedCountryContainer]
          : styles.countryContainer
      }>
      <TouchableOpacity onPress={() => handleChecked(item.name)}>
        <Text
          style={isSelected ? styles.selectedcountryText : styles.countryText}>
          {item.desc}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CountryListItem;

const styles = StyleSheet.create({
  countryContainer: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderStyle: 'solid',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 4,
  },
  selectedCountryContainer: {
    backgroundColor: '#3478F6',
    color: '#fff',
  },

  countryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6D6D6D',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 6,
  },

  selectedcountryText: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 6,
  },
});
