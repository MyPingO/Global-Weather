import os
import firebase_admin
from google.cloud.exceptions import Conflict
from fastapi.security.api_key import APIKeyHeader
from firebase_admin import credentials, firestore, auth
from google.cloud.firestore_v1 import CollectionReference, DocumentSnapshot

firebase_credentials_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
credentials = credentials.Certificate(firebase_credentials_path)
firebase_admin.initialize_app(credentials)

db = firestore.client()

api_key_header = APIKeyHeader(name="Authorization")