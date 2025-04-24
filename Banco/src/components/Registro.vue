como quedaria el paso 4 en mi codigo

<template>
  <!-- Contenedor principal que usa un gradiente de fondo -->
  <div id="contenedorPrincipal">
    <!-- Texto en grande, "K", para el fondo -->
    <h1 class="letra">K</h1>

    <!-- Contenedor secundario donde se encuentran los campos del formulario -->
    <div id="contenedorSecundario">
      <!-- Título de la sección -->
      <div class="titulo">
        <h1>Registro de nuevo contribuyente</h1>
      </div>

      <!-- Campo de entrada para el RFC -->
      <div class="fila">
        <h1>RFC</h1>
        <input type="text" v-model="formulario.rfc" oninput="this.value = this.value.toUpperCase();" maxlength="13"
          placeholder="--RFC--" required />
      </div>

      <!-- Campo de entrada para el nombre -->
      <div class="fila">
        <h1>Nombre</h1>
        <input type="text" v-model="formulario.nombre" placeholder="--Nombre--" required />
      </div>

      <!-- Campos de entrada para la dirección (calle, municipio, estado, país, etc.) -->
      <div class="fila">
        <h1>Calle</h1>
        <input type="text" v-model="formulario.calle" placeholder="--Calle--" required />
      </div>
      <div class="fila">
        <h1>Municipio</h1>
        <input type="text" v-model="formulario.municipio" placeholder="--Municipio--" required />
      </div>
      <div class="fila">
        <h1>Estado</h1>
        <input type="text" v-model="formulario.estado" placeholder="--Estado--" required />
      </div>
      <div class="fila">
        <h1>País</h1>
        <input type="text" v-model="formulario.pais" placeholder="--Pais--" required />
      </div>

      <!-- Campo de entrada para el Código Postal, con validación -->
      <div class="fila">
        <h1>Código Postal</h1>
        <input type="text" v-model="formulario.codigoPostal" @input="validarCodigoPostal" maxlength="5"
          placeholder="--Codigo Postal--" required />
      </div>

      <!-- Otros campos del formulario (número exterior, colonia, localidad, etc.) -->
      <div class="fila">
        <h1>Número Exterior e Interior</h1>
        <input type="text" v-model="formulario.numeroExteriorInterior" placeholder="--Num Ext e Int.--" required />
      </div>
      <div class="fila">
        <h1>Colonia</h1>
        <input type="text" v-model="formulario.colonia" placeholder="--Colonia--" required />
      </div>
      <div class="fila">
        <h1>Localidad</h1>
        <input type="text" v-model="formulario.localidad" placeholder="--Localidad--" required />
      </div>
      <div class="fila">
        <h1>Referencia</h1>
        <input type="text" v-model="formulario.referencia" placeholder="--Referencia--" required />
      </div>

      <!-- Campo para el uso CFDI -->
      <div class="fila">
        <h1>Uso CFDI</h1>
        <input type="text" v-model="formulario.usoCfdi" placeholder="--CFDI--" required />
      </div>

      <!-- Campo para el régimen fiscal, con validación -->
      <div class="fila">
        <h1>Regimen Fiscal</h1>
        <input type="text" v-model="formulario.regimenFiscal" @input="validarCRegimenFiscal" maxlength="3"
          placeholder="--Regimen Fiscal--" required />
      </div>

      <!-- Botones para guardar y cancelar -->
      <div class="botones">
        <!-- Botón para guardar datos -->
        <button class="btn_guardar" @click="guardar">
          Guardar
        </button>

        <!-- Botón para cancelar y limpiar los datos -->
        <button class="btn_guardar" @click="cancelar">
          Cancelar
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  // Definición del componente Vue, en este caso "RegistroContribuyente"
  name: "RegistroContribuyente",

  // Estado reactivo del componente: los campos del formulario
  data() {
    return {
      formulario: {
        rfc: "",
        nombre: "",
        calle: "",
        municipio: "",
        estado: "",
        pais: "",
        codigoPostal: "",
        numeroExteriorInterior: "",
        colonia: "",
        localidad: "",
        referencia: "",
        usoCfdi: "",
        regimenFiscal: "",
      },
      isSubmitting: false,  // Bandera para evitar envío múltiple (aunque no se usa actualmente)
    };
  },

  methods: {
    // Método para validar que el Código Postal sea solo numérico y de máximo 5 caracteres
    validarCodigoPostal(event) {
      this.formulario.codigoPostal = this.formulario.codigoPostal.replace(/[^0-9]/g, '').slice(0, 5);
    },

    // Método para validar que el Régimen Fiscal sea solo numérico y de máximo 3 caracteres
    validarCRegimenFiscal(event) {
      this.formulario.regimenFiscal = this.formulario.regimenFiscal.replace(/[^0-9]/g, '').slice(0, 3);
    },

    // Método que se ejecuta al hacer clic en el botón "Guardar"
    guardar() {
      // Verificamos que todos los campos estén completos
      const campos = Object.entries(this.formulario); // Convertimos el formulario en un arreglo de [clave, valor]
      const camposVacios = campos.filter(([clave, valor]) => valor.trim() === ''); // Filtramos los vacíos

      // Si hay campos vacíos, mostramos un mensaje de alerta con los campos faltantes
      if (camposVacios.length > 0) {
        const nombresCampos = camposVacios.map(([clave]) => this.formatearCampo(clave)).join(', '); // Obtenemos los nombres de los campos vacíos
        alert(`Por favor llena todos los campos. Campos vacíos: ${nombresCampos}`);
        return; // Detenemos la ejecución
      }

      // Si todo está correcto, mostramos los datos en la consola
      console.log("Datos del formulario:", this.formulario);
      alert("Datos guardados correctamente (ver consola).");
    },

    // Método que se ejecuta al hacer clic en el botón "Cancelar"
    cancelar() {
      // Limpiamos todos los campos del formulario
      for (let campo in this.formulario) {
        this.formulario[campo] = "";
      }
      alert("Formulario limpiado.");
    },

    // Función auxiliar para dar formato a los nombres de los campos (por ejemplo, RFC -> 'RFC')
    formatearCampo(campo) {
      switch (campo) {
        case 'rfc': return 'RFC';
        case 'nombre': return 'Nombre';
        case 'calle': return 'Calle';
        case 'municipio': return 'Municipio';
        case 'estado': return 'Estado';
        case 'pais': return 'País';
        case 'codigoPostal': return 'Código Postal';
        case 'numeroExteriorInterior': return 'Número Exterior e Interior';
        case 'colonia': return 'Colonia';
        case 'localidad': return 'Localidad';
        case 'referencia': return 'Referencia';
        case 'usoCfdi': return 'Uso CFDI';
        case 'regimenFiscal': return 'Régimen Fiscal';
        default: return campo;
      }
    }
  }
};
</script>

