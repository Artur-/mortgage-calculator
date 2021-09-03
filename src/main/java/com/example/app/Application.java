package com.example.app;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

import com.vaadin.base.devserver.DevModeHandlerImpl;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.internal.DevModeHandler;
import com.vaadin.flow.internal.DevModeHandlerManager;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.server.communication.IndexHtmlRequestListener;
import com.vaadin.flow.server.communication.IndexHtmlResponse;
import com.vaadin.flow.theme.Theme;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@PWA(name = "Vaadin Mortgage Calculator", shortName = "VaadinMortgage")
@Theme("mortgage")
public class Application extends SpringBootServletInitializer implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public VaadinServiceInitListener asgd() {
        return new VaadinServiceInitListener() {

            @Override
            public void serviceInit(ServiceInitEvent event) {
                event.addIndexHtmlRequestListener(new IndexHtmlRequestListener() {

                    @Override
                    public void modifyIndexHtmlResponse(IndexHtmlResponse indexHtmlResponse) {
                        Element head = indexHtmlResponse.getDocument().head();
                        Elements scripts = head.select("script");
                        for (Element script : scripts) {
                            if (script.attr("src").contains("VAADIN/build/")) {
                                script.remove();
                            }
                        }
                        Optional<DevModeHandler> devModeHandler = DevModeHandlerManager
                                .getDevModeHandler(indexHtmlResponse.getVaadinRequest().getService());
                        if (devModeHandler.isPresent()) {

                            DevModeHandler handler = devModeHandler.get();
                            int port;
                            try {
                                port = (int) handler.getClass().getMethod("getPort").invoke(handler);
                            } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException
                                    | NoSuchMethodException | SecurityException e) {
                                // TODO Auto-generated catch block
                                e.printStackTrace();
                                port = 0;
                            }
                            head.append(
                                    "<script type=module src='http://localhost:" + port + "/@vite/client'></script>");
                            head.append("<script type=module src='http://localhost:" + port + "/index.ts'></script>");
                        }
                    }

                });
            }

        };
    }
}
