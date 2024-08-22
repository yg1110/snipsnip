# <span><img src="./asset/logo.png" width="20" height="20" /> SnipSnip <img src="./asset/logo.png" width="20" height="20" /></span>

## 1. 소개 및 개요

- 프로젝트 소개 : 북마크의 순간을 기록하는 서비스
- 배포 URL : [🔗 SnipSnip](https://www.snipsnip.site)
- Test ID / PW : tour / tour

## 2. 기술 및 개발 환경

### [사용 기술]

- Front-end : <img src="https://img.shields.io/badge/Next.js-14-blue?logo=next.js"> <img src="https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white">

- Back-end : <img src="https://img.shields.io/badge/Nest.js-10-E0234E?logo=nestjs"> <img src="https://img.shields.io/badge/TypeORM-0.3.20-262626?logo=typeorm">

- Database : <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql">

### [개발 환경]

<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/>

### [코드 컨벤션]

- <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/>

```javascript
{
  printWidth: 120,
  singleQuote: true,
  tabWidth: 2
}
```

- <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/>

```javascript
{
  "extends": "next/core-web-vitals",
  "plugins": ["react", "simple-import-sort"],
  "rules": {
    "no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}
```

### [일정 관리]

버그와 작업을 프로젝트에 올리고 빠트리지 않고 작업하기 위해 github Proejcts를 사용했습니다.

![image](./asset/project.png)

### [배포 서비스]

<img src="https://img.shields.io/badge/SSH-OpenSSH%208.6-008080?logo=ssh"> <img src="https://img.shields.io/badge/Docker-20.10.7-2496ED?logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-1.21.3-009639?logo=nginx&logoColor=white">

## 4. DB 구조도

![image](./asset/snipsnip.png)

- bookmark테이블에서 모든 테이블을 참조하고 있습니다.
- bookmark 테이블에 url을 추가하지 않은 이유는 메타데이터는 추후에 다른 테이블에도 붙일 수 있을 것 이라고 판단했습니다.

## 3. 페이지 기능

- 각 페이지의 기능들을 gif로 표현했습니다.

| [로그인/회원가입]                                      | [폴더생성]                                       |
| ------------------------------------------------------ | ------------------------------------------------ |
| <img width="100%;" src="./asset/로그인회원가입.gif" /> | <img width="100%;" src="./asset/폴더생성.gif" /> |

| [드래그 앤 드롭]                                     | [북마크 생성]                                      |
| ---------------------------------------------------- | -------------------------------------------------- |
| <img width="100%;" src="./asset/드래그앤드롭.gif" /> | <img width="100%;" src="./asset/북마크생성.gif" /> |

| [북마크 수정]                                      | [북마크 삭제]                                      |
| -------------------------------------------------- | -------------------------------------------------- |
| <img width="100%;" src="./asset/북마크수정.gif" /> | <img width="100%;" src="./asset/북마크삭제.gif" /> |
