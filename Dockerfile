FROM 10.219.107.15:8888/node:10

MAINTAINER "Qin Jianqing" "jianqing.qin@desay-svautomotive.com"

ADD . /storage/

WORKDIR /storage

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN npm config set registry http://10.219.107.16:8081/repository/itti-npm-registry/

RUN npm install

EXPOSE 8080

CMD ["npm","run","prod"]

