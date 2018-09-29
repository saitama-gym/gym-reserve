# 定期実行方式案

## IBM Bluemix版
https://console.bluemix.net/dashboard/apps/

```
bluemix login

bluemix app push crw-booking-checker -p target/crw-booking-checker.jar
```

参考：https://www.ibm.com/developerworks/jp/cloud/library/cl-move-java-app-hybrid-cloud3-bluemix-trs/index.html

## Slack - 踏み台 - GitLab版

### 利用リポジトリ
* BitBucket：メインのソース管理用リポジトリ
* GitLab   ：CI実行用のサブリポジトリ

```
git remote add origin https://cacarrot@bitbucket.org/cacarrot/crw-booking-checker.git
git remote add gitlab git@gitlab.com:cloud20171123/crw-booking-checker.git
```

* GitLabのSSH key設定
https://gitlab.com/profile/keys

* プッシュ時コマンド
```
git add .
git commit -m "update."
git push origin master
git push gitlab master
```

### Slack発信Webフック
https://zerogs.slack.com/apps/A0F7VRG6Q--web

### Firebase踏み台エンドポイント


### GitLab CI API

#### アクセストークン

##### トークン発行
https://gitlab.com/profile/personal_access_tokens から設定

| Name      | Expires at |
|:----------|:-----------|
| api_token | 2099-12-31 |

##### 各ユーザ毎のトークン値
| User Name      | Project ID | PRIVATE-TOKEN        |
|:---------------|:-----------|:---------------------|
| cloud20171123  | 5010870    | X-yuHvmvxPr3rrE9srDt |

Project nameはいずれも crw-booking-checker .

#### POSTサンプル
https://docs.gitlab.com/ce/api/pipelines.html#create-a-new-pipeline

リクエストサンプル
```
curl --request POST --header "PRIVATE-TOKEN: X-yuHvmvxPr3rrE9srDt" "https://gitlab.com/api/v4/projects/5010870/pipeline?ref=master"
```

レスポンスサンプル
```
{
  "id": 15675837,
  "sha": "56dea81838493fa9b10afea92dd4f88262e7e27b",
  "ref": "master",
  "status": "pending",
  "before_sha": "0000000000000000000000000000000000000000",
  "tag": false,
  "yaml_errors": null,
  "user": {
    "id": 1886794,
    "name": "cloud20171123",
    "username": "cloud20171123",
    "state": "active",
    "avatar_url": "https://secure.gravatar.com/avatar/9bad009e128a0efc5615addfc50574c0?s=80&d=identicon",
    "web_url": "https://gitlab.com/cloud20171123"
  },
  "created_at": "2018-01-01T08:28:33.746Z",
  "updated_at": "2018-01-01T08:28:34.136Z",
  "started_at": null,
  "finished_at": null,
  "committed_at": null,
  "duration": null,
  "coverage": null
}
```
