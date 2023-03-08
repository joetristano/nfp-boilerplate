from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from ..database import users, database
import json
from pychartjs import BaseChart, ChartType, Color                                     


class MyChart(BaseChart):
    
    type = ChartType.Line
    
    class labels:
        Years = [2017, 2018, 2019, 2020, 2021, 2022]
    
    class data:

        class Whales: 
            data = [80, 60, 100, 80, 90, 60]
            backgroundColor = Color.Gray
            
        class Bears: 
            data = [60, 50, 80, 120, 140, 180]
            backgroundColor = Color.Blue
        
        class Dolphins: 
            data = [150, 80, 60, 30, 50, 30]
            backgroundColor = Color.Orange

    
    class options: 
        
        title = {"text": "Wildlife Populations", 
                 "display": True}

class MyBarGraph(BaseChart):

    type = ChartType.Bar

    class data:
        label = "Numbers"
        data = [12, 19, 3, 17, 10]
        backgroundColor = Color.Green

router = APIRouter()

@router.get("/plots/plot")
async def test_plot():

    NewChart = MyChart()
    NewChart.data.label = "My Favourite Numbers"      # can change data after creation
    
    ChartJSON = NewChart.get()

    return json.loads(ChartJSON)
