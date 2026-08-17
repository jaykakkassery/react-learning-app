export type Hotel = {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  description: string;
};

export type Review = {
  id: number;
  hotelId: number;
  author: string;
  comment: string;
  score: number;
};

export const hotels: Hotel[] = [
  { id: 1, name: 'Grand Plaza Hotel', city: 'New York', price: 299, rating: 4.8, description: 'Luxury hotel in the heart of midtown Manhattan with stunning city views.' },
  { id: 2, name: 'City Inn', city: 'Los Angeles', price: 149, rating: 3.9, description: 'Comfortable and affordable hotel near downtown LA.' },
  { id: 3, name: 'Sunset Bay Resort', city: 'Miami', price: 249, rating: 4.5, description: 'Beachfront resort with private beach access and ocean views.' },
  { id: 4, name: 'Mountain Lodge', city: 'Denver', price: 189, rating: 4.2, description: 'Cozy mountain lodge with ski-in ski-out access.' },
  { id: 5, name: 'The Riverside Inn', city: 'Chicago', price: 179, rating: 4.1, description: 'Elegant hotel along the Chicago Riverwalk.' },
  { id: 6, name: 'Pacific View Hotel', city: 'San Francisco', price: 329, rating: 4.6, description: 'Modern hotel with panoramic bay and bridge views.' },
];

export const reviews: Review[] = [
  { id: 1, hotelId: 1, author: 'Alice', comment: 'Absolutely stunning views. Will definitely return!', score: 5 },
  { id: 2, hotelId: 1, author: 'Bob', comment: 'Great location but pricey. Worth it for a special occasion.', score: 4 },
  { id: 3, hotelId: 2, author: 'Carol', comment: 'Clean rooms and friendly staff. Good value.', score: 4 },
  { id: 4, hotelId: 2, author: 'Dave', comment: 'Basic but comfortable. Perfect for a business trip.', score: 3 },
  { id: 5, hotelId: 3, author: 'Eva', comment: 'Best beach resort I have ever stayed at!', score: 5 },
  { id: 6, hotelId: 4, author: 'Frank', comment: 'Ski slopes right outside the door. Amazing experience.', score: 5 },
  { id: 7, hotelId: 5, author: 'Grace', comment: 'Loved the riverside location. Food was excellent too.', score: 4 },
  { id: 8, hotelId: 6, author: 'Hank', comment: 'The Golden Gate Bridge view from the room was breathtaking.', score: 5 },
];
