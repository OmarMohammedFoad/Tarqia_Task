export interface PostItem {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  rating: number;
  price: number;
  reviews?: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}


export type RootStackParamList = {
  Home: undefined;
  Details: { item: PostItem };
};
