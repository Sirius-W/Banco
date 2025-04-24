// tests/pruebas.test.js
import { mount } from '@vue/test-utils'
import pruebas from '../src/components/pruebas.vue'

//Letra K
describe('pruebas.vue', () => {
  it('renderiza el componente correctamente', () => {
    const wrapper = mount(pruebas)
    expect(wrapper.find('h1').text()).toBe('K')
    expect(wrapper.findAll('input').length).toBe(13) // Comprobamos que haya 6 campos input
  })

  //Codigo Postal
  it('formatea correctamente el código postal al ingresar letras y más de 5 dígitos', async () => {
    const wrapper = mount(pruebas)
    wrapper.vm.formulario.codigoPostal = '12abc34567'
    await wrapper.vm.validarCodigoPostal()
    expect(wrapper.vm.formulario.codigoPostal).toBe('12345')
  })

//Regimen Fiscal
  it('formatea correctamente el régimen fiscal al ingresar letras y más de 3 dígitos', async () => {
    const wrapper = mount(pruebas)
    wrapper.vm.formulario.regimenFiscal = 'a1b2c3d4'
    await wrapper.vm.validarCRegimenFiscal()
    expect(wrapper.vm.formulario.regimenFiscal).toBe('123')
  })

  //Guardar
  it('valida que "guardar" funcione correctamente cuando todos los campos están completos', async () => {
    const wrapper = mount(pruebas, {
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
    const wrapper = mount(pruebas)
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
