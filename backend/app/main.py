from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

app = FastAPI(title="Rahul Pothineni Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Rahul Pothineni Portfolio API"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/about")
async def about():
    return {
        "name": "Rahul Pothineni",
        "bio": "",
        "education": "",
        "skills": [],
    }


@app.get("/contact")
async def contact():
    return {
        "email": "rahulpot07@gmail.com",
        "phone": "(408) 881-2494",
        "github": "https://github.com/rahul-pothineni",
        "linkedin": "https://www.linkedin.com/in/rahul-pothineni-a63244328/",
    }


# TODO: Replace with actual S3 bucket URL
RESUME_URL = "https://s3.amazonaws.com/your-bucket/resume.pdf"


@app.get("/resume")
async def resume():
    return RedirectResponse(url=RESUME_URL)
