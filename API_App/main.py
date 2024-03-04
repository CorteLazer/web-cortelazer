from fastapi import FastAPI, UploadFile
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from uuid import uuid4
from Refactorizacion import DXFAnalyzer, MaterialLibrary, Material, Calculator

MATERIALS:MaterialLibrary = MaterialLibrary()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/price/{id}/{material}/{thickness}/{amount}")
def get_price(id:str, material:str, thickness:str, amount:int):
    thickness = thickness.replace("x", "/")
    filePath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Files", f"{id}.dxf")
    dxf = DXFAnalyzer(filePath)
    info:Material = MATERIALS.get_material(material, thickness)
    if info == None:
        info = MaterialLibrary.get_material_from_dicts(material, thickness)
        if info == None:
            return JSONResponse(content={"message":"the material or the thickness not found"}, status_code=400)
        MATERIALS.add_material(info)
    calculator = Calculator(dxf, MATERIALS)
    price:float = calculator.calculate_price(info, amount)
    print(price)
    return JSONResponse(content={"id":id, "price":price, "message":f"Area: {calculator.dxf_analyzer.getArea()}\nPerimetro: {calculator.dxf_analyzer.calculate_perimeter()}"}, status_code=200)
    

@app.get("/image/{id}")
def get_image(id:str):
    imagepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Images", f"{id}.jpg")
    return FileResponse(imagepath, status_code=200, filename="image.jpg", media_type="application/jpg")

@app.delete("/image/{id}")
def delete_image(id:str):
    imagepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Images", f"{id}.jpg")
    filePath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Files", f"{id}.dxf")
    try:
        os.remove(imagepath)
        os.remove(filePath)
        return JSONResponse(content={"message":"successful"})
    except:
        return JSONResponse(content={"message":"The files was not delete"}, status_code=400)


@app.post("/image")
async def create_image(uploaded: UploadFile):
    if uploaded == None:
        return JSONResponse(content={"message":"error, the file was not uploading"}, status_code=400)
    id = str(uuid4())
    filePath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Files", f"{id}.dxf")
    imagepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Images", f"{id}.jpg")
    try:
        with open(filePath, "wb") as File:
            content = await uploaded.read()
            File.write(content)
            File.close()
        dxf = DXFAnalyzer(filePath)
        dxf.draw_dxf(imagepath)
        return JSONResponse(content={"message":"success", "id":id}, status_code=200)
    except:
        return JSONResponse(content={"message":"the file was not process"}, status_code=400)
    
