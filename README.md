# Vue express firebase Web

## backend/.env
```
PORT=3000
DB_HOST=
DB_USER=
DB_DATABASE=
DB_PASSWORD=
```
## 아파치 세팅
```
<VirtualHost *:80>
  ServerName erp.ezcode.kr
  ProxyRequests Off
  ProxyPreserveHost On
  ProxyPass / http://localhost:3000/
  ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```