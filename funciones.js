import {
  edit,
  getAll,
  remove,
  save,
  selectOne,
  existeRun,
} from "./firebase.js";

let id = 0;

document.getElementById("btnGuardar").addEventListener("click", async () => {
  document.querySelectorAll(".form-control").forEach((item) => {
    verificar(item.id);
  });
  if (document.querySelectorAll(".is-invalid").length == 0) {
    const bombero = {
      run: document.getElementById("run").value,
      nom: document.getElementById("nombre").value.trim(),
      ape: document.getElementById("apellido").value.trim(),
      compania: document.getElementById("compania").value.trim(),
      cargo: document.getElementById("cargo").value.trim(),
      clave: document.getElementById("clave").value.trim(),
      fecha: document.getElementById("fecha").value,
      correo: document.getElementById("correo").value,
    };
    if (document.getElementById("btnGuardar").value == "Guardar") {
      const exist = await existeRun(document.getElementById("run").value);
      if (exist) {
        Swal.fire({
          title: "!Error!",
          text: "El Run del Bombero Existe, no es posible guardarlo nuevamente",
          icon: "error",
        });
      } 
      else {
        save(bombero);
        Swal.fire({
          title: "!Hecho!",
          text: "El Bombero se ha guardado correctamente.",
          icon: "success",
        });
      }
    } 
    else {
      edit(id, bombero);
      id = 0;
      Swal.fire({
        title: "¡Hecho!",
        text: "Los datos del Bombero han sido Editados.",
        icon: "success",
      });
    }
    limpiar();
  } 
  else {
    Swal.fire({
      title: "¡Error!",
      text: "No fue posible guardar al Bombero. Por favor, revisa los campos.",
      icon: "error",
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  getAll((bomberos) => {
    let tabla = "";
    bomberos.forEach((doc) => {
      const item = doc.data();

      tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.compania}</td>
                <td>${item.cargo}</td>
                <td>${item.clave}</td>
                <td>${item.fecha}</td>
                <td>${item.correo}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`;
    });
    document.getElementById("contenido").innerHTML = tabla;
    document.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", () => {
        Swal.fire({
          title: "¿Está seguro que desea eliminar el registro del Bombero?",
          text: "Esto es irreversible.",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            remove(btn.id);
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro del Bombero ha sido eliminado.",
              icon: "success",
            });
          }
        });
      });
    });
    document.querySelectorAll(".btn-warning").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const bom = await selectOne(btn.id);
        const item = bom.data();
        document.getElementById("run").value = item.run;
        document.getElementById("nombre").value = item.nom;
        document.getElementById("apellido").value = item.ape;
        document.getElementById("compania").value = item.compania;
        document.getElementById("cargo").value = item.cargo;
        document.getElementById("clave").value = item.clave;
        document.getElementById("fecha").value = item.fecha;
        document.getElementById("correo").value = item.correo;
        document.getElementById("btnGuardar").value = "Editar";
        document.getElementById("run").readOnly = true;
        id = btn.id;
      });
    });
  });
});

