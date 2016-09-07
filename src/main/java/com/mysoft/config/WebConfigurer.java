package com.mysoft.config;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.boot.context.embedded.ServletContextInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.io.File;
import javax.inject.Inject;

/**
 * Created by hujy on 2016/9/1.
 */
@Configuration
public class WebConfigurer implements ServletContextInitializer,EmbeddedServletContainerCustomizer {

    @Inject
    private Environment env;

    @Override
    public void customize(ConfigurableEmbeddedServletContainer container) {
        //MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
            File root;

            if(env.acceptsProfiles(Constants.SPRING_PROFILE_PRODUCTION)){
                root = new File("dist/www");
            }else{
                //root = new File("src/main/webapp/");
                root = new File("src/main/webapp/");
            }

            if(root.exists() && root.isDirectory()){
                container.setDocumentRoot(root);
            }
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

    }
}
