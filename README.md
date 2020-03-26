# 재능 역경매 서비스

**사용자들이 가지고있는 재능을 경매 시스템을 통해 거래하는 서비스** 



## Overview

- node.js
- vue.js
- spring boot (maven)
- docker



## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

 - Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
 - Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitLab Issue](https://lab.ssafy.com/webmobile1-sub1/s02p11d152/issues) to install Node.js.
 - Spring boot - [Spring boot](https://start.spring.io/) create new project
 - Docker - docker hub [install](https://hub.docker.com/?overlay=onboarding)



 ## Setup & Build

프로젝트를 로컬 스토리지에 저장

```bash
$ git clone https://lab.ssafy.com/webmobile1-sub3/s02p13d110.git
```

### Vue

기본적인 패키지들을 설치

``` bash
$ cd s02p13d110/front/somebodyhelpme
$ npm install 
```

프로젝트를 빌드

```bash
$ npm run build
```

### Spring boot

프로젝트 static 디렉토리 아래에 dist 하위 Files을 붙어넣는다.
`Spring boot project`를 `build(package)`한다.




## Run

### Vue

로컬에서 프로젝트 실행

```bash
$ cd s02p13d110/front/somebodyhelpme
$ npm run serve
```

### Spring boot 

스프링 부트 프로젝트 

```bash
$ Run s02p13d110\back\Somebody\src\main\java\com\ssafy\somebody\SomebodyApplication.java
```

##### Test ID
테스트 접속 계정
```text
ID : qwe
PWD : qwe
```

## Depoly

### Docker

Docker DB Container 생성

```bash
$ docker run -d -p 9999:3306 -e MYSQL_ROOT_PASSWORD=input_password --name mariadb mariadb:10.3

$ docker run -d -it -p 80:8888 --name "springboot" dhzm2aud/springboot:1.2.4 /bin/bash
~# cd /root
~# java -jar somebody-0.0.1-SNAPSHOT.jar
```

