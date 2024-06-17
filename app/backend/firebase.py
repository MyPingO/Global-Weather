import os
import firebase_admin
from fastapi import HTTPException, Security
from google.cloud.exceptions import Conflict
from fastapi.security.api_key import APIKeyHeader
from firebase_admin import credentials, firestore, auth
from google.cloud.firestore_v1 import DocumentReference, DocumentSnapshot

firebase_credentials_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
credentials = credentials.Certificate(firebase_credentials_path)
firebase_admin.initialize_app(credentials)

db = firestore.client()

api_key_header = APIKeyHeader(name="Authorization")


def get_login_uid(token: str = Security(api_key_header)) -> str:
    """
    Checks if a user is logged in by verifying their firebase token.\n
    If the user is logged in, returns the user's id.\n
    Otherwise, raises an HTTPException, blocking access to a route if used as a dependency.

    Parameters:
        Request:
            headers: dict[str, str]

    Returns:
        str:
            user_id

    Raises:
        HTTPException:
        401: Unauthorized
        400: Error verifying user token
    """

    if not token:
        raise HTTPException(status_code=401, detail="Access Denied: Unauthorized")

    try:
        decoded_token = auth.verify_id_token(token, clock_skew_seconds=10)
        if decoded_token:
            return decoded_token["uid"]
        else:
            raise HTTPException(
                status_code=401, detail="Access Denied: Unable to decode user token"
            )

    except Exception as e:
        raise HTTPException(status_code=400, detail="Error verifying user token: {}".format(e))


def add_user(user_id: str) -> None:
    """
    Adds a user to the database.

    Parameters:
        user_id: str
    """
    try:
        db.collection("users").document(user_id).set({"favorites": []})
    except Conflict:
        raise HTTPException(status_code=409, detail="User already exists")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error adding user: {}".format(e))


def add_favorite_location(user_id: str, lat: float, lon: float, location: str) -> None:
    """
    Adds a location to the user's favorites in the database.

    Parameters:
        user_id: str
        lat: float
        lon: float
        location: str
    """
    
    try:
        user_doc: DocumentSnapshot = db.collection("users").document(user_id).get()
        if user_doc.exists:
            if "favorites" in user_doc.to_dict():
                favorites: list = user_doc.to_dict().get("favorites")
                favorites.append({"lat": lat, "lon": lon, "location": location})
                user_doc.reference.update({"favorites": favorites})
            else:
                user_doc.reference.set({"favorites": [{"lat": lat, "lon": lon, "location": location}]})
        else:
            add_user(user_id)
            add_favorite_location(user_id, lat, lon, location)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error adding favorite location: {}".format(e))
   

def get_user_favorites(user_id: str) -> list[dict]:
    """
    Gets the user's favorite locations from the database.

    Parameters:
        user_id: str

    Returns:
        list[dict]:
            lat: float
            lon: float
            location: str
    """
    try:
        user_doc: DocumentSnapshot = db.collection("users").document(user_id).get()
        if user_doc.exists:
            favorites = user_doc.to_dict().get("favorites", [])
            return favorites
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error getting user favorites: {}".format(e))
