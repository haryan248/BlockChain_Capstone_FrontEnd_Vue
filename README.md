# blockchain
캡스톤 프로젝트 
블록체인 기반 학생증 어플리케이션
자신의 데이터는 자신이 지키자 (데이터 주권 보장)
## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Nginx Server command

sudo service nginx restart (server restart)
sudo service nginx start (server start)
sudo service nginx stop (server stop)

### Deploy command

cd BlockChain_FrontEnd_Vue/ && git pull && yarn build && cd /var/www/html && rm -r dist && cp -r ~root/BlockChain_FrontEnd_Vue/dist /var/www/html/ && sudo service nginx restart && cd

## 이팔청춘 - 블록체인 학생증(U-Pass)
<p align='center'>
![이팔청춘(색상) 사본](https://user-images.githubusercontent.com/51049245/127641138-2b93699c-e4a3-4c2c-90de-4741c8d7807d.png)
</p>

<p align='center'>
    <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
</p>

##
자신의 데이터는 자신이 지키자

## 📌 블록체인 기반 학생증 어플리케이션 소개
사용자
### 🔒 블록체인을 활용한 안전한 서비스
> - 구글 로그인을 통해 회원가입을 하면 블록체인에서 발급해준 did로 안전하게 사용할 수 있습니다.
### 📅 캘린더에 출입 기록 제공
> - 사용자는 자신의 캘린더에 강의동 출입기록을 확인할 수 있습니다.

관리자
### ✔️ 출입한 강의동 정보 제공
> - 관리자의 경우 학교 강의동에 출입한 학생의 출입기록을 확인할 수 있습니다.
### 📲 QR코드를 활용한 체크인
> - QR인식을 통해 신뢰성 있는 체크인이 가능합니다.



## 📌 주요 기능

|학생증![image](https://user-images.githubusercontent.com/51049245/127643339-d9c46127-ddf3-401c-8297-af47785b4718.png)|결제![image](https://user-images.githubusercontent.com/51049245/127643388-1133105e-230e-47a9-a6d9-2dc61158b743.png)|주문![image](https://user-images.githubusercontent.com/51049245/127643409-ad3b84f6-1a8a-4abe-9176-a45fb928a151.png)|좌석예약![image](https://user-images.githubusercontent.com/51049245/127643431-9152c5d6-fc0b-4f96-ac94-99f9f6d5630f.png)|

|:--:|:--:|:--:|:--:|
|<img width='500' src='https://i.imgur.com/cUAWIka.png'>|<img width='500' src='https://i.imgur.com/bZW9EaG.png'>|<img width='500' src='https://i.imgur.com/kjrJCes.png'>|<img width='500' src='https://i.imgur.com/65Iq6xY.png'>|



|캘린더![image](https://user-images.githubusercontent.com/51049245/127643481-f4ef0092-6477-4f4d-a039-87c2b48cee8e.png)|출입 확인![image](https://user-images.githubusercontent.com/51049245/127643481-f4ef0092-6477-4f4d-a039-87c2b48cee8e.png)|QR 인증![image](https://user-images.githubusercontent.com/51049245/127643640-33712c45-7e6e-4570-baf9-032042c1c299.png)|강의동 설정![image](https://user-images.githubusercontent.com/51049245/127643670-f38b694f-feb1-424b-a2a6-690f5aa3a781.png)|
|:--:|:--:|:--:|:--:|
|<img width='500' src='https://i.imgur.com/jnTselu.png'>|![](https://i.imgur.com/rhwIsA1.png)|<img width='500' src='https://i.imgur.com/NgHhEFA.png'>|<img width='500' src='https://i.imgur.com/3N5mWKB.png'>|


## 📌서비스 흐름
![image](https://user-images.githubusercontent.com/51049245/127643219-5c2682ad-654b-4e31-9c70-713df0553208.png)

**3. 프론트엔드**
- 프론트엔드 환경 변수 설정
   - fe 폴더 바로 밑에 .env.development 파일 생성
   - .env_sample에 있는 내용 작성
   - .env 예시
    ```
    REACT_APP_API_URL=[서버 주소 (ex. http://localhost)]
    
    REACT_APP_API_PORT=[프론트엔드 서버 포트 (ex. 4000)]
    ```

- 실행
    ```vue
    yarn
    yarn start
    ```
    or
    ```vue
    npm install 
    npm run start
    ```
