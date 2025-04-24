<template>
    <div id="Menu">
        <h1 class="letra">K</h1>
        <div class="centro">
            <div class="titulo">Timbrado</div>
            <div class="campo" id="siniva">
                <h3>1.
                    Comision total SIN IVA
                </h3>
                <input type="text" v-model="formulario.comision" id="comision" name="comision" placeholder="$0.00"
                    @input="formatearMoneda('comision', $event)" required />
            </div>
            <div class="campo" id="iva">
                <h3>2.
                    IVA
                </h3>
                <input type="text" v-model="formulario.iva" id="IVA" name="IVA" placeholder="$0.00"
                    @input="formatearMoneda('iva', $event)" required />
            </div>
            <div class="campo" id="concepto">
                <h3>3.
                    Concepto
                </h3>
                <input type="text" v-model="formulario.concepto" id="Concepto" name="concepto"
                    placeholder="Ingrese el concepto" required />
            </div>
            <div class="campo" id="cantidad">
                <h3>4.
                    Cantidad
                </h3>
                <input type="text" v-model="formulario.cantidad" id="Cantidad" name="cantidad"
                    placeholder="Ingrese la cantidad" @input="validarUnidad" required />
            </div>
            <div class="campo" id="tipodecambio">
                <h3>5.
                    Tipo de Cambio
                </h3>
                <input type="text" v-model="formulario.cambio" id="tipodecambio" name="tipodecambio" placeholder="$0.00"
                    @input="formatearMoneda('cambio', $event)" required />
            </div>
            <div class="campo" id="valorunitario">
                <h3>6.
                    Valor Unitario:
                </h3>
                <input type="text" v-model="formulario.unitario" id="valorunitario" name="valorunitario"
                    placeholder="$0.00" @input="formatearMoneda('unitario', $event)" required />
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
                comision: "$",
                iva: "$",
                concepto: "",
                cantidad: "",
                cambio: "$",
                unitario: "$",
            },
            isSubmitting: false,
            datosApi: null,
        };
    },

    methods: {
        formatearMoneda(campo, event) {
            let valor = this.formulario[campo];
            const input = event.target;

            // Eliminar el símbolo $ si ya existe
            valor = valor.replace(/^\$/, "");
            // Permitir solo números y un único punto decimal
            valor = valor.replace(/[^0-9.]/g, "");
            valor = valor.replace(/(\..*?)\./g, "$1"); // Eliminar puntos adicionales

            // Limitar los decimales a dos
            const partes = valor.split(".");
            if (partes.length > 1) {
                partes[1] = partes[1].substring(0, 2); // Limitar a dos decimales
                valor = partes.join(".");
            }

            // Agregar el símbolo $ al inicio
            this.formulario[campo] = `$${valor}`;
        },

        validarUnidad(event) {
            this.formulario.cantidad = this.formulario.cantidad.replace(/[^0-9]/g, '');
        },

        guardar() {
            if (this.isSubmitting) return;

            const campos = Object.entries(this.formulario);
            const camposVacios = campos.filter(([_, valor]) => valor.trim() === '');
            if (camposVacios.length > 0) {
                const nombresCampos = camposVacios.map(([clave]) => this.formatearCampo(clave)).join(', ');
                alert(`Por favor llena todos los campos. Campos vacíos: ${nombresCampos}`);
                return;
            }

            this.isSubmitting = true;

            this.$axios.post('https://2358f168-7dbe-4c38-880a-0b3470f80ffc.mock.pstmn.io', this.formulario)
                .then((respuesta) => {
                    console.log('Respuesta del servidor:', respuesta.data);
                    alert('Datos guardados correctamente.');
                    this.cancelar();
                })
                .catch((error) => {
                    console.error('Error al guardar los datos:', error);
                    alert('Hubo un error al guardar los datos. Verifica tu conexión o intenta más tarde.');
                })
                .finally(() => {
                    this.isSubmitting = false;
                });
        },
        cancelar() {
            for (let campo in this.formulario) {
                this.formulario[campo] = "";
            }
            alert("Formulario limpiado.");
        },

        formatearCampo(campo) {
            switch (campo) {
                case 'comision': return 'Comision total Sin IVA';
                case 'iva': return 'IVA';
                case 'concepto': return 'Concepto';
                case 'cantidad': return 'Cantidad';
                case 'cambio': return 'Tipo de Cambio';
                case 'unitario': return 'Valor Unitario';
            }
        }
    },

    mounted() {
        // Asegurarse de que los campos de moneda tengan el símbolo $ al cargar el componente
        this.formulario.comision = "$";
        this.formulario.iva = "$";
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
    height: 85%;
    width: 50%;
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
    color: whitesmoke;
    border-radius: 12px;
    width: 38%;
    height: 40px;
    background-color: rgb(32, 38, 49);
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
}

.btn_cancelar {
    color: whitesmoke;
    border-radius: 12px;
    width: 38%;
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
    height: 133%;
    width: 70%;
    color: rgb(58, 72, 91);
    font-size: 205px;
    pointer-events: none;
    font-weight: bold;

}
</style>