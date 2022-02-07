package com.example.app.endpoint;

import java.util.Arrays;
import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import org.slf4j.LoggerFactory;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class RateEndpoint {

    private static final Rate[] rates = new Rate[] { //
            new Rate("3m Euribor", -0.4, 1.0, true), //
            new Rate("6m Euribor", -0.34, 1.0, false), //
            new Rate("12m Euribor", -0.263, 1.0, false) };

    @Nonnull
    public List<@Nonnull Rate> getRates() {
        return Arrays.asList(rates);
    }

    @Nonnull
    public Result apply(String name, Options options) {
        LoggerFactory.getLogger(getClass()).info("{} applied for a loan: {}", name, options);

        if (options.getAmount() < 500000) {
            return Result.deny("We do not deal with small fish");
        } else {
            return Result.approve("Thank you, we will send you the cash today");
        }
    }

}