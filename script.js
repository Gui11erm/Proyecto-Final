/* 
    PARA LA PRIMER PRE-ENTREGA VOY A DESARROLLAR
    UN SIMULADOR

    

*/

class Producto {
    constructor (nombreProducto, laboratorio, trazabilidad, costo, precio, stock, sector){
        this.nombreProducto = nombreProducto
        this.laboratorio = laboratorio
        this.trazabilidad = trazabilidad
        this.costo = costo
        this.precio = (precio = (this.costo * 1.30) * 1.21)
        this.stock = stock
        this.sector  = sector
    }
    // METODOS PRODUCTO
    
    // AUMENTO Y DISMINUCION DE STOCK 
    aumentarStock() { 
        this.stock += ingresoStock
    }

    disminuirStock() {
        if((this.stock - egresoStock) < 0) {
            alert(`El producto ${this.nombreProducto} no puede tener producto negativo.`)
        } else {
            this.stock -= egresoStock
        }
    }

    //AUMENTO PRECIO --- porcAumento = 1.x, x siendo el % de aumento
    aumentarPrecio() {
        this.precio *= porcAumento
    }

    //DISMINUYE PRECIO --- porcDisminucion = 0.x, x siedo el % de disminucion
    disminuirPrecio() {
        this.precio *= porcDisminucion
    }

    //IVA PRODUCTO 1.21
    IVA() {

    }
}

// UN INVENTARIO CON EXISTENCIAS
const producto1 = new Producto ("ACTRON 600 X 30", "LABORATORIOS BAYER", "7501318634756", 403.5, 609.28, 60, "A01")
const producto2 = new Producto ("TAFIROL 1G X 50", "GENOMMA LAB", "7798140258667", 700, 1057, 200, "A02")
const producto3 = new Producto ("TAFIROL 1G X 100", "GENOMMA LAB", "4040404040401", 1500, 2265, 250, "A03")
const producto4 = new Producto ("LOSACOR 50 X 30", "ROEMMERS SAICF", "7795345009636", 1800, 2718, 50, "A04")
const producto5 = new Producto ("TAFIRO 1G X 24", "GENOMMA LAB", "1071500089", 441, 665.98, 200, "A05")

// CONSTITUIMOS UN ARRAY PARA ALOJAR TODOS LOS PRODUCTOS
const productos = [producto1, producto2, producto3, producto4, producto5]
console.table(productos)

let i = 1

