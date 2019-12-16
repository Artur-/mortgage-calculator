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

    public boolean apply(String name, Options options) {
        LoggerFactory.getLogger(getClass()).info("{} applied for a loan: {}", name, options);

        // We don't want to deal with the small fish
        return (options.getAmount() > 500000);
    }

}