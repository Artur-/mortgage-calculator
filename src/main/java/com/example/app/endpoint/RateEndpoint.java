package com.example.app.endpoint;

import com.vaadin.flow.server.connect.VaadinService;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import org.slf4j.LoggerFactory;

@VaadinService
@AnonymousAllowed
public class RateEndpoint {

    private static final Rate[] rates = new Rate[] { //
            new Rate("3m Euribor", -0.4, 1.0, true), //
            new Rate("6m Euribor", -0.34, 1.0, false), //
            new Rate("12m Euribor", -0.263, 1.0, false) };

    public Rate[] getRates() {
        return rates;
    }

    public Result apply(String name, Options options) {
        LoggerFactory.getLogger(getClass()).info("{} applied for a loan: {}", name, options);

        if (options.getAmount() < 500000) {
            return Result.deny("We do not deal with small fish");
        } else {
            return Result.approve("Thank you, we will send you the cash today");
        }
    }

}