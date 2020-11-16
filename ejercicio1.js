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
  let subset = local.precios.filter(item => {
    if (componentes.includes(item.componente)) {
      return item
    }
  })
  
  return subset.reduce((acc, obj) => { return acc + obj.precio; }, 0);
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


