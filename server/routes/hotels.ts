import { Router } from 'express';
import { hotels, reviews } from '../data';

export const hotelsRouter = Router();

// GET /api/hotels
// Returns all hotels, with optional ?city= filter
hotelsRouter.get('/', (req, res) => {
  const { city } = req.query;

  if (city && typeof city === 'string') {
    const filtered = hotels.filter(h =>
      h.city.toLowerCase().includes(city.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(hotels);
});

// GET /api/hotels/:id
// Returns one hotel by id
hotelsRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const hotel = hotels.find(h => h.id === id);

  if (!hotel) {
    return res.status(404).json({ error: `Hotel with id ${id} not found` });
  }

  res.json(hotel);
});

// GET /api/hotels/:id/reviews
// Returns all reviews for a given hotel
hotelsRouter.get('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  const hotelReviews = reviews.filter(r => r.hotelId === id);
  res.json(hotelReviews);
});