do{
    // INICIAMOS CONSULTANDO AL USUARIO
    if(i === 1){
        consulta = prompt("¿Quiere realizar un registro? (SI / NO)").toLowerCase()
        i = i++
    } else (consulta = prompt("¿Quiere realizar otro registro? (SI / NO)").toLowerCase())

    if (consulta !== "si" && consulta !== "no"){
        alert("Ingrese como respuesta SI o NO.")
    }

    if(consulta === "si"){
        operacion = prompt("Ingrese que tipo de operción quiere realizar:\n\n[1] INGRESO DE NUEVOS PRODUCTOS\n[2] REPORTES DE STOCK (mal estado, no se encuentra producto)\n[3] FACTURACION\n[4] CREDITOS\n[5] ACTUALIZACION DE DATOS DE PRODUCTOS\n[6] CONSULTAR DATOS").toLowerCase()
        /*
            1   INGRESO DE PRODUCTOS    aumentarStock
            2   REPORTES DE STOCK       disminuirStock
            3   FACTURACION             disminuirStock
            4   CREDITOS                aumentarStock
            5   ACTUALIZACION DE DATOS  aumentarPrecio / disminuirPrecio 
            6   CONSULTAR DATOS         
        */
        
        if(operacion == "1") { //INGRESO DE PRODUCTOS  aumentarStock
            trazabilidad = prompt("Ingrese el numero de trazabilidad del producto:")
            let index = (productos.findIndex(producto => producto.trazabilidad == trazabilidad))
                
            if(index == -1) {
                alert("EL PRODUCTO NO SE ENCUENTRA REGISTRADO EN LA BASE DE DATOS.\n\nA CONTINUACIÓN INGRESE LOS DATOS SOLICITADOS DEL PRODUCTO PARA INGRESARLO.")

                let producto = new Producto (
                prompt(`Ingrese el nombre del producto:`).toUpperCase(),
                prompt(`Ingrese el laboratorio fabricante:`).toUpperCase(),
                prompt(`Ingrese la trazabilidad:`).toUpperCase(),
                parseFloat(prompt(`Ingrese el costo:`)),
                parseInt(prompt("Ingrese la cantidad (stock):")),
                prompt(`Ingrese el sector que le quiere asignar:`).toUpperCase())
                    
            productos.push(producto)
            } else {
                console.log(index)
                ingresoStock = parseInt(prompt(`Ingrese la cantidad de ${productos[index].nombreProducto}:`))
                while(isNaN(ingresoStock) || (ingresoStock < 0 || ingresoStock == 0)){
                alert("STOCK NO VALIDO. Ingrese una cantidad mayor a cero:")
                ingresoStock = parseInt(prompt(`Ingrese la cantidad de ${productos[index].nombreProducto}:`))
                }
            productos[index].aumentarStock(ingresoStock)
            console.table(productos)
            }

        }
        if(operacion == "2") { //REPORTES DE STOCKS    disminuirStock
            trazabilidad = prompt("Ingrese el numero de trazabilidad del producto:")
            let index = (productos.findIndex(producto => producto.trazabilidad == trazabilidad))
                
            if(index == -1) {
                alert("EL PRODUCTO NO SE ENCUENTRA REGISTRADO EN LA BASE DE DATOS.\n\nPRIMERO INGRESE EL PRODUCTO A LA BASE (OPCION [1]), POSTERIOR A ESO GENERE UN REPORTE.")
            }else{
                motivo = prompt(`Ingrese el motivo del reporte para el producto ${productos[index].nombreProducto}`)

                egresoStock = parseInt(prompt(`Ingrese la cantidad de unidades afectadas de ${productos[index].nombreProducto}`))
                while(isNaN(egresoStock) || (egresoStock < 0 || egresoStock == 0)) {
                    alert("STOCK NO VALIDO. Ingrese una cantidad mayor a cero:")
                    egresoStock = parseInt(prompt(`Ingrese la cantidad de unidades afectadas de ${productos[index].nombreProducto}`))
                }
                productos[index].disminuirStock(egresoStock)

                console.log(`${egresoStock} unidades de ${productos[index].nombreProducto} se han dado de baja del stock.\n\nMOTIVO:\n${motivo}`)
                
                console.table(productos)
            }
        }

        if(operacion == "3") {
            cliente = prompt("Ingrese el nombre de la persona / entidad a facturar:").toUpperCase()
            
            console.log(cliente)
            let carrito = [], nombreProducto
            do {
                nombreProducto = prompt("Ingrese el producto a facturar:").toUpperCase()
                let index = (productos.findIndex(producto => producto.nombreProducto == nombreProducto))
                while(index != -1){
                    alert("EL PRODUCTO NO SE ENCUENTRA REGISTRADO EN LA BASE DE DATOS O LE FALTA SER MAS ESPECÍFICO EN EL NOMBRE DEL PRODUCTO.\n")
                    nombreProducto = prompt("Ingrese el producto a facturar:").toUpperCase()
                    index = (productos.findIndex(producto => producto.nombreProducto == nombreProducto))
                }
                    
                egresoStock = parseInt(prompt(`Ingrese la cantidad de ${nombreProducto} a facturar:`))
                console.log(`${nombreProducto}   ${egresoStock}`)
                carrito.push(nombreProducto, egresoStock)
            } while (nombreProducto != "OK")

            }

        }
} while (consulta !== "no")

