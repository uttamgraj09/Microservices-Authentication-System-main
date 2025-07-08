from pydantic import BaseModel, EmailStr

class ResetPassword(BaseModel):
    token: str
    new_password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr 