var firebaseConfig = {
    apiKey: "AIzaSyBGqKET3EeQ37QI6TUM25Uj6LU3QxCsjGs",
    authDomain: "practica1-764a3.firebaseapp.com",
    databaseURL: "https://practica1-764a3.firebaseio.com",
    projectId: "practica1-764a3",
    storageBucket: "practica1-764a3.appspot.com",
    messagingSenderId: "194097680350",
    appId: "1:194097680350:web:697a8d7e740ec47999574f",
    measurementId: "G-F6BE7XKXBP"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var canciones = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Disco = {
            id, //matricula:id
            nombre,
            canciones,
            genero,
        }

        //console.log(Disco);

        firebase.database().ref('Discos/' + id).update(Disco).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Discos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Disco){
    
    if(Disco!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Disco.id;
        cell2.innerHTML = Disco.nombre; 
        cell3.innerHTML = Disco.canciones;
        cell4.innerHTML = Disco.genero; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Disco.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Disco.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Discos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Discos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Disco){
    if(Disco!=null)
    {
        document.getElementById("Input1").value=Disco.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Disco.nombre;
        document.getElementById("Input3").value=Disco.canciones;
        document.getElementById("Input4").value=Disco.genero;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Discos");
    ref.orderByChild("genero").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Disco){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Disco.id;
    cell2.innerHTML = Disco.nombre; 
    cell3.innerHTML = Disco.canciones;
    cell4.innerHTML = Disco.genero; 
   
}