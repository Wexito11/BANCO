const url = "http://localhost:8080/cliente/"
const url1 = "http://localhost:8080/cliente/list"
const url2= "http://localhost:8080/administrador/"
const url3 = "http://localhost:8080/administrador/list"

const contenedor = document.querySelector('tbody')

let resultados = ''

const modalClientes = new bootstrap.Modal(document.getElementById('modalCliente'))
const formClientes = document.querySelector('form')
const idCliente = document.getElementById('id')
const nombreCliente = document.getElementById('nombre')
const claveCliente = document.getElementById('clave')
const User = document.getElementById('user')
const Clave = document.getElementById('contraseña')

let opcion = ''

NuevoUser.addEventListener('click', () => {
    idCliente.value = ''
    nombreCliente.value = ''
    claveCliente.value = ''
    idCliente.disabled = false
    nombreCliente.disabled = false
    claveCliente.disabled = false
    //alert("si")
    modalClientes.show()
    opcion = 'crear'
})

const mostrar = (Clientes) => {
    Clientes.forEach(Cliente => {
        resultados += `<tr>
                        <td >${Cliente.id_cliente}</td>
                        <td >${Cliente.nombre_cliente}</td>
                        <td >${Cliente.clave_cliente}</td>
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

on(document, 'click', '.NuevoUser', e => {
    window.open (document.IndexCliente.js)
})



formClientes.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: idCliente.value,
                    nombre_cliente: nombreCliente.value,
                    clave_cliente: claveCliente.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevoCliente = []
                    nuevoCliente.push(data)
                    mostrar(nuevoCliente)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: idCliente.value,
                    nombre_cliente: nombreCliente.value,
                    clave_cliente: claveCliente.value
                })
            })
                .then(response => location.reload())

        }
        modalClientes.hide()
    
})


