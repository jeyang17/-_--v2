export interface Hobby {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'waves' | 'guitar' | 'tv';
  color: string;
}

export interface Recommendation {
  title: string;
  genre: string;
  comment: string;
  rating: number;
}
