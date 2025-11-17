package com.sportscener.sports_center_backend.dto;

public class ReservationRequest {
    private Long activityId;
    private String date;
    private Long userId;

    public Long getActivityId() {
        return activityId;
    }

    public String getDate() {
        return date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
