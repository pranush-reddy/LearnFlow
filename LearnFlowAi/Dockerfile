# Stage 1: Build the jar using Maven
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven wrapper and pom
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

# Copy source code
COPY src ./src

# Make mvnw executable (important for Linux containers)
RUN chmod +x ./mvnw

# Build jar
RUN ./mvnw package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render injects PORT env)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
