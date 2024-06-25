const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'run') {
            if (!validarRun(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El RUN ingresado no es válido</span>'
            }
        }
        if (id == 'fecha') {
            if (validarFecha(input.value) < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha esta a futuro</span>'
            }
        }
        if (id == 'correo') {
            if (!validaEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El correo no tiene el formato correcto</span>'
            }
        }
    }
}   

const confirmarLimpiar = () => {
    Swal.fire({
        title: "¿Desea Limpiar todos los campos del formulario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, limpiar"
    }).then((result) => {
        if (result.isConfirmed) {
            limpiar()
        }
    })
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })

    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}


const soloNumero = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = (resta / (1000 * 60 * 60 * 24))
    return dia.toFixed(0)
}

const validaEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(email))
        return false
    return true
}

const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') 
            const digv = tmp[1];  
            const rut = tmp[0]; 
            if (digv == 'K') digv = 'k'
            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}
