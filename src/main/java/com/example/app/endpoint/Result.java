package com.example.app.endpoint;

public class Result {

    private boolean approved;
    private String message;

    private Result(boolean approved, String message) {
        this.approved = approved;
        this.message = message;
    }

    public static Result deny(String string) {
        return new Result(false, string);
    }

    public static Result approve(String string) {
        return new Result(true, string);
    }

    public boolean isApproved() {
        return approved;
    }

    public String getMessage() {
        return message;
    }

}
