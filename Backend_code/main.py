import ezdxf 
import math 
import sys
import matplotlib.pyplot as plt
from ezdxf import recover
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
import os
from colorama import init, Fore

# Inicializar colorama
init(autoreset=True)

#importando los diccionarios

from API_App.bibliotecas import Velocidad_corte_segundoxmetro, Valor_lamina_m2, biblioteca, calibres_ALUM, calibres_CR, calibres_HR, calibres_INOX

#ruta del archivo en windows
#ruta_archivo = '.\Files\HWhqV-harley-davidson-motor-company-logo.dxf'

#aca se toma la base de la carpeta donde esta el archivo
BASEPATH = os.path.dirname(os.path.abspath(__file__))

#ruta del archivo para todos los sistemas operativos
ruta_archivo = os.path.join(BASEPATH, "Files", "carreta comino.dxf")

# Abrir el archivo DXF
doc = ezdxf.readfile(ruta_archivo)

# Acceder a la sección de entidades
msp = doc.modelspace() #ES UN OBJETO ITERABLE, PARA EL ANALISIS, ME INTERESA LOS ITEMS CON CONDICION: msp[item].dxftype() = LWPOLYLINE

# Definir la función que calcula el área de una polilínea cerrada
def area_polilinea(lista):
    # Inicializar la suma en 0
    suma = 0
    # Iterar sobre los puntos
    for i in range(len(lista)):
        # Obtener el punto actual y el siguiente (o el primero si es el último)
        p1 = lista[i]
        p2 = lista[(i+1) % len(lista)]
        # Calcular el producto cruzado y sumarlo a la suma
        suma += p1[0] * p2[1] - p1[1] * p2[0]
    # Devolver la mitad del valor absoluto de la suma
    return abs(suma) / 2

# Inicializar el área máxima y la lista de puntos de la polilínea externa en vacío
area_max = 0
lista_ext = []

# Iterar sobre las entidades
for entity in msp:
    # Filtrar solo las polilíneas ligeras
    if entity.dxftype() in ['LWPOLYLINE']:
        # Comprobar si la polilínea está cerrada
        if entity.is_closed:
            # Obtener los puntos de la polilínea
            lista = entity.get_points()
            # Calcular el área de la polilínea
            area = area_polilinea(lista)
            # Comparar el área con el área máxima
            if area > area_max:
                # Actualizar el área máxima y la lista de puntos de la polilínea externa
                area_max = area
                lista_ext = lista

# Inicializar valores en 0
max1x = 0
max2x = 0
max1y = 0
max2y = 0
min1x = float("inf")
min2x = float("inf")
min1y = float("inf")
min2y = float("inf")
# Iterar sobre los puntos de la polilínea externa
for i in range(len(lista_ext)):
    # Obtener las coordenadas x, y y 
    tupla = lista_ext[i]
    if tupla[0] > max1x:
        max2x = max1x
        max1x = tupla[0]
    if tupla[1] > max1y:
        max2y = max1y
        max1y = tupla[1]
    if tupla[0] < min1x:
        min2x = min1x
        min1x = tupla[0]
    if tupla[1] < min1y:
        min2y = min1y
        min1y = tupla[1]

ancho = max1x - min1x 
alto = max1y - min1y

# Mostrar los resultados
# print(f"Polilínea externa con {len(lista_ext)} puntos:")
# print('Material a utilizar =>', ancho, 'X', alto, 'igual a', ancho*alto, 'mm2')
# print ('area de la pieza=>', area_max, "mm2")


# Mejora en el cálculo del perímetro de una elipse
def calcular_perimetro_elipse(elipse):
    # Semiejes mayor y menor de la elipse
    a = elipse.dxf.major_axis.magnitude
    b = elipse.dxf.minor_axis.magnitude

    # Fórmula mejorada para el cálculo del perímetro de la elipse
    h = ((a - b)**2) / ((a + b)**2)
    perimeter = math.pi * (a + b) * (1 + (3 * h) / (10 + math.sqrt(4 - 3 * h)))
    return perimeter

# Cálculo del perímetro de un arco
def calcular_perimetro_arco(arco):
    # Radio del arco
    r = arco.dxf.radius
    # Ángulo en radianes
    angulo = math.radians(arco.dxf.end_angle - arco.dxf.start_angle)
    return r * angulo

# Mejora en el cálculo del perímetro de una polilínea
def calcular_perimetro_polilinea(polilinea):
    # Obtener los vértices de la polilínea
    vertices = polilinea.get_points('xyb')
    perimetro = 0.0

    # Calcular la distancia entre cada par de vértices
    for i in range(len(vertices) - 1):
        point1 = vertices[i]
        point2 = vertices[i + 1]
        distance = math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)
        perimetro += distance

    # Cierra el perímetro si la polilínea es cerrada
    if polilinea.is_closed:
        point1 = vertices[-1]
        point2 = vertices[0]
        distance = math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)
        perimetro += distance

    return perimetro

def calcular_perimetro_spline(spline, distance=0.01):
    # Aproxima la spline a una polilínea con la distancia dada
    puntos = list(spline.flattening(distance))
    perimetro = 0.0

    # Calcular la distancia entre cada par de puntos en la spline
    for i in range(len(puntos) - 1):
        punto1 = puntos[i]
        punto2 = puntos[i + 1]
        distancia = math.sqrt((punto1[0] - punto2[0])**2 + (punto1[1] - punto2[1])**2)
        perimetro += distancia

    return perimetro

# Función principal para calcular el perímetro total en un archivo DXF
def calcular_perimetro_dxf(dxf_path):
    # Leer el archivo DXF
    doc = ezdxf.readfile(dxf_path)
    msp = doc.modelspace()
    longitud_total = 0
   
    # Iterar sobre las entidades en el espacio de modelos
    for entity in msp:

        # Determinar el tipo de entidad y calcular el perímetro correspondiente
        if entity.dxftype() == 'LINE':
            dl = math.sqrt((entity.dxf.start[0] - entity.dxf.end[0])**2 + (entity.dxf.start[1] - entity.dxf.end[1])**2)
            longitud_total += dl
        elif entity.dxftype() == 'CIRCLE':
            dc = 2 * math.pi * entity.dxf.radius
            longitud_total += dc
        elif entity.dxftype() == 'ARC':
            da = calcular_perimetro_arco(entity)
            longitud_total += da
        elif entity.dxftype() == 'ELLIPSE':
            de = calcular_perimetro_elipse(entity)
            longitud_total += de
        elif entity.dxftype() in ['LWPOLYLINE']:
            dp = calcular_perimetro_polilinea(entity)
            longitud_total += dp        
        elif entity.dxftype() == 'SPLINE':
            ds = calcular_perimetro_spline(entity)
            longitud_total += ds

    return longitud_total

# Ruta del archivo DXF
archivo_dxf = ruta_archivo

# Calcular y mostrar el perímetro total
perimetro_calculado = calcular_perimetro_dxf(archivo_dxf)



# Safe loading procedure (requires ezdxf v0.14):
try:
    doc, auditor = recover.readfile(ruta_archivo)
except IOError:
    print(f'Not a DXF file or a generic I/O error.')
    sys.exit(1)
except ezdxf.DXFStructureError:
    print(f'Invalid or corrupted DXF file.')
    sys.exit(2)

# The auditor.errors attribute stores severe errors,
# which may raise exceptions when rendering.
if not auditor.has_errors:
    fig = plt.figure()
    ax = fig.add_axes([0, 0, 1, 1])
    ctx = RenderContext(doc)
    out = MatplotlibBackend(ax)
    Frontend(ctx, out).draw_layout(doc.modelspace(), finalize=True)
    #codigo para windows
    #fig.savefig('./images/image.png', dpi=300)
    #codigo para el resto de sistemas operativos
    url = os.path.join(BASEPATH, "Images", "image.png")
    fig.savefig(url, dpi=300)
    #print(fig)


"""
VARIABLES IMPORTANTES 

    fig                 => Imagen generada con el nombre your.png 
    lista_ext           => Lista cuya longitud representa la cantidad de 'puntos'
    perimetro_calculado => Perímetro de la figura 
    area_max            => área de la pieza

    ancho => Ancho de la figura
    alto  => Alto de la figura 
    ancho*alto => Cantidad de material en mm^2 para gastar en la impresión 3D
"""



#Pedir por consola el tipo de material (ALUM , INOX, CR, HR)
#Pedir por consola el espesor de la lamina (1, 1.5, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20)
#Concatenar el material y el espesor para obtener la clave del diccionario
#Retornar el valor de la clave del diccionario

#aca solo se ejecutara cuando se llame por la linea de comando ejemplo: python main.py

def calcularPrecioPorPerimetro(perimetro_en_metros, segundos_por_metro):
    costoPorSegundo = 700
    tiempoCorte = perimetro_en_metros * segundos_por_metro #tiempo en segundos
    return tiempoCorte * costoPorSegundo

