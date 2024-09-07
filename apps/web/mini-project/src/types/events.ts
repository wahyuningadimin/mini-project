export interface Event {
    slug: string;
    id: number;
    name: string;
    event_date: string;
    location: string;
    venue: string;
    category: string;
    event_type:string;
    event_description: string;
    image:      string;
    ticket_start_date: string;
    ticket_end_date: string;
    created_date: string;
    modified_date: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  created_date: string;
  referral_code: string;
}

export interface EventPrice {
  id: number;
  event_id: number;
  tier_name: string;
  max_capacity: number;
  price: number;
}

export interface EventReview {
  id: number;
  event_id: number;
  user_id: number;
  rating: number;
  review: string;
  created_date: string;
}

export interface UserPoints {
  id: number;
  user_id: number;
  operations: string;
  points: number;
  created_date: string;
  expired_date: string;
}

export interface Transaction {
  id: number;
  event_id: number;
  user_id: number;
  tier_id: number;
  promo_code: number;
  points_used: number;
  original_price: number;
  discounted_price: number;
  payment_status: string;
  payment_date: string;
}
    // image?: File | string | null;
