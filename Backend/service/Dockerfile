FROM openjdk:14

MAINTAINER Gopalan M A<gopalrmd90@gmail.com>

ENV ENV_NAME local
ENV BOOTAPP_JAVA_OPTS -Xms256m -Xmx256m
ENV LOG_PATH "/var/log/canservice"
ENV BOOTAPP_USR="root" BOOTAPP_GROUP="root" BOOTAPP_PATH="/service.jar"
ENV SERVER_PORT 8080
ENV DBHOST "jdbc:mysql://mysqldb:3306/watercan"
EXPOSE $SERVER_PORT

#COPY wrapper.sh /wrapper.sh

#RUN chmod 555 /wrapper.sh

USER root
COPY maven/service.jar $BOOTAPP_PATH
RUN chmod 555 $BOOTAPP_PATH && \
            touch $BOOTAPP_PATH
RUN mkdir $LOG_PATH            
RUN chmod 777 $LOG_PATH && touch $LOG_PATH 

USER $BOOTAPP_USR

 
ENTRYPOINT ["java", "-jar", "service.jar"]

