from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import sys
import os

# Add the parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from common import models
import schemas
from common.database import SessionLocal, engine
from datetime import datetime, timedelta
import secrets
import requests
from typing import Optional

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Forgot Password Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# In a real application, you would use a proper email service
def send_reset_email(email: str, reset_token: str):
    # This is a mock function. In production, use a real email service
    print(f"Sending reset email to {email} with token: {reset_token}")
    return True

@app.post("/request-reset")
async def request_password_reset(email: str, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    expires = datetime.utcnow() + timedelta(hours=1)
    
    # Store reset token in database
    reset_request = models.PasswordReset(
        email=email,
        token=reset_token,
        expires=expires
    )
    db.add(reset_request)
    db.commit()
    
    # Send reset email
    send_reset_email(email, reset_token)
    
    return {"message": "Password reset email sent"}

@app.post("/verify-reset-token")
async def verify_reset_token(token: str, db: Session = Depends(get_db)):
    reset_request = db.query(models.PasswordReset).filter(
        models.PasswordReset.token == token,
        models.PasswordReset.expires > datetime.utcnow()
    ).first()
    
    if not reset_request:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    return {"message": "Token is valid", "email": reset_request.email}

@app.post("/reset-password")
async def reset_password(reset_data: schemas.ResetPassword, db: Session = Depends(get_db)):
    reset_request = db.query(models.PasswordReset).filter(
        models.PasswordReset.token == reset_data.token,
        models.PasswordReset.expires > datetime.utcnow()
    ).first()
    
    if not reset_request:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    # Update password in auth service
    # In a real application, you would make an API call to the auth service
    # For now, we'll just print the request
    print(f"Updating password for {reset_request.email}")
    
    # Delete the reset token
    db.delete(reset_request)
    db.commit()
    
    return {"message": "Password has been reset successfully"} 