def calcularPrecioPorMaterial(area_en_metros, valor_lamina):
    return area_en_metros * valor_lamina

if __name__ == "__main__":
    # print(Velocidad_corte_segundoxmetro)
    # print(Valor_lamina_m2)
    # print(biblioteca)

    print(f"\n{Fore.RED}BIENVENIDO{Fore.RED} {Fore.BLUE}AL SISTEMA DE{Fore.BLUE} {Fore.GREEN}IMPRESIÓN LAZER.{Fore.GREEN}\n")
    # Definir los materiales disponibles
    materiales_disponibles = ["ALUM", "INOX", "CR", "HR"]
    material:str = input(f"{Fore.CYAN}Por favor dime el material a imprimir (ALUM , INOX, CR, HR): {Fore.CYAN}{Fore.WHITE}").upper()

    # Validar el material ingresado
    if material not in materiales_disponibles:
        print(f"\n{Fore.RED}Material no disponible. Terminando la ejecución.\n{Fore.RED}")
        exit()  # Sale del programa


    if material == "ALUM":
        print(f"{Fore.YELLOW}Calibres disponibles para {material}:{Fore.YELLOW} {Fore.WHITE}{', '.join(calibres_ALUM)}{Fore.WHITE}")
    elif material == "INOX":
        print(f"{Fore.YELLOW}Calibres disponibles para {material}: {Fore.YELLOW}{Fore.WHITE}{', '.join(calibres_INOX)}{Fore.WHITE}")
    elif material == "CR":
        print(f"{Fore.YELLOW}Calibres disponibles para {material}: {Fore.YELLOW}{Fore.WHITE}{', '.join(calibres_CR)}{Fore.WHITE}")
    elif material == "HR":
        print(f"{Fore.YELLOW}Calibres disponibles para {material}:{Fore.YELLOW} {Fore.WHITE}{', '.join(calibres_HR)}{Fore.WHITE}")
    else:
        print("Material no válido.")


    calibre:str = input(f"{Fore.CYAN}\nPor favor dime el calibre a imprimir en base al material elegido: {Fore.CYAN}{Fore.WHITE}")

    if calibre not in calibres_ALUM and material == "ALUM":
        print(f"\n{Fore.RED}Calibre no disponible en ALUM. Terminando la ejecución.{Fore.RED}\n")
        exit()

    if calibre not in calibres_INOX and material == "INOX":
        print(f"\n{Fore.RED}Calibre no disponible en INOX. Terminando la ejecución.{Fore.RED}\n")
        exit()
    
    if calibre not in calibres_CR and material == "CR":
        print(f"\n{Fore.RED}Calibre no disponible en CR. Terminando la ejecución.{Fore.RED}\n")
        exit()
        
    if calibre not in calibres_HR and material == "HR":
        print(f"\n{Fore.RED}Calibre no disponible en HR. Terminando la ejecución.{Fore.RED}\n")
        exit()

    claveDiccionario = material + calibre

    tiempoDeCorte = Velocidad_corte_segundoxmetro.get(claveDiccionario) #Segundos por metro
    precioLamina = Valor_lamina_m2.get(claveDiccionario) #COP por metro cuadrado

    perimetro_en_metros = perimetro_calculado / 1000 #Perimetro original en milimetros, se pasa a metros dividiendo entre 1000
    area_en_metros = ancho * alto / 1000000 #Area original en milimetros cuadrados, se pasa a metros cuadrados dividiendo entre 1000000

    precioFinal = calcularPrecioPorPerimetro(perimetro_en_metros, tiempoDeCorte) + calcularPrecioPorMaterial(area_en_metros, precioLamina)
    precioRedondeado = round(precioFinal, 2) #redondear a miles

    cantidadDePiezas = ""
    while not cantidadDePiezas.isdigit() or int(cantidadDePiezas) < 1 or int(cantidadDePiezas) > 250:
        cantidadDePiezas: str = input(f"{Fore.CYAN}\nIndica la cantidad de piezas (1-250): {Fore.CYAN}{Fore.WHITE}")
        if cantidadDePiezas < "1" or cantidadDePiezas > "250" or not cantidadDePiezas.isdigit():
            print(f"{Fore.RED}Cantidad ingresada no válida, inténtelo nuevamente.{Fore.RED}")
        
    
    descuento = biblioteca.get(int(cantidadDePiezas)) #Convertir a % el descuento
    precioFinalConDescuento = round((precioFinal - (precioFinal * descuento/100)), 2)

