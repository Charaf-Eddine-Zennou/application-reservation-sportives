package com.sportscener.sports_center_backend.repository;

import com.sportscener.sports_center_backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
