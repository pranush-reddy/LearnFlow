# Use Java 21 runtime
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built jar
COPY target/*.jar app.jar

# Expose port (Render injects PORT)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
