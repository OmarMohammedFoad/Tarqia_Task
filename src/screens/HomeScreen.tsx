import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThemeContext from '../context/DarkMode';
import { getData, storeData } from '../services/storage';
import { PostItem, RootStackParamList } from '../types';




type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: NavigationProp;
}

const HomeScreen = ({ navigation }: Props) => {
  const theme = useContext(ThemeContext);
  const dynamicStyles = {
    listContainer: {
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


  const [post, setPost] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const KEY_STORAGE_POSTS = "stored_posts";


  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const storedPosts = await getData(KEY_STORAGE_POSTS);
      console.log(storeData, "store data");

      if (storedPosts) {


        const parsedPosts: PostItem[] = JSON.parse(storedPosts);
        console.log(parsedPosts, "data!!!!");
        console.log("CACHEDDD!");

        setPost(parsedPosts);
        setLoading(false);
        return;
      }

      const { data } = await axios.get<{ products: PostItem[] }>('https://dummyjson.com/products');




      const mappedPosts: PostItem[] = data.products.map(item => ({
        id: item.id,
        title: item.title,
        url: item.url,
        thumbnail: item.thumbnail,
        description: item.description,
        rating: item.rating,
        price: item.price,
      }));


      setPost(mappedPosts);
      setLoading(false);
      storeData(KEY_STORAGE_POSTS, JSON.stringify(mappedPosts));

    } catch (error) {
      console.log(error);
      setError('There was an error fetching the posts,Please try again later.');
      setLoading(false);
      throw Error("There was an error fetching the posts,Please try again later")
    }
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = useCallback(({ item }: { item: PostItem }) => (
    <TouchableOpacity
      style={[styles.card, dynamicStyles.card]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, dynamicStyles.text]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.cardDescription, dynamicStyles.description]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.tag}>
          <Text style={[styles.tagText, dynamicStyles.text]}>View Details</Text>
        </View>
      </View>
    </TouchableOpacity>
  ), [post]);


  if (loading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#ff2a00ff" />
      <Text>Loading ...</Text>
    </View>
    )
  }

  if (error) {
    return (<View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Image source={require("../../assets/error.webp")} style={styles.errorImage} />
    </View>
    )
  }

  return (
    <FlatList
      renderItem={renderedPosts}
      keyExtractor={(item) => item.id.toString()}
      data={post}
      numColumns={2}
      columnWrapperStyle={styles.row}
      initialNumToRender={10}
      contentContainerStyle={[styles.listContainer, dynamicStyles.listContainer]}
      maxToRenderPerBatch={10}
      windowSize={2}
    ></FlatList>
  )
}



const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  card: {
    backgroundColor: '#FFF',

    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal: 2,
    overflow: 'hidden',
    width: '50%',
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover"
  },
  cardContent: {
    padding: 10,

  },
  tag: {
    marginTop: 8,
    backgroundColor: '#ff2a00ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,

  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 24, marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  errorImage: {
    width: 400,
    height: 400,
    marginTop: 16,
    resizeMode: "contain"
  },
  tagText: {
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  }
});

export default HomeScreen
