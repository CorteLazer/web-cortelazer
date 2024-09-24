import ezdxf
from ezdxf import recover
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
import math
import os
import matplotlib.pyplot as plt
from bibliotecas import Velocidad_corte_segundoxmetro, Valor_lamina_m2, biblioteca, calibres_ALUM, calibres_CR, calibres_HR, calibres_INOX

class DXFGraphic:
    def __init__(self, entity):
        self.entity = entity

    def calculate_perimeter(self):
        # Método genérico, puede ser sobrescrito por clases hijas según el tipo de entidad
        return 0

class DXFLine(DXFGraphic):
    def calculate_perimeter(self):
        start = self.entity.dxf.start
        end = self.entity.dxf.end
        return math.sqrt((start[0] - end[0])**2 + (start[1] - end[1])**2)

class DXFArc(DXFGraphic):
    def calculate_perimeter(self):
        radius = self.entity.dxf.radius
        start_angle = math.radians(self.entity.dxf.start_angle)
        end_angle = math.radians(self.entity.dxf.end_angle)
        return abs(radius * (end_angle - start_angle))

class DXFCircle(DXFGraphic):
    def calculate_perimeter(self):
        radius = self.entity.dxf.radius
        return 2 * math.pi * radius

class DXFLWPolyline(DXFGraphic):
    def calculate_perimeter(self):
        perimeter = 0
        points = self.entity.get_points('xyb')

        for i in range(len(points) - 1):
            point1 = points[i]
            point2 = points[i + 1]
            distance = math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)
            perimeter += distance

        if self.entity.is_closed:
            first_point = points[0]
            last_point = points[-1]
            distance = math.sqrt((first_point[0] - last_point[0])**2 + (first_point[1] - last_point[1])**2)
            perimeter += distance
        return perimeter

class DFXSpline(DXFGraphic):
    def calculate_perimeter(self):
        DISTANCE = 0.1
        points = list(self.entity.flattening(DISTANCE))
        perimeter = 0.0

        for i in range(len(points) - 1):
            pointOne = points[i]
            pointTwo = points[i + 1]
            distance = math.sqrt((pointOne[0] - pointTwo[0])**2 + (pointOne[1] - pointTwo[1])**2)
            perimeter += distance
        return perimeter

class DXFElipse(DXFGraphic):
    def calculate_perimeter(self):
        a = self.entity.dxf.major_axis.magnitude
        b = self.entity.dxf.minor_axis.magnitude

        h = ((a - b)**2) / ((a + b)**2)
        perimeter = math.pi * (a + b) * (1 + (3 * h) / (10 + math.sqrt(4 - 3 * h)))
        return perimeter

class DXFAnalyzer:
    @staticmethod
    def create():
        MATERIALES:MaterialLibrary = MaterialLibrary()
        for i in list(Velocidad_corte_segundoxmetro.keys()):
            MATERIALES.add_material(Material())
        return MATERIALES

    def __init__(self, file_path):
        self.file_path = file_path
        self.doc = ezdxf.readfile(file_path)
        self.msp = self.doc.modelspace()

    def getArea(self):
        external_polyline, maxArea = self.get_external_polyline()
        width = max(external_polyline, key=lambda p: p[0])[0] - min(external_polyline, key=lambda p: p[0])[0]
        height = max(external_polyline, key=lambda p: p[1])[1] - min(external_polyline, key=lambda p: p[1])[1]
        return width * height

    def get_external_polyline(self):
        area_max = 0
        external_polyline = None

        for entity in self.msp:
            if entity.dxftype() == 'LWPOLYLINE' and entity.is_closed:
                area = self._calculate_polyline_area(entity.get_points())
                if area > area_max:
                    area_max = area
                    external_polyline = entity.get_points()

        return external_polyline, area_max

    def _calculate_polyline_area(self, points):
        sum = 0
        for i in range(len(points)):
            p1 = points[i]
            p2 = points[(i + 1) % len(points)]
            sum += p1[0] * p2[1] - p1[1] * p2[0]
        return abs(sum) / 2

    def calculate_perimeter(self):
        perimeter = 0
        for entity in self.msp:
            graphic = self.create_dxf_graphic(entity)
            perimeter += graphic.calculate_perimeter()
        return perimeter

    def create_dxf_graphic(self, entity):
        shape = None
        match entity.dxftype():
            case 'LINE':
                shape = DXFLine(entity)
            case 'Arc':
                shape = DXFArc(entity)
            case 'CIRCLE':
                shape = DXFCircle(entity)
            case 'LWPOLYLINE':
                shape = DXFLWPolyline(entity)
            case 'SPLINE':
                shape = DFXSpline(entity)
            case _:
                shape = DXFGraphic(entity)
        return shape

    def draw_dxf(self, filePath:str):
        doc, auditor = recover.readfile(self.file_path)
        if not auditor.has_errors:
            fig = plt.figure()
            ax = fig.add_axes([0, 0, 1, 1])
            ctx = RenderContext(doc)
            out = MatplotlibBackend(ax)
            Frontend(ctx, out).draw_layout(doc.modelspace(), finalize=True)
            url = filePath
            fig.savefig(url, dpi=300)


