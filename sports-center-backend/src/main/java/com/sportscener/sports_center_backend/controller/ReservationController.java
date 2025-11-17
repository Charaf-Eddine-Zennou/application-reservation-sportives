package com.sportscener.sports_center_backend.controller;

import com.sportscener.sports_center_backend.dto.ReservationRequest;
import com.sportscener.sports_center_backend.model.Activity;
import com.sportscener.sports_center_backend.repository.ActivityRepository;
import com.sportscener.sports_center_backend.model.Reservation;
import com.sportscener.sports_center_backend.model.User;
import com.sportscener.sports_center_backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ActivityRepository activityRepository;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationRequest request) {
        Reservation reservation = new Reservation();

        Activity activity = activityRepository.findById(request.getActivityId())
                .orElseThrow(() -> new RuntimeException("Activité non trouvée"));

        reservation.setActivity(activity);

        reservation.setReservationDate(LocalDate.parse(request.getDate(), DateTimeFormatter.ISO_DATE));

        User user = new User();
        user.setId(request.getUserId());
        reservation.setUser(user);

        return ResponseEntity.ok(reservationService.saveReservation(reservation));
    }
}
