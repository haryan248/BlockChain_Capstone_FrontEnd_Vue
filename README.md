# blockchain

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
