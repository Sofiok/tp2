/*Local de ventas de PCs
Una empresa de venta de computadoras está desarrollando un sistema para llevar registro de ventas. 
Para ello cuenta con la siguiente información:

Lista de las vendedoras de la empresa
Lista de ventas. Un array con objetos. 
Cada objeto representa una venta y tiene las propiedades fecha, nombreVendedora (un String con el nombre), 
componentes (un array Strings con el nombre de cada componente vendido).
Lista de precios de los componentes, de la forma (nombre componente, precio).*/

var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }

  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};
/*Se pide desarrollar las siguientes funciones:

1) precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar 
con esos 
componentes, que es la suma de los precios de cada componente incluido*/


const precioMaquina = (componentes) => {
  let preciosFiltrados = local.precios.filter(item => {
    if (componentes.includes(item.componente)) {
      return item
    }
  })
  
  return preciosFiltrados.reduce((acc, obj) => { return acc + obj.precio; }, 0);
}
console.log( precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

// Esta es otra manera que se me ocurrio para resolverlo 
const precioMaquina1 = (componentes) => {
  return local.precios.reduce((acc, obj) => { 
    if (componentes.includes(obj.componente)) {
      return acc + obj.precio
    } else {
      return acc
    }
  }, 0);
}


console.log( precioMaquina1(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

/*
2)cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, 
o sea que formó parte de una máquina que se vendió. 
La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
*/
const cantidadVentasComponente = (componente) => {
  return local.ventas.reduce((acc, obj) => { 
    if (obj.componentes.includes(componente)) {
      return acc + 1
    } else {
      return acc
    }
  }, 0);
}

console.log( cantidadVentasComponente("Monitor ASC 543") ); // 2
console.log( cantidadVentasComponente("Monitor GPRS 3000") ); // 3
/*
3)vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) 
y devuelve el nombre de la vendedora que más vendió en plata en el mes. 
O sea no cantidad de ventas, sino importe total de las ventas. 
El importe de una venta es el que indica la función precioMaquina. 
El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
*/

const vendedoraDelMes = (mes, anio) => {
  let ventas = {}
  local.ventas.forEach(venta => { 
    if ((venta.fecha.getMonth() == mes-1) && venta.fecha.getFullYear() == anio) {
      ventas[venta.nombreVendedora] = (ventas[venta.nombreVendedora] || 0 ) + precioMaquina(venta.componentes)
    }
  })
  return Object.keys(ventas).reduce((acc, obj) => {
    if (ventas[acc] > ventas[obj]) {
     return acc
    } 
    else {
      return obj
    } 
  })
}



console.log( vendedoraDelMes(1, 2019) ); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

/*
4)ventasMes(mes, anio): Obtener las ventas de un mes. 
El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
*/

const ventasMes = (mes, anio) => {
  let total = 0
  local.ventas.forEach(venta => { 
    if ((venta.fecha.getMonth() == mes-1) && venta.fecha.getFullYear() == anio) {
      total = total + precioMaquina(venta.componentes)
    }
  })
  return total
}


console.log( ventasMes(1, 2019) ); // 1250

/*
5)ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
*/
const ventasVendedora = (nombre) => {
  let total = 0
  local.ventas.forEach(venta => { 
    if (venta.nombreVendedora == nombre) {
      total = total + precioMaquina(venta.componentes)
    }
  })
  return total
}

console.log( ventasVendedora("Grace") ); // 900
/*
6)componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. 
El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente*/

const componenteMasVendido = () => {
  let ventas = {}
  local.ventas.forEach(venta => { 
    venta.componentes.forEach(componente => {
      if(!(componente in ventas)) {
        ventas[componente] = cantidadVentasComponente(componente)
      }
    })
  })
  return Object.keys(ventas).reduce((acc, obj) => {
    if (ventas[acc] > ventas[obj]) {
     return acc
    } 
    else {
      return obj
    } 
  })
}

console.log( componenteMasVendido() ); // Monitor GPRS 3000
/*
7)huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. 
El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
*/

const huboVentas = (mes, anio) => {
  const ventas = local.ventas.filter(venta => {
    if ((venta.fecha.getMonth() == mes-1) && venta.fecha.getFullYear() == anio) {
      return venta
    }
  })  
  return ventas.length > 0
}

console.log( huboVentas(3, 2019) ); // false

/*Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la 
sucursal en la cual se realizó. Por ejemplo: { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", 
componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }. Por este cambio, se pide:

8)En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro 
(ya que es la sucursal original).



9)Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

10)Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, 
nombreVendedora, componentes, sucursal

// 12/02/2019, "Hedy", [Monitor GPRS 3000, HDD Toyiva], Centro
// 24/02/2019, "Sheryl", [Motherboard ASUS 1500, HDD Wezter Dishital], Caballito
// 01/02/2019, "Ada", [Motherboard MZI, RAM Quinston Fury], Centro
// 11/02/2019, Grace, [Monitor ASC 543, RAM Quinston], Caballito
// 15/02/2019, Ada, [Motherboard ASUS 1200, RAM Quinston Fury], Centro
// 12/02/2019, Hedy, [Motherboard ASUS 1500, HDD Toyiva], Caballito
// 21/02/2019, Grace, [Motherboard MZI, RAM Quinston], Centro
// 08/02/2019, Sheryl, [Monitor ASC 543, HDD Wezter Dishital], Centro
// 16/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston Fury], Centro
// 27/02/2019, Hedy, [Motherboard ASUS 1200, HDD Toyiva], Caballito
// 22/02/2019, Grace, [Monitor ASC 543, HDD Wezter Dishital], Centro
// 05/02/2019, Ada, [Motherboard ASUS 1500, RAM Quinston], Centro
// 01/02/2019, Grace, [Motherboard MZI, HDD Wezter Dishital], Centro
// 07/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston], Caballito
// 14/02/2019, Ada, [Motherboard ASUS 1200, HDD Toyiva], Centro

*/

const poblarDatos = () => {
  local.ventas.forEach(venta => {
   venta["sucursal"] = "Centro"
  })

  local.ventas.push(
    { fecha: new Date(2019,1,12), nombreVendedora:"Hedy" , componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal:"Centro"},
    { fecha: new Date(2019,1,24), nombreVendedora:"Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal:"Caballito"},
    { fecha: new Date(2019,1,1), nombreVendedora:"Ada" , componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal:"Centro"},
    { fecha: new Date(2019,1,11), nombreVendedora:"Grace" , componentes: ["Monitor ASC 543", "RAM Quinston"],sucursal:"Caballito"},
    { fecha: new Date(2019,1,15), nombreVendedora:"Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"],sucursal:"Centro"},
    { fecha: new Date(2019,1,12), nombreVendedora:"Hedy" , componentes: ["Motherboard ASUS 1500", "HDD Toyiva"],sucursal:"Caballito"},
    { fecha: new Date(2019,1,21), nombreVendedora:"Grace", componentes: ["Motherboard MZI", "RAM Quinston"],sucursal:"Centro"},
    { fecha: new Date(2019,1,8), nombreVendedora:"Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"],sucursal:"Centro"},
    { fecha: new Date(2019,1,16), nombreVendedora:"Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"],sucursal:"Centro"},
    { fecha: new Date(2019,1,27), nombreVendedora:"Hedy" , componentes: ["Motherboard ASUS 1200", "HDD Toyiva"],sucursal:"Caballito"},
    { fecha: new Date(2019,1,22), nombreVendedora:"Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"],sucursal:"Centro"},
    { fecha: new Date(2019,1,5), nombreVendedora:"Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"],sucursal:"Centro"},
    { fecha: new Date(2019,1,1), nombreVendedora:"Grace" , componentes: ["Motherboard MZI", "HDD Wezter Dishital"],sucursal:"Centro"},
    { fecha: new Date(2019,1,7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"],sucursal:"Caballito"},
    { fecha: new Date(2019,1,14), nombreVendedora:"Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"],sucursal:"Centro"}
    )
  

}
poblarDatos()

