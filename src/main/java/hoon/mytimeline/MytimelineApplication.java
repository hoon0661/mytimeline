package hoon.mytimeline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MytimelineApplication {

    public static void main(String[] args) {
        SpringApplication.run(MytimelineApplication.class, args);
    }

}
