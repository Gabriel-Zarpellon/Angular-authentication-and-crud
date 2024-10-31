export interface iPost {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
}

export type tCreatePost = Omit<iPost, 'id'>;

export type tUpdatePost = Partial<Omit<iPost, 'id' | 'author'>>;

export type tCreatePostForm = Omit<tCreatePost, 'author'>;
