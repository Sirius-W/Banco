<template>
  <div id="Menu">

    <h1 class="letra">K</h1>

    <div class="centro">

      <div class="titulo">
        Timbrado
      </div>

      <div class="campo">
        <h3>1.Comision total Sin IVA</h3>
        <input type="number" v-model="formulario.comisionTotalSinIva" placeholder="$0.00" />
      </div>

      <div class="campo">
        <h3>2.IVA</h3>
        <input type="number" v-model="formulario.iva" placeholder="$0.00" />
      </div>

      <div class="campo">
        <h3>3.Concepto</h3>
        <input type="text" v-model="formulario.concepto" placeholder="Ingrese el concepto" />
      </div>

      <div class="campo">
        <h3>4.Cantidad</h3>
        <input type="number" v-model="formulario.cantidad" placeholder="Ingrese la cantidad" />
      </div>

      <div class="campo">
        <h3>5.Tipo de Cambio</h3>
        <input type="number" v-model="formulario.tipoCambio" placeholder="Ingrese la cantidad" />
      </div>

      <div class="campo">
        <h3>6.Valor Unitario:</h3>
        <input type="number" v-model="formulario.valorUnitario" placeholder="Ingrese el valor unitario" />
      </div>

      <div class="botones">
        <button class="btn_guardar" @click="guardar">
          Guardar
        </button>

        <button class="btn_cancelar" @click="cancelar">
          Cancelar
        </button>
      </div>

    </div>
  </div>

</template>


<script>
export default {
  name: "Timbrado",

  data() {
    return {
      formulario: {
        comisionTotalSinIva: "",
        iva: "",
        concepto: "",
        cantidad: "",
        tipoCambio: "",
        valorUnitario: "",
      },
      isSubmitting: false,
    };
  },

  methods: {
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
        case 'comisionTotalSinIva': return 'Comision Total Sin Iva';
        case 'iva': return 'IVA';
        case 'concepto': return 'Concepto';
        case 'cantidad': return 'Cantidad';
        case 'tipoCambio': return 'Tipo Cambio';
        case 'valorUnitario': return 'Valor Unitario';
        default: return campo;
      }
    }
  }
};
</script>


<style scoped>
#Menu {
  background: linear-gradient(rgb(22, 22, 22), rgb(22, 22, 22), whitesmoke, whitesmoke, rgba(89, 110, 137));
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
}

.centro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
  height: 55%;
  width: 32%;
}

.campo {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: rgb(51, 58, 68);
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(40%);
  gap: 5px;
}

.botones {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: rgb(51, 58, 68);
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(40%);
  gap: 5px;
}

.campo h3 {
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;

}

.campo input {
  background: rgb(255, 255, 255);
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  padding: 5px 10px;
  border: none;
  margin-bottom: 20px;
  color: rgb(0, 0, 0);
}

h3 {
  font-size: 15px;
  margin-bottom: 5px;
  color: white;
  min-width: 250px;
  text-shadow: 0px 0px 2px rgb(255, 255, 255);

}

.btn_guardar {
  margin-top: 15px;
  color: whitesmoke;
  border-radius: 12px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(25, 28, 34);
  height: 35px;
  width: 70px;
  margin-right: 15px;
}

.btn_cancelar {
  margin-top: 15px;
  color: whitesmoke;
  border-radius: 12px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(25, 28, 34);
  height: 35px;
  width: 70px;
  margin-right: 15px;
}

.btn_guardar:hover {
  box-shadow: 0 0 15px whitesmoke;
  transform: scale(1.03);
}

.btn_cancelar:hover {
  box-shadow: 0 0 15px whitesmoke;
  transform: scale(1.03);
}

.titulo {
  font-size: 15px;
  color: white;
  min-width: 250px;
  text-shadow: 0px 0px 2px rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: rgb(51, 58, 68);
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(40%);
  gap: 5px;
}

.letra {
  position: absolute;
  height: 120%;
  width: 50%;
  color: rgb(255, 0, 0);
  font-size: 250px;
  pointer-events: none;
  font-weight: bold;

}
</style>