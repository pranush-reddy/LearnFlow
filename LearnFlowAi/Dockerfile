# FROM eclipse-temurin:21-jdk
# WORKDIR /app

# # Copy Maven wrapper and pom.xml
# COPY mvnw .
# COPY mvnw.cmd .
# COPY .mvn .mvn
# COPY pom.xml .

# # Copy source code
# COPY src ./src

# # Build the jar inside Docker
# RUN ./mvnw package -DskipTests

# # Copy the built jar to a standard name
# RUN cp target/*.jar app.jar

# EXPOSE 8080
# ENTRYPOINT ["java","-jar","app.jar"]

# Copy Maven wrapper and pom
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

# Give execute permissions inside the container
RUN ["chmod", "+x", "./mvnw"]

# Copy source code
COPY src ./src

# Build the jar
RUN ./mvnw package -DskipTests