/*10)Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal 
sin límite de fecha.*/

const ventasSucursal = (sucursal) => {
 let total = 0
 local.ventas.forEach(venta => { 
   if (venta.sucursal == sucursal ) {
     total = total + precioMaquina(venta.componentes)
    }
 })
 return total
}

console.log( ventasSucursal("Centro") ); // 4195
/*11)Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, 
ya que es la misma funcionalidad pero trabajando con una propiedad distinta. 
Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?*/

/* Defnir una funcion que reciba dos parametros como abajo, para asi utilizarla en lugar de 
ventasSucursal y ventasVendedora (pasandole el atributo a evaular y el valor objetivo)

const ventasAtributo = (atributo, valor) => {
  let total = 0
  local.ventas.forEach(venta => { 
    if (venta[atributo] == valor ) {
      total = total + precioMaquina(venta.componentes)
     }
  })
  return total
 }*/

/*
12)Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, 
(mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. 
No cantidad de ventas, sino importe total de las ventas. 
El importe de una venta es el que indica la función precioMaquina. 
El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
*/ 
const sucursalDelMes = (mes, anio) => {
  let ventas = {}
  local.ventas.forEach(venta => { 
    if ((venta.fecha.getMonth() == mes-1) && venta.fecha.getFullYear() == anio) {
      ventas[venta.sucursal] = (ventas[venta.sucursal] || 0 ) + precioMaquina(venta.componentes)
    }
  })
  return Object.keys(ventas).reduce((acc, obj) => {
    if (ventas[acc] > ventas[obj]) {
     return acc
    } 
    else {
      return obj
    }
  })
}
console.log( sucursalDelMes(1, 2019) ); // "Centro"


