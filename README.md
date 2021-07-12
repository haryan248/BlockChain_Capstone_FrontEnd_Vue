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
