package com.sportscener.sports_center_backend.service;

import com.sportscener.sports_center_backend.model.Activity;

import java.util.List;

public interface ActivityService {
    List<Activity> findAll();
    Activity save(Activity activity);
}
