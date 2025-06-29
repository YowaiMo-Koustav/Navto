import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from omnidimension import Client
from google.cloud import firestore
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OMNIDIM_API_KEY = os.getenv("OMNIDIM_API_KEY")
client = Client(api_key=OMNIDIM_API_KEY)

# Firestore setup
db = firestore.Client()

@app.post("/voice-query")
async def voice_query(request: Request):
    data = await request.json()
    user_text = data.get("text")
    agent_id = "YOUR_AGENT_ID"  # Replace with your actual agent ID
    # Query the agent
    response = client.agent.chat(agent_id=agent_id, message=user_text)
    return {"response": response}

@app.post("/voice-report")
async def voice_report(request: Request):
    data = await request.json()
    report_text = data.get("text")
    user = data.get("user", "anonymous")
    # Write to Firestore (collection: 'transit_alerts')
    doc_ref = db.collection("transit_alerts").add({
        "message": report_text,
        "user": user,
        "severity": "info",
        "title": "User Voice Report"
    })
    return {"status": "success", "doc_id": str(doc_ref[1].id)}