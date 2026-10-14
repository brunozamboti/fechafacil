FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
COPY src/ src/

RUN sed -i 's/\r$//' mvnw
RUN sh ./mvnw -B -DskipTests package

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/fechafacil-backend-0.0.1-SNAPSHOT.jar app.jar

COPY start.sh ./start.sh
RUN sed -i 's/\r$//' /app/start.sh
CMD ["sh", "/app/start.sh"]