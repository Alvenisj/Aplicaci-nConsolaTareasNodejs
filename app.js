const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
         pausa,
         leerInput,
         listadoTareasBorrar,
         confirmar,mostrarListadoChecklist
 } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async () => {

let opt = '';
const tareas = new Tareas();

const tareasDB = leerDB();

if(tareasDB) {

  tareas.cargarTareasFromArray(tareasDB);

}


do {

  opt = await inquirerMenu();

  switch (opt) {

    case '1':

    //crear opcion
    const desc = await leerInput('Descripción:');
    tareas.crearTarea( desc );
    break;

    case '2':
      //listado completo
      tareas.listadoCompleto();
       // console.log( tareas.listadoArr );
    break;

    case '3': 
     tareas.listarPendientesCompletadas(true);
    break;

    case '4': 
     tareas.listarPendientesCompletadas(false);
    break;

    case '5': 
   const ids = await mostrarListadoChecklist( tareas.listadoArr );
  tareas.toggleCompletadas( ids );

   break;

    case '6': 
     const id = await listadoTareasBorrar(tareas.listadoArr);
     if ( id !== '0' ) {
      const deleteTask = await confirmar('¿Estás seguro que deseas eliminar la tarea?');
     if(deleteTask) {
      tareas.borrarTarea( id );
      console.log('¡¡Tarea borrada exitosamente!!');
     }    
   }
   break;
  }

guardarDB( tareas.listadoArr );

 await pausa();

}while( opt !== '0');


}



main();