package com.sportscener.sports_center_backend.service;

import com.sportscener.sports_center_backend.model.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation saveReservation(Reservation reservation);
    List<Reservation> getReservationsByUserId(Long userId);
    void deleteReservation(Long id);
}
