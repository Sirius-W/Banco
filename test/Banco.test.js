// tests/Registro.test.js
import { mount } from '@vue/test-utils'
import Registro from '../src/components/Registro.vue'
import Timbrado from '../src/components/Timbrado.vue'

//Registro
describe('Registro.vue', () => {
  //Letra K
  it('renderiza el componente correctamente', () => {
    const wrapper = mount(Registro)
    expect(wrapper.find('h1').text()).toBe('K')
    expect(wrapper.findAll('input').length).toBe(13) // Comprobamos que haya 6 campos input
  })

  //Codigo Postal
  it('formatea correctamente el código postal al ingresar letras y más de 5 dígitos', async () => {
    const wrapper = mount(Registro)
    wrapper.vm.formulario.codigoPostal = '12abc34567'
    await wrapper.vm.validarCodigoPostal()
    expect(wrapper.vm.formulario.codigoPostal).toBe('12345')
  })

//Regimen Fiscal
  it('formatea correctamente el régimen fiscal al ingresar letras y más de 3 dígitos', async () => {
    const wrapper = mount(Registro)
    wrapper.vm.formulario.regimenFiscal = 'a1b2c3d4'
    await wrapper.vm.validarCRegimenFiscal()
    expect(wrapper.vm.formulario.regimenFiscal).toBe('123')
  })

  //Guardar
  it('valida que "guardar" funcione correctamente cuando todos los campos están completos', async () => {
    const wrapper = mount(Registro, {
      global: {
        mocks: {
          $axios: {
            post: vitest.fn().mockResolvedValue({ data: { mensaje: 'OK' } })
          }
        }
      }
    });
  
    // Rellenar todos los campos del formulario
    wrapper.vm.formulario.rfc = "ABC123456789";
    wrapper.vm.formulario.nombre = "Juan Pérez";
    wrapper.vm.formulario.calle = "Av. Principal";
    wrapper.vm.formulario.municipio = "Ciudad";
    wrapper.vm.formulario.estado = "Estado";
    wrapper.vm.formulario.pais = "México";
    wrapper.vm.formulario.codigoPostal = "12345";
    wrapper.vm.formulario.numeroExteriorInterior = "123";
    wrapper.vm.formulario.colonia = "Centro";
    wrapper.vm.formulario.localidad = "Localidad";
    wrapper.vm.formulario.referencia = "Cerca del parque";
    wrapper.vm.formulario.usoCfdi = "G01";
    wrapper.vm.formulario.regimenFiscal = "601";
  
    // Espiar el método cancelar para confirmar si se llama
    const cancelarSpy = vitest .spyOn(wrapper.vm, 'cancelar');
  
    // Ejecutar guardar
    await wrapper.vm.guardar();
  
    // Verifica que se haya hecho la solicitud POST con los datos correctos
    expect(wrapper.vm.$axios.post).toHaveBeenCalledWith(
      'https://2358f168-7dbe-4c38-880a-0b3470f80ffc.mock.pstmn.io',
      wrapper.vm.formulario
    );
  
    // Verifica que se haya llamado al método cancelar (lo que indica que guardó correctamente)
    expect(cancelarSpy).toHaveBeenCalled();
  });
  

//Cancelar
  it('valida que "cancelar" limpia los campos', async () => {
    const wrapper = mount(Registro)
    wrapper.vm.formulario.rfc = "ABC123456789"
    wrapper.vm.formulario.nombre = "Juan Pérez"
    wrapper.vm.formulario.calle = "Av. Principal"
    wrapper.vm.formulario.municipio = "Ciudad"
    wrapper.vm.formulario.estado = "Estado"
    wrapper.vm.formulario.pais = "México"
    wrapper.vm.formulario.codigoPostal = "12345"
    wrapper.vm.formulario.numeroExteriorInterior = "123"
    wrapper.vm.formulario.colonia = "Centro"
    wrapper.vm.formulario.localidad = "Localidad"
    wrapper.vm.formulario.referencia = "Cerca del parque"
    wrapper.vm.formulario.usoCfdi = "G01"
    wrapper.vm.formulario.regimenFiscal = "601"

    await wrapper.vm.cancelar()

    expect(wrapper.vm.formulario.rfc).toBe('')
    expect(wrapper.vm.formulario.nombre).toBe('')
    expect(wrapper.vm.formulario.calle).toBe('')
    expect(wrapper.vm.formulario.municipio).toBe('')
    expect(wrapper.vm.formulario.estado).toBe('')
    expect(wrapper.vm.formulario.pais).toBe('')
    expect(wrapper.vm.formulario.codigoPostal).toBe('')
    expect(wrapper.vm.formulario.numeroExteriorInterior).toBe('')
    expect(wrapper.vm.formulario.colonia).toBe('')
    expect(wrapper.vm.formulario.localidad).toBe('')
    expect(wrapper.vm.formulario.referencia).toBe('')
    expect(wrapper.vm.formulario.usoCfdi).toBe('')
    expect(wrapper.vm.formulario.regimenFiscal).toBe('')
    
  })
})


