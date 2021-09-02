package com.example.app.endpoint;

import com.vaadin.fusion.Nonnull;

public class Options {
    private double amount;
    private int paybackTimeMonths;
    @Nonnull
    private Rate rate;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getPaybackTimeMonths() {
        return paybackTimeMonths;
    }

    public void setPaybackTimeMonths(int paybackTimeMonths) {
        this.paybackTimeMonths = paybackTimeMonths;
    }

    public Rate getRate() {
        return rate;
    }

    public void setRate(Rate rate) {
        this.rate = rate;
    }

    @Override
    public String toString() {
        return "Options [amount=" + amount + ", paybackTimeMonths=" + paybackTimeMonths + ", rate=" + rate + "]";
    }

}
