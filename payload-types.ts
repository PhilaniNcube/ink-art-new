/**
 * This file contains type definitions for your content.
 * 
 * This file was automatically generated by Payload.
 * Feel free to modify this file, but any changes you make will be
 * overwritten when you regenerate your types.
 */

export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailUrl?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  focalX?: number;
  focalY?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: any;
  excerpt: string;
  image: Media;
  publishedDate: string;
  published: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface Config {
  collections: {
    media: Media;
    blogs: Blog;
  };
}

export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type BlogsQuery = PaginatedDocs<Blog>;
export type MediaQuery = PaginatedDocs<Media>;