/*13)Para tener una mejor muestra de como está resultando el local, 
queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. 
Para esto, necesitamos crear las siguientes funciones:*/
const formatearReporte = (fuente, campo) => {
  let respuesta = `Ventas por ${campo}: \n`
  Object.keys(fuente).forEach(a => {
    respuesta += `  Total de ${a}: ${fuente[a]} \n`
  })
  return respuesta
}
//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const renderPorMes = () => {
  let ventas = {}
  let ventasOrdenadas = local.ventas.sort((a, b) =>  {
    return a.fecha - b.fecha;
  })
  ventasOrdenadas.forEach(venta => { 
    let mes = venta.fecha.toLocaleString('en-us', { month: 'long' });
    ventas[mes + " " + venta.fecha.getFullYear()] = (ventas[mes + " " + venta.fecha.getFullYear()] || 0 ) + precioMaquina(venta.componentes)
  })
  return formatearReporte(ventas, "mes")
}
console.log( renderPorMes() );
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210


//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {
  let ventas = {}
  local.ventas.forEach(venta => { 
      ventas[venta.sucursal] = (ventas[venta.sucursal] || 0 ) + precioMaquina(venta.componentes)
  })
 return formatearReporte(ventas, "sucursal")
}
console.log( renderPorSucursal() );
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265


//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const mejorVendedora = () =>{
  let ventas = {}
  local.ventas.forEach(venta => { 
    ventas[venta.nombreVendedora] = (ventas[venta.nombreVendedora] || 0 ) + precioMaquina(venta.componentes)
   })
   
   return Object.keys(ventas).reduce((acc, obj) => {
    if (ventas[acc] > ventas[obj]) {
     return acc
    } 
    else {
      return obj
    } 
  })
}
   
  const render = () => { 
  
  return "Reporte \n" + renderPorMes() + "\n" + renderPorSucursal() + "Producto estrella: " + componenteMasVendido() 
  + "\nVendedora que mas ingresos genero: " + mejorVendedora()
  }

console.log( render() );
// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
//Vendedora que más ingresos generó:Grace