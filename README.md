fullstack-project/
│
├── frontend/                # React app
│   ├── public/              # Static assets (favicon, index.html)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components (Home, Dashboard, etc.)
│   │   ├── services/        # API calls (axios/fetch)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Global state (React Context/Redux)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── vite.config.js / webpack.config.js
│
├── backend-nest/            # NestJS backend
│   ├── src/
│   │   ├── modules/         # Feature modules (tasks, users, auth)
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── entities/        # Database models
│   │   └── main.ts          # Entry point
│   ├── test/                # Unit/integration tests
│   ├── package.json
│   └── nest-cli.json
│
├── backend-python/          # Python backend (FastAPI or Flask)
│   ├── app/
│   │   ├── api/             # Route definitions
│   │   ├── models/          # Database models (SQLAlchemy/Pydantic)
│   │   ├── services/        # Business logic
│   │   ├── core/            # Config, middleware, utils
│   │   └── main.py          # Entry point
│   ├── tests/               # Unit/integration tests
│   ├── requirements.txt
│   └── pyproject.toml       # Optional modern Python packaging
│
├── ci-cd/                   # Pipeline configs
│   ├── .gitlab-ci.yml       # GitLab pipeline
│   ├── github-actions.yml   # GitHub Actions (optional)
│   └── docker-compose.yml   # Local dev orchestration
│
├── docs/                    # Documentation (API specs, design notes)
│
└── README.md                # Project overview
