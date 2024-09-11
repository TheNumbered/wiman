import express from "express";
import { getBookings, createBooking, getBookingById, getBookingByUserId, getBookingByRoomId, deleteBookingById, getBookingByDate } from "../controllers/bookings-controller.js";

const router = express.Router();

router.get("/bookings", getBookings);
router.post("/bookings", createBooking);
router.get("/bookings/id/:id", getBookingById);
router.get("/bookings/user/:user_id", getBookingByUserId);
router.get("/bookings/room/:room_id", getBookingByRoomId);
router.delete("/bookings/:id", deleteBookingById);
router.get("/bookings/:booking_date", getBookingByDate);

export default router;