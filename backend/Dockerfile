# ============================
# 🧱 Etapa 1: Build com Maven
# ============================
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copia somente o POM primeiro (para cache)
COPY pom.xml .

# Baixar dependências (melhor cache e build rápido)
RUN mvn -B -DskipTests dependency:go-offline

# Copiar código-fonte
COPY src ./src

# Build da aplicação
RUN mvn -B -DskipTests clean package


# ============================
# 🚀 Etapa 2: Runtime
# ============================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Define timezone corretamente
RUN apk add --no-cache tzdata

ENV TZ=America/Sao_Paulo

# Copia o JAR empacotado
COPY --from=build /app/target/*.jar app.jar

# Usa porta 8080 do Spring Boot
EXPOSE 8080

# Propriedades recomendadas para produção
ENTRYPOINT ["java", "-jar", "-XX:+UseContainerSupport", "-Xms256m", "-Xmx512m", "app.jar"]
