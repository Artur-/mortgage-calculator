package com.example.app.endpoint;

import dev.hilla.Nonnull;

public class Rate {
    @Nonnull
    private String name;
    private double rate, margin;
    private boolean defaultRate;

    public Rate(String name, double rate, double margin, boolean defaultRate) {
        this.name = name;
        this.rate = rate;
        this.margin = margin;
        this.defaultRate = defaultRate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public double getMargin() {
        return margin;
    }

    public void setMargin(double margin) {
        this.margin = margin;
    }

    public boolean isDefaultRate() {
        return defaultRate;
    }

    public void setDefaultRate(boolean defaultRate) {
        this.defaultRate = defaultRate;
    }

}
