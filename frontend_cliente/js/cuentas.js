const url = "http://localhost:8080/cuenta/"
const url1 = "http://localhost:8080/cuenta/list"

const contenedor = document.querySelector('tbody')

let resultados = ''

const modalCuentas = new bootstrap.Modal(document.getElementById('modalCuenta'))
const formCuentas = document.querySelector('form')
const idCuentas = document.getElementById('idC')
const fecha = document.getElementById('fecha')
const saldo = document.getElementById('saldo')
const idClis = document.getElementById('idCLI')

let opcion = ''

btnCrearC.addEventListener('click', () => {
    IdCuentas.value = ''
    fecha.value = ''
    saldo.value = ''
    idClis.value = ''
    idClis.disabled = false
    modalCuentas.show()
    opcion = 'crear'
})

const mostrar = (Cuentas) => {
    Cuentas.forEach(Cuenta => {
        resultados += `<tr>
                        <td >${Cuenta.Id_Cuenta}</td>
                        <td >${Cuenta.Fecha_C}</td>
                        <td >${Cuenta.Saldos_C}</td>
                        <td >${Cuenta.Id_CLI}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
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

on(document, 'click', '.btnBorrar', e => {
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


let idForm = 0
on(document, 'click', '.btnEditar', e => {

    const fila = e.target.parentNode.parentNode
    
    idForm = fila.children[0].innerHTML
    idForm = fila.children[1].innerHTML
    const saldo1 = fila.children[2].innerHTML
    idForm = fila.children[4].innerHTML
    idCuentas.value = idForm
    idCuentas.disabled = true
    saldo.value = saldo1
    fecha.value = idForm
    fecha.disabled = true
    idClis.value = idForm
    idClis.disabled = true

    opcion = 'editar'
    modalCuentas.show()
})

formCuentas.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idCuentas.value,
                    fecha_apertura: fecha.value,
                    saldo_cuenta: saldo.value,
                    id_cliente: idClis.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevaCuenta = []
                    nuevaCuenta.push(data)
                    mostrar(nuevaCuenta)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idCuentas.value,
                    fecha_apertura: fecha.value,
                    saldo_cuenta: saldo.value,
                    id_cliente: idClis.value
                })
            })
                .then(response => location.reload())

        }
        modalCuentas.hide()
    
})