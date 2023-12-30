import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Button = ({title}: {title: string}) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#3478F6',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
