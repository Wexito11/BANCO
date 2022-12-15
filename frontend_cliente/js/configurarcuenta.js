
const url = "http://localhost:8080/cuenta/"
const url1 = "http://localhost:8080/cuenta/list"

const contenedorCU = document.querySelector('tbody')

let resultadosCU = ''

const modalCuentasU = new bootstrap.Modal(document.getElementById('modalCuentaU'))
const formCuentasU = document.querySelector('form')
const idCuentasU = document.getElementById('idCU')
const fechasU = document.getElementById('fechaU')
const saldosU = document.getElementById('saldoU')
const idClisU = document.getElementById('idCLIU')

let opcion = ''

btnCrearC.addEventListener('click', () => {
    idCuentasU.value = ''
    fechasU.value = ''
    saldosU.value = ''
    idClisU.value = ''
    idCuentasU.disabled = false
    fechasU.disabled = false
    saldosU.disabled = false
    idClisU.disabled = false
    modalCuentasU.show()
    opcion = 'crearCU'
})

const mostrar = (Cuentas) => {
    Cuentas.forEach(Cuenta => {
        resultadosCU += `<tr>
                        <td >${Cuenta.id_cuenta}</td>
                        <td >${Cuenta.fecha_apertura}</td>
                        <td >${Cuenta.saldo_cuenta}</td>
                        <td >${Cuenta.cliente.id_cliente}</td>
                        <td class="text-center" width="20%"><a class="btnEditarCU btn btn-primary">Editar</a><a class="btnBorrarCU btn btn-danger">Borrar</a></td>
                    </tr>`
                    //alertify.confirm(resultadosC)
    })
    
    contenedorCU.innerHTML = resultadosCU
}

fetch(url1)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrarCU', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar la cuenta "+id,
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})


let idFormCU = 0
on(document, 'click', '.btnEditarC', e => {

    const fila = e.target.parentNode.parentNode
    
    idFormCU = fila.children[0].innerHTML
    fechaFormU = fila.children[1].innerHTML
    const saldoFormU = fila.children[2].innerHTML
    idClisFormU = fila.children[3].innerHTML
    idCuentasU.value = idFormCU
    idCuentasU.disabled = true
    fechasU.value = fechaFormU
    fechasU.disabled = true
    saldosU.value = saldoFormU
    idClisU.value = idClisFormU
    idClisU.disabled = true
    opcion = 'editarTU'
    modalCuentasU.show()
})

formCuentasU.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crearCU') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idCU.value,
                    fecha_apertura: fechaU.value,
                    saldo_cuenta: saldoU.value,
                    id_cliente: idCLIU.value
                }
                
                )
            })
                .then(response => response.json())
                .then(data => {
                    const nuevaCuenta = []
                    nuevaCuenta.push(data)
                    mostrar(nuevaCuenta)
                })
        }
        if (opcion == 'editarT') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idC.value,
                    fecha_apertura: fechaU.value,
                    saldo_cuenta: saldoU.value,
                    id_cliente: idCLIU.value
                })
            })
                .then(response => location.reload())

        }
        modalCuentasU.hide()
    
})