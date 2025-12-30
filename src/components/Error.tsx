import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FallbackComponentProps } from 'react-native-error-boundary';

export const ErrorComponent: React.FC<FallbackComponentProps> = ({
  error,
  resetError
}) => {
  console.log(error, "errrrror");

  return (
    <View style={styles.container} >
      <Text style={styles.errorMessage}>Something went wrong</Text>
      <Text style={styles.errorMessage}>{error.message}</Text>
      <Image style={styles.image} source={require('../../assets/error.webp')} />
      <Text onPress={resetError} style={styles.tryAgain}>Try Again</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    color: 'red',
    fontSize: 24, marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  tryAgain: {
    marginTop: 16,
    color: 'blue',
    fontSize: 18
  }
  ,
  image: {
    width: 400,
    height: 400,
    marginTop: 16,
    resizeMode: "contain"
  }
})
export default Error