//Timbrado
describe('Timbrado.vue', () => {

  // Verifica que el título se renderice correctamente
  it('renderiza el título correctamente', () => {
    const wrapper = mount(Timbrado)
    expect(wrapper.find('.titulo').text()).toBe('Timbrado')
  })

  // Verifica la inicialización del formulario con los valores por defecto
  it('los campos del formulario se inicializan correctamente', () => {
    const wrapper = mount(Timbrado)
    const { formulario } = wrapper.vm

    expect(formulario.comision).toBe('$')
    expect(formulario.iva).toBe('$')
    expect(formulario.concepto).toBe('')
    expect(formulario.cantidad).toBe('')
    expect(formulario.cambio).toBe('$')
    expect(formulario.unitario).toBe('$')
  })

  // Verifica que el método "guardar" funcione correctamente con campos completos
  it('valida que "guardar" funcione correctamente cuando todos los campos están completos', async () => {
    const wrapper = mount(Timbrado, {
      global: {
        // Se simula una instancia de axios con una respuesta mock
        mocks: {
          $axios: {
            post: vitest.fn().mockResolvedValue({ data: { mensaje: 'OK' } })
          }
        }
      }
    });

    // Se completan los campos del formulario con datos válidos
    wrapper.vm.formulario.comision = "$23123.23";
    wrapper.vm.formulario.iva = "$2124.43";
    wrapper.vm.formulario.concepto = "Justificacion";
    wrapper.vm.formulario.cantidad = "100";
    wrapper.vm.formulario.cambio = "$232.42";
    wrapper.vm.formulario.unitario = "$123123.23";

    // Se espía el método cancelar para verificar que se llama después de guardar
    const cancelarSpy = vitest.spyOn(wrapper.vm, 'cancelar');

    // Se llama al método guardar
    await wrapper.vm.guardar();

    // Verifica que se haya realizado la petición POST con los datos del formulario
    expect(wrapper.vm.$axios.post).toHaveBeenCalledWith(
      'https://2358f168-7dbe-4c38-880a-0b3470f80ffc.mock.pstmn.io',
      wrapper.vm.formulario
    );

    // Verifica que se haya llamado el método cancelar, lo cual indica éxito en el guardado
    expect(cancelarSpy).toHaveBeenCalled();
  });

  // Verifica que el campo "comision" se formatee correctamente al escribir
  it('formatea correctamente el campo comision al escribir', async () => {
    const wrapper = mount(Timbrado)
    const input = wrapper.find('#comision')

    // Se simula la entrada del usuario en el campo "comision"
    await input.setValue('1234.56')
    await input.trigger('input')

    // Verifica que el valor haya sido formateado correctamente
    expect(wrapper.vm.formulario.comision).toBe('$1234.56')
  })

})
