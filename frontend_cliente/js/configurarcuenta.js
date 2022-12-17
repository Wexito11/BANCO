
const url = "http://localhost:8080/cuenta/"
const url1 = "http://localhost:8080/cuenta/list"

const contenedorC = document.querySelector('tbody')

let resultadosC = ''

const modalCuentas = new bootstrap.Modal(document.getElementById('modalCuenta'))
const formCuentas = document.querySelector('form')
const idCuentas = document.getElementById('idC')
const fechas = document.getElementById('fecha')
const saldos = document.getElementById('saldo')
const idClis = document.getElementById('idCLI')

let opcion = ''

btnCrearC.addEventListener('click', () => {
    idCuentas.value = ''
    fechas.value = ''
    saldos.value = ''
    idClis.value = ''
    idCuentas.disabled = false
    fechas.disabled = false
    saldos.disabled = false
    idClis.disabled = false
    modalCuentas.show()
    opcion = 'crearC'
})

const mostrar = (Cuentas) => {
    Cuentas.forEach(Cuenta => {
        resultadosC += `<tr>
                        <td >${Cuenta.id_cuenta}</td>
                        <td >${Cuenta.fecha_apertura}</td>
                        <td >${Cuenta.saldo_cuenta}</td>
                        <td >${Cuenta.cliente.id_cliente}</td>
                        <td class="text-center" width="20%"><a class="btnEditarC btn btn-primary">Editar</a></td>
                    </tr>`
                    //alertify.confirm(resultadosC)
    })
    
    contenedorC.innerHTML = resultadosC
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

on(document, 'click', '.btnBorrarC', e => {
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


let idFormC = 0
on(document, 'click', '.btnEditarC', e => {

    const fila = e.target.parentNode.parentNode
    
    idFormC = fila.children[0].innerHTML
    fechaForm = fila.children[1].innerHTML
    const saldoForm = fila.children[2].innerHTML
    idClisForm = fila.children[3].innerHTML
    idCuentas.value = idFormC
    idCuentas.disabled = true
    fechas.value = fechaForm
    fechas.disabled = true
    saldos.value = saldoForm
    idClis.value = idClisForm
    idClis.disabled = true
    opcion = 'editarT'
    modalCuentas.show()
})

formCuentas.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crearC') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idC.value,
                    fecha_apertura: fecha.value,
                    saldo_cuenta: saldo.value,
                    id_cliente: idCLI.value
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
                    fecha_apertura: fecha.value,
                    saldo_cuenta: saldo.value,
                    id_cliente: idCLI.value
                })
            })
                .then(response => location.reload())

        }
        modalCuentas.hide()
    
})