<style scoped>
/* Estilos generales del contenedor principal con gradiente de fondo */
#contenedorPrincipal {
  background: linear-gradient(rgb(32, 38, 49), rgb(32, 38, 49), whitesmoke, whitesmoke, rgb(89, 110, 137));
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: fixed; /* Asegura que cubra toda la ventana */
  top: 0;
  left: 0;
}

/* Estilos del texto grande "K" en el fondo */
.letra {
  position: absolute;
  height: 120%;
  width: 50%;
  color: rgb(58, 72, 91);
  font-size: 250px;
  pointer-events: none;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

/* Estilos para el contenedor del formulario */
#contenedorSecundario {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(76, 95, 118);
  box-shadow: 0 8px 32px 0 rgb(89, 110, 137);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 85%;
  width: 30%;
}

/* Estilos para el título dentro del contenedor */
.titulo {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.titulo h1 {
  font-size: 20px;
  color: whitesmoke;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  text-align: center;
  margin: 0;
}

/* Estilos para los campos de entrada (input) */
.fila {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 15px;
}

.fila h1 {
  width: 30%;
  font-size: 15px;
  color: whitesmoke;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  text-align: left;
}

.fila input {
  width: 70%;
  padding: 5px 10px;
  font-family: 'Poppins', sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
}

/* Estilos para los botones */
.botones {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
}

.btn_guardar {
  color: whitesmoke;
  font-family: 'Poppins', sans-serif;
  border-radius: 12px;
  width: 48%;
  height: 40px;
  background-color: rgb(32, 38, 49);
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.btn_guardar:hover {
  box-shadow: 0 0 15px whitesmoke;
  transform: scale(1.03);
}

/* Estilos para los placeholders */
input::placeholder {
  text-align: center;
}
</style>
