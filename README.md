post api :- localhost:4400/v1/app/customer/login

body :- {
    "mobile":{
        "countryCode":"91",
        "number":"9096445336"
    },
    "password":"12345678"
}
res:-{
    "message": "OK",
    "customer": {
        "id": "607e716c5f96c457ac0c5625",
        "mobile": {
            "countryCode": "91",
            "number": "9096445336"
        },
        "gender": "MALE",
        "mobileDeviceInfo": {
            "fcmId": ""
        },
        "relationshipStatus": "NEW",
        "age": null,
        "partner": {
            "mobile": {}
        },
        "saveChat": true,
        "pastFriendGroup": [],
        "attempts": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6eyJsb2dpblRpbWUiOiIyMDIxLTA0LTIwVDA2OjE0OjQ3LjI4NloiLCJpc0FjdGl2ZSI6dHJ1ZSwiY2hhbm5lbCI6Ik1PQklMRSIsIl9pZCI6IjYwN2U3MTZjNWY5NmM0NTdhYzBjNTYyNiIsImVudGl0eVR5cGUiOiJVU0VSIiwiZW50aXR5IjoiNjA3ZTcxNmM1Zjk2YzQ1N2FjMGM1NjI1IiwibG9nb3V0VGltZSI6IjIwMjEtMDUtMjBUMDY6MTU6MDguODIyWiIsInRva2VuIjoiYzFjY2FiNjAtYTE5Zi0xMWViLWE3ZGItZDcxYmNhODhhNTE1IiwiY3JlYXRlZEF0IjoiMjAyMS0wNC0yMFQwNjoxNTowOC44MjNaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0yMFQwNjoxNTowOC44MjNaIiwiX192IjowfSwiaWF0IjoxNjE4ODk5MzA4fQ.8LSKFB1EhV2HxHeGDBDjKd8o7iOn2lRNd22zz549-R8",
    "existing": false
}

--------------------------------------------------------------------------------------------
post api :- http://localhost:4400/v1/app/customer/login
body :- {
    "mobile":{
        "countryCode":"91",
        "number":"9096445336"
    },
    "password":"12345678"
}

res :- {
    "customer": {
        "id": "607e716c5f96c457ac0c5625",
        "mobile": {
            "countryCode": "91",
            "number": "9096445336"
        },
        "gender": "MALE",
        "mobileDeviceInfo": {
            "fcmId": ""
        },
        "relationshipStatus": "NEW",
        "age": null,
        "partner": {
            "mobile": {}
        },
        "saveChat": true,
        "pastFriendGroup": [],
        "attempts": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6eyJsb2dpblRpbWUiOiIyMDIxLTA0LTIwVDA2OjE0OjQ3LjI4NloiLCJpc0FjdGl2ZSI6dHJ1ZSwiY2hhbm5lbCI6Ik1PQklMRSIsIl9pZCI6IjYwN2U3MTg5NWY5NmM0NTdhYzBjNTYyNyIsImVudGl0eVR5cGUiOiJVU0VSIiwiZW50aXR5IjoiNjA3ZTcxNmM1Zjk2YzQ1N2FjMGM1NjI1IiwiaXBBZGRyZXNzIjoiOjoxIiwibG9nb3V0VGltZSI6IjIwMjEtMDUtMjBUMDY6MTU6MzcuMTk4WiIsInRva2VuIjoiZDJiNjgwZTAtYTE5Zi0xMWViLWE3ZGItZDcxYmNhODhhNTE1IiwiY3JlYXRlZEF0IjoiMjAyMS0wNC0yMFQwNjoxNTozNy4xOTlaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0yMFQwNjoxNTozNy4xOTlaIiwiX192IjowfSwiaWF0IjoxNjE4ODk5MzM3fQ.JBIgMS7eBWHzoHqtoEg_h5_Umkazo7QSqxCrfOxD9FI"
}