class Material:
    def __init__(self, name, thickness, cutting_speed, sheet_value):
        self.name = name
        self.thickness = thickness
        self.cutting_speed = cutting_speed
        self.sheet_value = sheet_value

class MaterialLibrary:
    @staticmethod
    def get_material_from_dicts(material, thickness):
        phrase = f"{material}{thickness}".upper()
        speed = Velocidad_corte_segundoxmetro.get(phrase)
        value = Valor_lamina_m2.get(phrase)
        if value == None or speed == None:
            return None
        return Material(material, thickness, speed, value)

    def __init__(self):
        self.materials = {}

    def add_material(self, material):
        key = material.name + material.thickness
        self.materials[key] = material

    def get_material(self, name, thickness):
        key = name + thickness
        return self.materials.get(key)


class Calculator:
    def __init__(self, dxf_analyzer, material_library):
        self.dxf_analyzer = dxf_analyzer
        self.material_library = material_library

    def calculate_price(self, material:Material, amount:int):
        perimeter = self.dxf_analyzer.calculate_perimeter()

        # Calculating material area and perimeter
        material_area = self.dxf_analyzer.getArea()/1000000
        # print(f"Material area: {material_area} mm^2")
        # print(f"Perimeter: {perimeter} mm")

        if material:
            cutting_time = perimeter / 1000 * material.cutting_speed  # Converting perimeter from mm to meters
            # print("material cost", material.sheet_value)
            material_cost = material_area * material.sheet_value

            # Applying discounts
            discount = 60 if amount >= 250 else 57 if amount >= 225 else 55 if amount >= 200 else \
           53 if amount >= 175 else 50 if amount >= 150 else 47 if amount >= 125 else \
           45 if amount >= 100 else 42 if amount >= 75 else 40 if amount >= 50 else \
           38 if amount >= 45 else 36 if amount >= 40 else 34 if amount >= 35 else \
           32 if amount >= 30 else 30 if amount >= 25 else 28 if amount >= 20 else \
           27 if amount >= 15 else 25 if amount >= 10 else 24 if amount >= 9 else \
           23 if amount >= 8 else 22 if amount >= 7 else 21 if amount >= 6 else \
           20 if amount >= 5 else 18 if amount >= 4 else 17 if amount >= 3 else \
           15 if amount >= 2 else 0

            # print("corte:", cutting_time*500)
            # print("material:", material_cost)

            final_price = ((cutting_time * 500) + (material_cost)) * (1 - discount / 100)
            return final_price * amount
        else:
            return -1


# Example usage
if __name__ == "__main__":
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Files", "perchero_polyline_9_2432.7.dxf")
    print(1)
    dxf_analyzer = DXFAnalyzer(file_path)
    dxf_analyzer.draw_dxf()
    # material_library = MaterialLibrary()
    # print(2)
    # material_library.add_material(Material("hr", "12", 19, 130000))
    # print(3)
    # calculator = Calculator(dxf_analyzer, material_library)
    # calculator.calculate_price()
    # print(4)
