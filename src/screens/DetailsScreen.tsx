import { RouteProp } from '@react-navigation/native';
import React, { FC, useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ThemeContext from '../context/DarkMode';
import { RootStackParamList } from '../types';
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
}





const DetailsScreen: FC<Props> = ({ route }) => {
  const theme = useContext(ThemeContext);
  const { item } = route.params;
  const dynamicStyles = {
    container: {
      backgroundColor: theme?.isDark ? '#121212' : '#F8F9FA',
    },
    card: {
      backgroundColor: theme?.isDark ? '#FFF' : "#1E1E1E"
    },
    text: {
      color: theme?.isDark ? "#FFFFFF" : '#333333',
    },
    description: {
      color: theme?.isDark ? "#B0B0B0" : '#666',
    }
  };
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Image style={styles.cardImage} source={{ uri: item.thumbnail }} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, dynamicStyles.text]}>{item.title}</Text>
        <Text style={[styles.cardDescription, dynamicStyles.description]}>{item.description}</Text>
        <View style={styles.detailsFooter}>
          <Text style={styles.cardPrice}>price: ${item.price}</Text>
          <Text style={styles.badge}>rating: {item.rating}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: '60%',
    resizeMode: "contain"
  },
  cardTitle: {
    fontSize: 24, fontWeight: 'bold',
    marginBottom: 8
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: 'green'
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 8
  },
  cardContent: {
    width: '100%',
    padding: 16
  },
  detailsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  badge: {
    backgroundColor: '#ff2a00ff',
    padding: 8,
    borderRadius: 8,
    color: "#fff",
    fontWeight: 'bold'
  }


})
export default DetailsScreen
