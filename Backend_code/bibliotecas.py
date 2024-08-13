import os
#esta es la url del directorio del archivo
BASEPATH = os.path.dirname(os.path.abspath(__file__))

#bibliotecas 
Velocidad_corte_segundoxmetro = {
    "CR18": 6 , #tiempo: 6 segundos por metro (EJEMPLO 5000mm (5 metros) tendría una demora de 30 segundos)
    "CR16": 8,
    "CR14": 10,
    "HR14": 8,
    "HR12": 13,
    "HR1/8": 20,
    "HR3/16": 25,
    "HR1/4": 30,
    "HR5/16": 35,
    "HR3/8": 40,
    "HR1/2": 45,
    "INOX20": 5,
    "INOX18": 7,
    "INOX16": 9,
    "INOX14": 14,
    "INOX12": 16,
    "INOX1/8": 22,
    "INOX3/16": 29,
    "ALUM1": 6,
    "ALUM1,5": 9,
    "ALUM2,5": 12,
    "ALUM3": 15,
    "ALUM4": 18,
    "ALUM5": 21,
    "ALUM6": 24,
}

Valor_lamina_m2 = {  #este diccionario debe de cambiar con administración por fronetnd de un administrador con derechos
    "CR18":  130000,  #Costo lamina: área_de_la_figura * clave_del_diccionario (EJEMPLO: 0.032 m2 serían 3200 COP adicionales)
    "CR16": 150000,
    "CR14": 200000,
    "HR14": 180000,
    "HR12": 210000,
    "HR1/8": 230000,
    "HR3/16": 250000,
    "HR1/4": 345000,
    "HR5/16": 460000,
    "HR3/8": 520000,
    "HR1/2": 730000,
    "INOX20": 250000,
    "INOX18": 290000,
    "INOX16": 370000,
    "INOX14": 440000,
    "INOX12": 520000,
    "INOX1/8": 700000,
    "INOX3/16": 850000,
    "ALUM1": 120000,
    "ALUM1,5": 190000,
    "ALUM2,5": 300000,
    "ALUM3": 400000,
    "ALUM4": 480000,
    "ALUM5": 550000,
    "ALUM6": 650000,
}

#porcentaje_descuento




    # Crear un diccionario vacío
biblioteca = {}
# Leer los valores desde un archivo o desde la entrada estándar
# Aquí asumo que los valores están en un archivo llamado "valores.txt"
with open(os.path.join(BASEPATH, "descuentos.txt")) as archivo:
    # Iterar sobre cada línea del archivo
    for linea in archivo:
        # Separar la línea por el espacio y convertir los valores a enteros
        clave, valor = map(int, linea.split())
        # Asignar el valor a la clave en el diccionario
        biblioteca[clave] = valor

   
# Crear listas para cada material con sus calibres disponibles
calibres_CR = [calibre[2:] for calibre in Velocidad_corte_segundoxmetro.keys() if calibre.startswith("CR")]
calibres_HR = [calibre[2:] for calibre in Velocidad_corte_segundoxmetro.keys() if calibre.startswith("HR")]
calibres_INOX = [calibre[4:] for calibre in Velocidad_corte_segundoxmetro.keys() if calibre.startswith("INOX")]
calibres_ALUM = [calibre[4:] for calibre in Velocidad_corte_segundoxmetro.keys() if calibre.startswith("ALUM")]

# Imprimir las listas resultantes
# print("Calibres disponibles para CR:", calibres_CR)
# print("Calibres disponibles para HR:", calibres_HR)
# print("Calibres disponibles para INOX:", calibres_INOX)
# print("Calibres disponibles para ALUM:", calibres_ALUM)

