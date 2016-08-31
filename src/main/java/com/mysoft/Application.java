package com.mysoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by hujy on 2016/8/24.
 */
//@ComponentScan
//@Configuration
//@EnableAutoConfiguration
@SpringBootApplication
public class Application {
    public static void main(String [] args) throws Exception{
        SpringApplication app = new SpringApplication(Application.class);
        app.addListeners(new MyApplicationStartedEventListener());
        app.run(args);
    }
}
