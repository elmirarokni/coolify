FROM ubuntu:latest

#update and install packages
RUN apt-get update     &&\
    apt-get install sudo     &&\
    apt-get install  curl apt-transport-https ca-certificates software-properties-common -y 

#prueba
RUN sudo groupadd docker &&\
    sudo usermod -aG docker root

#install docker 
RUN apt install curl -y             &&\
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -  &&\
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"  &&\
    apt install docker-ce -y  &&\
    docker --version

#install docker-compose
RUN curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose &&\
    chmod +x /usr/local/bin/docker-compose  &&\
    docker-compose --version
    
RUN  wget -q https://get.coollabs.io/coolify/install.sh -O install.sh; sudo bash ./install.sh -f
EXPOSE 3000
