# 📑투두리스트

Next.js(App Router), TypeScript, Tanstack Query 등을 활용한 투두 리스트 웹 어플리케이션입니다.

#### 🔗 배포 주소 </br>[next-todo-six-phi.vercel.app](next-todo-six-phi.vercel.app)

## 개발 환경

| 사용 기술           | 버전   |
| ------------------- | ------ |
| Next.js(App Router) | 15.3.0 |
| React               | 19.0.0 |
| TypeScript          | 5      |
| Tanstack Query      | 5.74.3 |
| Tailwind CSS        | 4      |
| json-server         |        |

## 주요 요구사항

- 투두 CRUD(생성, 읽기, 수정, 삭제) 기능
- 완료(Completed) 상태를 별도로 확인할 수 있는 필터/탭 기능
- 서버 상태 관리(react-query)와 비동기 로직 처리
- TypeScript를 통한 인터페이스/타입 정의

## 프로젝트 구조

```bash
src
┣ app
┃ ┣ favicon.ico
┃ ┣ globals.css
┃ ┣ layout.tsx
┃ ┗ page.tsx
┣ components
┃ ┣ EditTodo.tsx
┃ ┣ HeaderTap.tsx
┃ ┣ TodoItem.tsx
┃ ┗ TodoList.tsx
┣ hooks
┃ ┗ useTodo.ts
┣ providers
┃ ┗ QueryProvider.tsx
┣ services
┃ ┗ todo.ts
┗ types
┃ ┗ todo.ts
```

## 핵심 기능 설명

- `TodoList.tsx` : 추가된 할 일 리스트 표시
- `EditTodo.tsx` : 할 일 추가하기
- `TodoItem.tsx` : 할 일 수정, 삭제하기
- `HeaderTap.tsx` : 완료 목록 필터링
