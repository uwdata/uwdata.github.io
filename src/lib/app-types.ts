export interface Paper {
  title: string;
  year: number;
  start_page?: number | null;
  end_page?: number | null;
  volume?: number | null;
  issue?: number | null;
  editors?: string | null;
  publisher?: string | null;
  location?: string | null;
  pdf: string;
  abstract: string;
  thumbnail: string;
  figure: string;
  caption: string;
  web_name: string;
  visible: boolean;
  mod_date: string;
  note?: string | null;
  pub_date: string;
  venue: string;
  authors: SmallPerson[];
  tags: string[];
  materials: {
    name: string;
    link: string;
  }[];
  doi: string | null;
}

export interface SmallPerson {
  first_name: string;
  last_name: string;
  display_name?: string;
  url?: string;
}

export interface Course {
  name: string;
  level: 'Undergraduate' | 'Graduate';
  link: string;
}

export interface Person {
  first_name: string;
  last_name: string;
  display_name: string | null;
  email: string;
  url?: string;
  // status: '' | '0F' | '4A' | '3C' | '99' | '2S';
  status: 'faculty' | 'alumni' | 'collaborator' | 'other' | 'member';
  visible: boolean;
  image: string | null;
  nickname: string | null;
  position: string | null;
  interests: string | null;
  org: string | null;
}

export interface News {
  text: string;
  date: string;
  visible: boolean;
}

export interface Spotlight {
  title: string;
  paper: string;
  image: string;
  visible: boolean;
}

export type FeaturedVenue = {
  desc: string;
  venue_nickname: string;
  year: number;
  visible: boolean;
};

export type Venue = {
  fullName: string;
  nickname: string;
  // venueType: 'C' | 'J' | 'B' | 'W';
  venueType: 'conference' | 'journal' | 'book' | 'workshop';
};
