from fastapi import FastAPI

#Aplicación principal. 
app = FastAPI()

'''------------ FUNCIONES -------------'''
#El decorador registra la funcion que se ejecuta ante la petición 
@app.get("/")
def index():
    return "hello world"


@app.get("/{item_id}")
def show_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items/")
def create_item(item_id: int):
    return {"mensaje": f"Se ha creado el item: {item_id}"}


'''----------------------------------'''




#Levantar el servidor
''' uvicorn API:app --reload '''
'''uvicorn nombreArchivoPython:nombreAplicacion --reload
    con reload se reinicia el servidor cada vez que se hace un cambio en el código
'''
