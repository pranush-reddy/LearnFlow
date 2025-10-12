package com.example.LearnFlowAi.repository;

import com.example.LearnFlowAi.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnflowDb extends MongoRepository<User,String> {
    User findByMail(String mail);
}
