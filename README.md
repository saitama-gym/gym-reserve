### 定期実行方式
Circle CI
または
Lambda

### Slack着信Webフック
https://zerogs.slack.com/apps/A0F7XDUAZ--web-

### ビルドコマンド
```
mvn clean package -Dmaven.test.skip=true
```

### メイン実行コマンド
```
java -jar target/crw-booking-checker-standalone.jar
```

### コミットコマンド
```
git add .
git commit -m "update."
git push origin master
```
