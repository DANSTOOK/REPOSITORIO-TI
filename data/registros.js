/* Base compartida del equipo.
   Esta es la información que todos ven al abrir la aplicación.
   Para publicar cambios: Ajustes → "Generar archivo de la base", reemplaza este
   archivo con el que se descarga y súbelo al repositorio. */

window.KBD_BASE = {
  version: 1,
  actualizado: '2026-10-02',
  entries: [
    { id: 'seed-0', folio: 'INC2764299', categoria: 'OXXO-Mx TI SopPOS.SpinbyOXXO', descripcion: 'Error al realizar retiros con QR / sin tarjeta', solucion: 'Copiar la tabla TENDER de una tienda que funcione correctamente. Referencia: tienda 50T7N-CHAPALA.', dialogo: 'Solicitan apoyo en tienda 50 por error al realizar retiros sin tarjeta de Spin.' },
    { id: 'seed-1', folio: 'INC4093079', categoria: 'OXXO-Mx TI SopPOS.Tipo_de_cambio', descripcion: 'No actualiza tipo de cambio / aperturas', solucion: 'Ejecutar la mitigación en la caja VT1 y copiar la tabla EXCHANGE_RATE de la caja de procesos a la caja 1.', dialogo: 'La caja 1 no actualiza automáticamente el tipo de cambio.' },
    { id: 'seed-2', folio: 'INC3022869', categoria: 'OXXO-Mx TI SopPOS.Performance', descripcion: 'Retiros con tarjeta no cobran comisión', solucion: '', dialogo: 'En tienda 504EP-BEGONIAS los retiros de distintos bancos no cobran comisión y se rechazan.' },
    { id: 'seed-3', folio: 'INC3153371', categoria: 'OXXO-Mx TI SopPOS DAI.Dif ValdeInv/SaldoDiario', descripcion: 'Análisis de diferencia en saldo diario', solucion: 'Asignar al segmento Tipo de cambio.', dialogo: 'Tienda 50CP7-BOCANEGRA presenta una diferencia en saldo de -3155.38.' },
    { id: 'seed-4', folio: 'INC3260995', categoria: 'OXXO-Mx TI SopPOS.OXXOPremia', descripcion: 'No descuenta puntos en saldo / Premia', solucion: '', dialogo: 'Error al redimir puntos: no descuenta la cantidad del total.' },
    { id: 'seed-5', folio: 'INC3974944', categoria: 'XPE.TI RyT NOC SC Inc Configuración por Daño de Equipo', descripcion: 'Apoyo con activación de AP', solucion: '', dialogo: 'Cambio de AP por daño. El equipo ya fue dado de alta en EVOTI.' },
    { id: 'seed-6', folio: 'INC3895268', categoria: 'OXXO-Mx TI Movilidad en Tienda.Preinventarios', descripcion: 'Categoría error movilidad', solucion: '', dialogo: 'El equipo de movilidad no guarda los preinventarios realizados.' },
    { id: 'seed-7', folio: 'INC4028880', categoria: 'OXXO-Mx TI Alta Servicios Telefonía', descripcion: 'Alta teléfono', solucion: 'Aperturas.', dialogo: 'Solicitud de alta de teléfonos IP para tiendas nuevas.' },
    { id: 'seed-8', folio: 'INC4093131', categoria: 'OXXO-Mx TI SopPOS.Performance', descripcion: 'Cierres inesperados por Premia XPOS', solucion: '', dialogo: '' },
    { id: 'seed-9', folio: 'INC4318614', categoria: '', descripcion: 'Preinventarios movilidad', solucion: '', dialogo: '' },
    { id: 'seed-10', folio: 'INC4335242', categoria: '', descripcion: 'Folios para alta equipo Meraki', solucion: '', dialogo: 'Tienda próxima apertura: equipos registrados mediante EVOTI.' },
    { id: 'seed-11', folio: 'INC4421717', categoria: '', descripcion: 'Apoyo con alta para cambio dinámico Meraki', solucion: '', dialogo: 'Alta de equipos SW y RT para cambio dinámico Cisco 800 a Meraki.' },
    { id: 'seed-12', folio: 'INC4456533', categoria: '', descripcion: 'Apoyo con revisión por bloqueo de puertos TDA Mayapán', solucion: '', dialogo: '' },
    { id: 'seed-13', folio: 'INC4540246', categoria: '', descripcion: 'Impresora de gafetes', solucion: '', dialogo: '' },
    { id: 'seed-14', folio: 'INC4540374', categoria: '', descripcion: 'Error en actualización de equipos', solucion: '', dialogo: '' },
    { id: 'seed-15', folio: 'INC4556086', categoria: '', descripcion: 'Alta de extensión telefónica tiendas nuevas', solucion: '', dialogo: 'Tienda 50CCP-TANAMA.' },
    { id: 'seed-16', folio: 'INC4768361', categoria: '', descripcion: 'Falla en RPD', solucion: '', dialogo: 'No respeta los rangos de retiro asignados.' },
    { id: 'seed-17', folio: 'INC4983118', categoria: '', descripcion: 'Fallo updater parches', solucion: '', dialogo: 'Solicita retiros a cantidades menores.' },
    { id: 'seed-18', folio: 'INC4559804', categoria: '', descripcion: 'Apoyo con archivo .DAT para tienda de apertura MAESERVCONFIG', solucion: '', dialogo: '' },
    { id: 'seed-19', folio: 'INC5768197', categoria: '', descripcion: 'Error en POSMóvil al inyectar las llaves', solucion: '', dialogo: 'Llaves no encontradas. Error 500 al vincular HH con Pin Pad. Se aplicó checklist y persiste.' },
    { id: 'seed-20', folio: 'INC5655677', categoria: 'OXXO-Mx TI Colaboración.Office 365', descripcion: 'Error en cuenta de PART tiendas nuevas', solucion: 'Generar folio a Colaboración 360 para reinicio de contraseña.', dialogo: 'Tienda nueva sin acceso al Portal de aplicaciones.' },
    { id: 'seed-21', folio: 'INC8236249', categoria: 'OXXO-MX TI RMS16.Folios POS', descripcion: 'Error en foliadores de tiendas, RMS folios POS', solucion: 'Apoyo con información de foliador de tienda Maldonado.', dialogo: 'Posterior a truene de disco se perdió la información del foliador.' },
    { id: 'seed-22', folio: 'INC8249864', categoria: 'OXXO-Mx TI SopPOS.Actualizar_Folios_de_Mov', descripcion: 'Actualizar foliadores retransición sin respaldo', solucion: '', dialogo: 'Retransición sin respaldo en caja de procesos.' },
    { id: 'seed-23', folio: 'CHECK LIST TRUENE DISCO', clase: 'checklist', categoria: 'DETENER CEDIS', descripcion: 'Checklist truene de disco', solucion: 'Foliadores\nReenvío de catálogos, promociones y precios\nDetener CEDIS\nEnviar inventario\nActivar recolección total', dialogo: 'Reenvío de catálogos, promociones y precios. Detener CEDIS, enviar inventario y activar recolección total.' },
    { id: 'seed-24', folio: 'CHECK LIST APERTURAS', clase: 'checklist', categoria: 'APERTURAS', descripcion: 'Checklist aperturas', solucion: 'Transición y planchado\nAsignación de red\nAsegurar precios, promociones y catálogos\nAltas SW, RT, AP, HH, TT\nAlta de teléfono IP\nRed y segmentación\nMovilidad', dialogo: 'Altas SW, RT, AP, HH, TT, teléfono IP, red, segmentación, movilidad.' },
    { id: 'seed-25', folio: 'INC11473557', categoria: 'OXXO-Mx TI Soporte Xmonitor.Tienda no visible', descripcion: 'Tienda no se ve en Xmonitor: próxima apertura', solucion: '', dialogo: '' }
  ]
};
