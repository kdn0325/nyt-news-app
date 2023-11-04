import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {CountryOptionList} from '../../data';
import {RootState} from '../../redux/store/reducer';
import {useSelector} from 'react-redux';
import {setGlocations} from '../../redux/slices/articles';
import {useAppDispatch} from '../../redux/store';
import {ICountryOptionList} from '../../types';
import CountryListItem from '../CountryListItem/CountryListItem';

const CountryOption = ({
  handleCountrySelection,
}: {
  handleCountrySelection: (selectedCountries: string[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const glocations = useSelector(
    (state: RootState) => state.articles.glocations,
  );
  useEffect(() => {
    setSelectedCountries(glocations);
  }, [glocations]);

  const countryItem = useCallback(
    ({item}: {item: ICountryOptionList}) => {
      const isSelected = selectedCountries.includes(item.name);
      const handleChecked = (name: string) => {
        if (selectedCountries.includes(name)) {
          const updatedCountries = selectedCountries.filter(
            filter => filter !== name,
          );
          setSelectedCountries(updatedCountries);

          handleCountrySelection(updatedCountries);
          dispatch(setGlocations(updatedCountries));
        } else {
          const updatedCountries = [...selectedCountries, name];
          setSelectedCountries(updatedCountries);

          handleCountrySelection(updatedCountries);
          dispatch(setGlocations(updatedCountries));
        }
      };

      return (
        <CountryListItem
          item={item}
          isSelected={isSelected}
          handleChecked={handleChecked}
        />
      );
    },
    [dispatch, handleCountrySelection, selectedCountries],
  );

  return (
    <View style={styles.countryOptionContainer}>
      <FlatList
        data={CountryOptionList}
        keyExtractor={item => item.id.toString()}
        renderItem={countryItem}
        numColumns={5}
      />
    </View>
  );
};

export default CountryOption;

const styles = StyleSheet.create({
  countryOptionContainer: {},

  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
