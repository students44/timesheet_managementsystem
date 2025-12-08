# Next.js Timesheet Backend API

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   cd backend-nextjs
   npm run dev
   ```

3. **Server runs on**: `http://localhost:3001`

## API Endpoints

All endpoints are available at `http://localhost:3001/api`

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "muneebtech005@gmail.com",
  "password": "muneebtech005"
}
```

### Timesheets

#### Get All Timesheets
```http
GET /api/timesheets
```

#### Get Single Timesheet
```http
GET /api/timesheets/[id]
```

#### Create Timesheet
```http
POST /api/timesheets
Content-Type: application/json

{
  "projectName": "Homepage Development",
  "typeOfWork": "Development",
  "description": "Working on new features",
  "hours": 8,
  "startDate": "2025-12-09"
}
```

#### Update Timesheet
```http
PUT /api/timesheets/[id]
Content-Type: application/json

{
  "hours": 10
}
```

#### Delete Timesheet
```http
DELETE /api/timesheets/[id]
```

## Project Structure

```
backend-nextjs/
├── app/
│   └── api/
│       ├── auth/
│       │   └── login/
│       │       └── route.js      # Login endpoint
│       └── timesheets/
│           ├── route.js          # GET all, POST create
│           └── [id]/
│               └── route.js      # GET, PUT, DELETE by ID
├── lib/
│   ├── data.js                   # In-memory data store
│   └── helpers.js                # Helper functions
└── package.json
```

## How It Works

### Next.js API Routes
- Each `route.js` file exports HTTP method handlers
- `GET()`, `POST()`, `PUT()`, `DELETE()` functions
- Automatic routing based on folder structure
- Return `NextResponse.json()` for responses

### Example Route Handler
```javascript
export async function GET() {
    return NextResponse.json({ message: 'Hello' });
}

export async function POST(request) {
    const data = await request.json();
    // Process data
    return NextResponse.json(data);
}
```

## User Credentials

Edit `lib/data.js` to change login credentials:
```javascript
export let users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'muneeb005@gmail.com',  // ← Change here
        password: 'muneeb005',          // ← Change here
    },
];
```

## Frontend Configuration

Update your frontend `.env.local`:
```
VITE_API_URL=http://localhost:3001/api
```

Then restart your React dev server.

## Advantages Over Express

✅ **Simpler syntax** - No middleware setup needed  
✅ **File-based routing** - Folders = routes  
✅ **Familiar code** - Same as React components  
✅ **Built-in features** - Auto type generation, optimizations  
✅ **Easy deployment** - Deploy to Vercel with one click
