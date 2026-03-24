# NEXUS Platform
> 기업에겐 인재를, 청소년에겐 더 나은 미래를 — by PACM

청소년 실전 역량 인증 기반 기업-청소년 연결 플랫폼

---

## 🚀 Vercel 배포 가이드 (예산 0원)

### 1단계. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속 → 무료 계정 생성
2. **New Project** 클릭 → 프로젝트명: `nexus-platform`
3. 리전: **Northeast Asia (Seoul)** 선택
4. 생성 완료 후 **Settings > API** 에서 아래 값 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

### 2단계. DB 스키마 적용

1. Supabase Dashboard → **SQL Editor**
2. `lib/supabase/schema.sql` 파일 전체 내용 붙여넣기 → **Run**
3. Table Editor에서 테이블 생성 확인

### 3단계. GitHub 저장소 생성

```bash
git init
git add .
git commit -m "feat: NEXUS platform initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nexus-platform.git
git push -u origin main
```

### 4단계. Vercel 배포

1. [vercel.com](https://vercel.com) → GitHub 계정으로 로그인
2. **New Project** → GitHub 저장소 선택
3. **Environment Variables** 탭에서 아래 3개 추가:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |

4. **Deploy** 클릭 → 약 2~3분 후 배포 완료
5. 배포된 URL을 `.env` → `NEXT_PUBLIC_APP_URL`에 추가

### 5단계. Supabase Auth 설정

1. Supabase → **Authentication > URL Configuration**
2. **Site URL**: `https://your-project.vercel.app`
3. **Redirect URLs** 추가: `https://your-project.vercel.app/**`

---

## 📁 프로젝트 구조

```
nexus-platform/
├── app/
│   ├── page.tsx              # 랜딩 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   ├── auth/
│   │   ├── login/page.tsx    # 로그인
│   │   └── register/page.tsx # 회원가입 (역할 선택)
│   ├── dashboard/
│   │   ├── layout.tsx        # 사이드바 레이아웃
│   │   └── page.tsx          # 대시보드 홈
│   ├── missions/
│   │   ├── page.tsx          # 미션 목록 + 필터
│   │   └── [id]/page.tsx     # 미션 상세 + 신청
│   ├── assessment/
│   │   └── page.tsx          # 역량 진단 (15문항)
│   └── career/
│       └── page.tsx          # 커리어 리포트 + PDF
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # 브라우저 클라이언트
│   │   ├── server.ts         # 서버 클라이언트
│   │   └── schema.sql        # DB 스키마
│   ├── types.ts              # TypeScript 타입
│   └── utils.ts              # 유틸리티 + 샘플 데이터
├── styles/globals.css        # 전역 스타일 + 디자인 시스템
├── middleware.ts             # 인증 미들웨어
├── vercel.json               # Vercel 배포 설정
├── tailwind.config.js        # 커스텀 디자인 토큰
└── .env.example              # 환경변수 예시
```

---

## 🎯 핵심 기능 목록

| 기능 | 상태 | 설명 |
|------|------|------|
| 랜딩 페이지 | ✅ 완성 | 애니메이션, 통계, 미션 미리보기 |
| 회원가입/로그인 | ✅ 완성 | Supabase Auth, 역할 선택 |
| 대시보드 | ✅ 완성 | 레벨/포인트, 추천 미션, 통계 |
| 미션 탐색 | ✅ 완성 | 검색, 필터, 카테고리, 정렬 |
| 미션 상세 | ✅ 완성 | 상세 정보, 신청 모달 |
| 역량 진단 | ✅ 완성 | 15문항, 레이더 차트, 점수 분석 |
| 커리어 리포트 | ✅ 완성 | 역량 분석, 추천 기업, PDF |
| 인증 미들웨어 | ✅ 완성 | 보호 라우트, 자동 리다이렉트 |

---

## 🛠 향후 확장 계획

- [ ] 기업 파트너 대시보드 (미션 게시, 지원자 관리)
- [ ] 실시간 팀 협업 공간 (Supabase Realtime)
- [ ] 블록체인 인증서 발급 (NFT)
- [ ] 카카오/구글 소셜 로그인
- [ ] AI 커리어 리포트 자동 생성 (Gemini API)
- [ ] 관리자 대시보드

---

## 📄 특허 정보

출원번호: 10-2025-0158013  
명칭: 맞춤형 학습과 기업 협업을 통한 직무 역량 강화 방법 및 시스템

---

**© 2026 PACM Corp. (피에이씨엠) | 대표자: 조경용**  
*기업에겐 인재를, 청소년에겐 더 나은 미래를*
