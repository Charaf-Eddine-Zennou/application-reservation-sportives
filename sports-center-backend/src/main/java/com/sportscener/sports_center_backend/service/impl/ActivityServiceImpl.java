package com.sportscener.sports_center_backend.service.impl;

import com.sportscener.sports_center_backend.model.Activity;
import com.sportscener.sports_center_backend.repository.ActivityRepository;
import com.sportscener.sports_center_backend.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Override
    public List<Activity> findAll() {
        return activityRepository.findAll();
    }

    @Override
    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }
}
