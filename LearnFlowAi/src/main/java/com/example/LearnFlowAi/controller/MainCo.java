package com.example.LearnFlowAi.controller;
import com.example.LearnFlowAi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.example.LearnFlowAi.service.Accountservice;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

@RestController
public class MainCo {

    @Autowired
    private Accountservice serv;

    @GetMapping("/wakeup")
    public void NoBhAAi(){
        return;
    }

    @Autowired
    private WebClient perplexityWebClient;

    @GetMapping("/")
    public void Er() {
        return ;
    }

//    @PostMapping("/message")
//    public void Comment(@RequestBody String comment){
//        serv.InsertComment(comment);
//    }

    @PostMapping("/create")
    public String accountCreate(@RequestBody User user) {
        return serv.Create(user);
    }

    //    @GetMapping("/make")
//    public String ReqtoAPI(@RequestBody Map<String, Object> body) {
//        // Extract prompt text from JSON input
//        try {
//            var contents = (java.util.List<Map<String, Object>>) body.get("contents");
//            var parts = (java.util.List<Map<String, String>>) contents.get(0).get("parts");
//            String prompt = parts.get(0).get("text");
//
//            // Add your additional context
//            prompt += " and prepare a structured week plan (including detailed overview of concepts to be covered), "
//                    + "top 3 one shot videos, top 3 playlists, free reading resources (gfg, w3schools), "
//                    + "milestone project/task suggestions, interview prep tips. "
//                    + "Give response only in JSON (mandatory).";
//
//            return serv.Structure(prompt);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "{\"error\": \"Invalid request format. Please send in Gemini structured format.\"}";
//        }
//    }
    @PostMapping("/make")
    public Mono<String> ReqtoAPI(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");  // user input
        prompt += "\"\\n\" +\n" +
                "                \"Please provide the response ONLY in the following exact JSON structure.\\n\" +\n" +
                "                \"{\n" +
                "        \"technology\": \"<technology_name>\",\n" +
                "                \"number_of_weeks\": <week_plan_length>,\n" +
                "                \"week_plan\": [\n" +
                "        {\n" +
                "            \"week\": 1,\n" +
                "                \"concepts\": [\"<concept_1>\", \"<concept_2>\", \"...\"],\n" +
                "            \"milestone_project\": \"<project_name>\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"week\": 2,\n" +
                "                \"concepts\": [\"<concept_1>\", \"<concept_2>\", \"...\"],\n" +
                "            \"milestone_project\": \"<project_name>\"\n" +
                "        }\n" +
                "        // Add as many weeks as needed if user mention else based on your recommendation\n" +
                "  ],\n" +
                "        \"top_one_shot_videos\": [\n" +
                "        {\n" +
                "            \"title\": \"<video_title>\",\n" +
                "                \"url\": \"<video_url>\",\n" +
                "                \"views\": \"<views_count>\",\n" +
                "                \"channel_name\": \"<channel>\"\n" +
                "        }\n" +
                "        // Add multiple videos if needed (min and max 4)\n" +
                "  ],\n" +
                "        \"free_reading_resources\": [\n" +
                "        {\n" +
                "            \"title\": \"<resource_title>\",\n" +
                "                \"url\": \"<resource_url>\",\n" +
                "                \"website\": \"<website_name>\"\n" +
                "        }\n" +
                "        // Add multiple reading resources if needed (min and max 4)\n" +
                "  ],\n" +
                "        \"roadmap_sh\": {\n" +
                "            \"url\": \"<roadmap_url>\",\n" +
                "                    \"steps\": [\"<step_1>\", \"<step_2>\", \"...\"]\n" +
                "        },\n" +
                "        \"top_playlists\": [\n" +
                "        {\n" +
                "            \"title\": \"<playlist_title>\",\n" +
                "                \"url\": \"<playlist_url_or_NA>\",\n" +
                "                \"channel_name\": \"<channel>\",\n" +
                "                \"views\": \"<views_count_or_NA>\"\n" +
                "        }\n" +
                "        // Add multiple playlists if needed (atleast 4 and max 4)\n" +
                "  ],\n" +
                "        \"milestone_projects\": [\n" +
                "        \"<project_1>\",\n" +
                "                \"<project_2>\"\n" +
                "        // Add more milestone project names here(min and max 5)\n" +
                "  ],\n" +
                "        \"tips_and_tricks\": [\n" +
                "        \"<tip_1>\",\n" +
                "                \"<tip_2>\"\n" +
                "                \"<tip_3>\"\n" +
                "                \"<tip_4>\"\n" +
                "        // Add more useful tips for learning(min and max 5)\n" +
                "  ]\n" +
                "    }\n" +
                "\"+\n" +

                "You must always use these exact keys, structure, and nesting and update with real values.\n" +
                "If the prompt does not specify weeks, use \"number_of_weeks\": null with a recommended weeks\n" +
                "Only fill contents per technology, do not change keys or format.\n" +
                "Output only JSON with no extra text.";

        // Build the request body according to Perplexity API
        return serv.sendPrompt(prompt);
    }
}
