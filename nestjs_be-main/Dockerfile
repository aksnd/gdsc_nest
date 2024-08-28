# 1. Node.js 이미지 선택
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 4. Prisma CLI 설치
RUN npm install @prisma/client

# 5. Prisma 스키마 및 소스 코드 복사
COPY prisma ./prisma
COPY . .

# 6. 애플리케이션 빌드
RUN npm run build

# 7. Prisma 스키마를 바탕으로 DB 마이그레이션 및 클라이언트 생성
RUN npx prisma generate

# 8. 포트 설정
EXPOSE 3000

# 9. 애플리케이션 실행
CMD ["node", "dist/main"]
