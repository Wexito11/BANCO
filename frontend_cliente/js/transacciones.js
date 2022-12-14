const url = "http://localhost:8080/transaccion/"
const url1 = "http://localhost:8080/transaccion/list"

const contenedorT = document.querySelector('tbody')

let resultadosT = ''

const modalTransacciones = new bootstrap.Modal(document.getElementById('modalTransaccion'))
const formCuentas = document.querySelector('form')
const idTRs = document.getElementById('idTR')
const fechasT = document.getElementById('fechaT')
const valores = document.getElementById('valorT')
const tipos = document.getElementById('tipoT')
const idCTs = document.getElementById('idCT')

let opcion = ''

btnCrearT.addEventListener('click', () => {
    idTRs.value = ''
    fechasT.value = ''
    valores.value = ''
    tipos.value = ''
    idCTs.value = ''
    idTRs.disabled = true
    tipos.disabled = false
    fechasT.disabled = false
    valorT.disabled = false
    idCTs.disabled = false
    modalTransacciones.show()
    opcion = 'crearT'
})

const mostrar = (Transacciones) => {
    Transacciones.forEach(Transaccion => {
        resultadosT += `<tr>
                        <td >${Transaccion.id_transaccion}</td>
                        <td >${Transaccion.fecha_transaccion}</td>
                        <td >${Transaccion.valor_transaccion}</td>
                        <td >${Transaccion.tipo_transaccion}</td>
                        <td >${Transaccion.cuenta.id_cuenta}</td>
                        <td class="text-center" width="20%"><a class="btnEditarT btn btn-primary">Editar</a><a class="btnBorrarT btn btn-danger">Borrar</a></td>
                    </tr>`
                    //alertify.confirm(resultadosT)
    })
    
    contenedorT.innerHTML = resultadosT
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

on(document, 'click', '.btnBorrarT', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar la transaccion "+id,
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
on(document, 'click', '.btnEditarT', e => {

    const fila = e.target.parentNode.parentNode
    
    idTRForm = fila.children[0].innerHTML
    fechaTForm = fila.children[1].innerHTML
    const valorForm = fila.children[2].innerHTML
    tipoForm = fila.children[3].innerHTML
    idCTForm = fila.children[4].innerHTML
    idTRs.value = idTRForm
    idTRs.disabled = true
    fechasT.value = fechaTForm
    fechasT.disabled = true
    valores.value = valorForm
    tipos.value = tipoForm
    tipos.disabled = true
    idCTs.value = idCTForm
    idCTs.disabled = true
    opcion = 'editarT'
    modalTransacciones.show()
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
                    fecha_transaccion: fechaT.value,
                    valor_transaccion: valor.value,
                    tipo_transaccion: tipo.value,
                    id_cuenta: idTRs.value
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
                    fecha_transaccion: fechaT.value,
                    valor_transaccion: valor.value,
                    tipo_transaccion: tipo.value,
                    id_cuenta: idTRs.value
                })
            })
                .then(response => location.reload())

        }
        modalCuentas.hide()
    
})