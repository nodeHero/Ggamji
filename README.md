# Project ggamji
## about
- 웹서버공부의 무료함을 달래기 위해 node.js 서버를 이용한 영어공부 서비스를 만드는 프로젝트
- 기능의 구현보다는 학습에 목표가 있습니다.

## OVERVIEW
- 어릴적 깜지와 비슷한 기능을 가진 웹서비스를 구현합니다.
- 쉬운 책부터 읽을 수 있도록 책에서 단어를 선별하여 빠르게 책 한권을 읽도록 합니다.
- 단순 반복 기록외 감각을 자극하도록 읽어주기 기능을 제공할 예정입니다.
- 그 외 다양한 기능은 아직 기획, 실험중입니다.

## Install
```shell
# package.json 에 선언한대로 설치
npm install
```

## Developing
`gulp local` task를 실행

## Gulp Task
- `clean` : 기존에 합쳐진 파일삭제
- `jsmerge` : js파일을 위의 명세에 따라 합친 후 `public/js`로 이동
- `sassmerge` : sass파일을 위의 명세에 따라 합친 후 `public/css`로 이동
- `sass` : `public/css`의 모든 sass파일을 css로 변경한 후 sass파일 삭제
- `watch` : sass, js 소스파일이 변경되면 자동으로 다시 합침
- `livereload` : js, sass, ejs 소스파일이 변경되면 서버를 내렸다 올림
  - chrome-extension [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)를 설치하면 새로고침할 필요가 없음(자동으로 해줌. 크롬 짱짱)
- `uglify` : 합쳐진 js파일을 난독화한다.
- `default` : `'clean', 'sassmerge', 'sass', 'jsmerge', 'uglify'` 순서로 task 실행
- `local` : `'clean', 'sassmerge', 'sass', 'jsmerge', 'livereload', 'watch'` 순서로 task 실행
