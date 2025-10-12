package com.example.LearnFlowAi.service;
import com.example.LearnFlowAi.model.User;
import com.example.LearnFlowAi.repository.LearnflowDb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class Accountservice {
    @Autowired
    LearnflowDb db;
//
//    @Value("${gemini.api.key}")
//    private String apiKey;

    private final WebClient webClient;

    public Accountservice(WebClient perplexityWebClient) {
        this.webClient = perplexityWebClient;
    }
    public  String Create(User user){
        User found=db.findByMail(user.getMail());
        if(found==null) {
            db.save(user);
            return "created";
        }else{
        return "found";}
    }


    public Mono<String> sendPrompt(String prompt) {
        return webClient.post()
                .uri("/chat/completions")  // Correct relative URI
                .bodyValue(Map.of(
                        "model", "sonar-pro",
                        "messages", List.of(
                                Map.of("role", "user", "content", prompt)
                        )
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var choices = (List<Map<String, Object>>) response.get("choices");
                    if (choices != null && !choices.isEmpty()) {
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        if (message != null) {

                            return message.getOrDefault("content", "No response").toString();
                        }
                    }
                    return "No response";
                })
                .onErrorResume(e -> Mono.just("Perplexity API unavailable: " + e.getMessage()));
    }

//    public void InsertComment(String comment){
//        db.save({"Comment":`${comment}`});
//    }


}
