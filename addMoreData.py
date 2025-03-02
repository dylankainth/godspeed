# connect to a mongodb database and add more data to the collection

import pymongo
from pymongo import MongoClient
import requests
from dotenv import load_dotenv
import os
# load the environment variables
load_dotenv()

# connect to the database
client = MongoClient(os.getenv("MONGODB_URI"))

# get the database
db = client['test']

# get the opportunities collection
opportunities = db.opportunities

# for each opportunity in the collection, add more data
for opportunity in opportunities.find():
    # get the opportunity.description
    description = opportunity["description"]

    # send to the openai api to increase the length of the description
    response = requests.post("https://api.openai.com/v1/chat/completions", json={
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "Rewrite the description for an urgent call for volunteers in the topic area, invent relevent details. Just return the new description. "
                
                
                },
                {
                    "role": "user",
                    "content": description
                    }
                    ],
                    
                    "max_tokens": 250
                    },
                    headers={
                        "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
                        "Content-Type": "application/json"
                        }
                        )

    response = response.json()

    print(response)

    # update the opportunity in the database
    opportunities.update_one(
        {"_id": opportunity["_id"]},
        {
            "$set": {
                "description": response["choices"][0]["message"]["content"]
            }
        }
    )
