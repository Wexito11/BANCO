const url = "http://localhost:8080/transaccion/"
const url1 = "http://localhost:8080/transaccion/list"

const contenedorTU = document.querySelector('tbody')

let resultadosTU = ''

const modalTransaccionesU = new bootstrap.Modal(document.getElementById('modalTransaccionU'))
const formCuentasU = document.querySelector('form')
const idTRsU = document.getElementById('idTRU')
const fechasTU = document.getElementById('fechaTU')
const valoresU = document.getElementById('valorTU')
const tiposU = document.getElementById('tipoTU')
const idCTsU = document.getElementById('idCTU')

let opcion = ''

btnCrearT.addEventListener('click', () => {
    idTRsU.value = ''
    fechasTU.value = ''
    valoresU.value = ''
    tiposU.value = ''
    idCTsU.value = ''
    idTRsU.disabled = true
    tiposU.disabled = false
    fechasTU.disabled = false
    valorTU.disabled = false
    idCTsU.disabled = false
    modalTransaccionesU.show()
    opcion = 'crearTU'
})

const mostrar = (TransaccionesU) => {
    TransaccionesU.forEach(TransaccionU => {
        resultadosTU += `<tr>
                        <td >${TransaccionU.id_transaccion}</td>
                        <td >${TransaccionU.fecha_transaccion}</td>
                        <td >${TransaccionU.valor_transaccion}</td>
                        <td >${TransaccionU.tipo_transaccion}</td>
                        <td >${TransaccionU.cuenta.id_cuenta}</td>
                        <td class="text-center" width="20%"><a class="btnEditarTU btn btn-primary">Editar</a><a class="btnBorrarTU btn btn-danger">Borrar</a></td>
                    </tr>`
                    Alertify.confirm(resultadosT)
    })
    
    contenedorTU.innerHTML = resultadosTU
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

on(document, 'click', '.btnBorrarTU', e => {
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


let idTRFormU = 0
on(document, 'click', '.btnEditarTU', e => {

    const fila = e.target.parentNode.parentNode
    
    idTRFormU = fila.children[0].innerHTML
    fechaTForU = fila.children[1].innerHTML
    const valorFormU = fila.children[2].innerHTML
    tipoFormU = fila.children[3].innerHTML
    idCTFormU = fila.children[4].innerHTML
    idTRsU.value = idTRFormU
    idTRsU.disabled = true
    fechasTU.value = fechaTFormU
    fechasTU.disabled = true
    valoresU.value = valorFormU
    tiposU.value = tipoFormU
    tiposU.disabled = true
    idCTsU.value = idCTFormU
    idCTsU.disabled = true
    opcion = 'editarTU'
    modalTransaccionesU.show()
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
                    id_transaccion: idTRsU.value,
                    fecha_transaccion: fechasTU.value,
                    valor_transaccion: valoresU.value,
                    tipo_transaccion: tiposU.value,
                    id_cuenta: idCTsU.value
                }
                
                )
            })
                .then(response => response.json())
                .then(data => {
                    const nuevaTransaccion = []
                    nuevaTransaccion.push(data)
                    mostrar(nuevaTransaccion)
                })
        }
        if (opcion == 'editarTU') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_transaccion: idTRsU.value,
                    fecha_transaccion: fechasTU.value,
                    valor_transaccion: valoresU.value,
                    tipo_transaccion: tiposU.value,
                    id_cuenta: idCTsU.value
                })
            })
                .then(response => location.reload())

        }
        modalTransaccionesU.hide()
    
})