const url = "http://localhost:8080/administrador/"
const url1 = "http://localhost:8080/administrador/list"

const contenedorA = document.querySelector('tbody')

let resultadosA = ''

const modalAdministradores = new bootstrap.Modal(document.getElementById('modalAdministrador'))
const formAdmin = document.querySelector('form')
const idAdmin = document.getElementById('idA')
const nombreAdmin = document.getElementById('nombreA')
const claveAdmin = document.getElementById('claveA')

let opcion = ''

btnCrearA.addEventListener('click', () => {
    idAdmin.value = ''
    nombreAdmin.value = ''
    claveAdmin.value = ''
    idAdmin.disabled = false
    nombreAdmin.disabled = false
    claveAdmin.disabled = false
    modalAdministradores.show()
    opcion = 'crearA'
})

const mostrar = (Administradores) => {
    Administradores.forEach(Administrador => {
        resultadosA += `<tr>
                        <td >${Administrador.id_administrador}</td>
                        <td >${Administrador.nombre_administrador}</td>
                        <td >${Administrador.clave_administrador}</td>
                        <td class="text-center" width="20%"><a class="btnEditarA btn btn-primary">Editar</a><a class="btnBorrarA btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedorA.innerHTML = resultadosA
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

on(document, 'click', '.btnBorrarA', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar el Admin "+id,
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


let idFormAS = 0
on(document, 'click', '.btnEditarA', e => {

    const fila = e.target.parentNode.parentNode
    
    idFormAs = fila.children[0].innerHTML
    const nombreAs = fila.children[1].innerHTML
    const claveAs = fila.children[2].innerHTML
    idAdmin.value = idFormAs
    idAdmin.disabled = true
    nombreAdmin.value = nombreAs
    claveAdmin.value = claveAs

    opcion = 'editarA'
    modalAdministradores.show()
})

formAdmin.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crearA') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_administrador: idAdmin.value,
                    nombre_administrador: nombreAdmin.value,
                    clave_administrador: claveAdmin.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevoAdmin = []
                    nuevoAdmin.push(data)
                    mostrar(nuevoAdmin)
                })
        }
        if (opcion == 'editarA') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_administrador: idAdmin.value,
                    nombre_administrador: nombreAdmin.value,
                    clave_administrador: claveAdmin.value
                })
            })
                .then(response => location.reload())

        }
        modalAdministradores.hide()
    
})