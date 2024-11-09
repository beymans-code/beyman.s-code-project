import { Injectable } from '@angular/core';
import { TableConfig } from '../../dynamic-components/models/dynamic-table.model';

/**
 * Servicio de la tabla.
 */
@Injectable()
export class ProductTableService {

  /**
   * Configuracion inical de la tabla.
   */
  public tableConfig: TableConfig = {
    columns: [
      {
        headerText: 'Logo',
        key: 'logo',
        mask: 'logo',
        sticky: 'left',
      },
      {
        headerText: 'Nombre del producto',
        key: 'productName',
      },
      {
        headerText: 'Descripción',
        key: 'description',
      },
      {
        headerText: 'Fecha de liberación',
        key: 'date1',
        mask: 'date',
      },
      {
        headerText: 'Fecha de reestructuración',
        key: 'date2',
        mask: 'date',
      }
    ],
    id: 'tabla1',
    rows: [

      {
        id: '1',
        logo: 'SR',
        productName: 'Seguro todo riesgo',
        description: 'Cubre accidentes de transito...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '2',
        logo: 'SA',
        productName: 'Seguro de auto',
        description: 'Cubre tu vehiculo...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '3',
        logo: 'SM',
        productName: 'Seguro moto',
        description: 'Cubre tu moto...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '4',
        logo: 'SV',
        productName: 'Seguro vida',
        description: 'Cubre tus necesidades...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '5',
        logo: 'SC',
        productName: 'Seguro movil',
        description: 'Cubre tu celular...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '6',
        logo: 'ST',
        productName: 'Seguro trabajo',
        description: 'Cubre accidentes laborales...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '7',
        logo: 'SP',
        productName: 'Seguro mascotas',
        description: 'Cubre tu mascota...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '8',
        logo: 'SH',
        productName: 'Seguro vivienda',
        description: 'Cubre tu casa...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '9',
        logo: 'SA',
        productName: 'Seguro viajes',
        description: 'Cubre tus viajes...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '10',
        logo: 'SS',
        productName: 'Seguro salud',
        description: 'Cubre tu salud...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '11',
        logo: 'SX',
        productName: 'Seguro pertenencias',
        description: 'Cubre tus pertenencias...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '12',
        logo: 'SR',
        productName: 'Seguro robo',
        description: 'Ce cubre en caso de robo...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '13',
        logo: 'SY',
        productName: 'Seguro general',
        description: 'Cubre varios aspectos de tu vida...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '14',
        logo: 'S1',
        productName: 'Seguro mascotas premium',
        description: 'Cubre tu mascota (mayores beneficios)...',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '15',
        logo: '15',
        productName: 'Seguro 15',
        description: 'Descripcion Seguro 15',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '16',
        logo: '16',
        productName: 'Seguro 16',
        description: 'Descripcion Seguro 16',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '17',
        logo: '17',
        productName: 'Seguro 17',
        description: 'Descripcion Seguro 17',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '18',
        logo: '18',
        productName: 'Seguro 18',
        description: 'Descripcion Seguro 18',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '19',
        logo: '19',
        productName: 'Seguro 19',
        description: 'Descripcion Seguro 19',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },

      {
        id: '20',
        logo: '20',
        productName: 'Seguro 20',
        description: 'Descripcion Seguro 20',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },

      {
        id: '21',
        logo: '21',
        productName: 'Seguro 21',
        description: 'Descripcion Seguro 21',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '22',
        logo: '22',
        productName: 'Seguro 22',
        description: 'Descripcion Seguro 22',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },

      {
        id: '23',
        logo: '23',
        productName: 'Seguro 23',
        description: 'Descripcion Seguro 23',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '24',
        logo: '24',
        productName: 'Seguro 24',
        description: 'Descripcion Seguro 24',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },

      {
        id: '25',
        logo: '25',
        productName: 'Seguro 25',
        description: 'Descripcion Seguro 25',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '26',
        logo: '26',
        productName: 'Seguro 26',
        description: 'Descripcion Seguro 26',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '27',
        logo: '27',
        productName: 'Seguro 27',
        description: 'Descripcion Seguro 27',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '28',
        logo: '28',
        productName: 'Seguro 28',
        description: 'Descripcion Seguro 28',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '29',
        logo: '29',
        productName: 'Seguro 29',
        description: 'Descripcion Seguro 29',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '30',
        logo: '30',
        productName: 'Seguro 30',
        description: 'Descripcion Seguro 30',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '31',
        logo: '31',
        productName: 'Seguro 31',
        description: 'Descripcion Seguro 31',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '32',
        logo: '32',
        productName: 'Seguro 32',
        description: 'Descripcion Seguro 32',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '33',
        logo: '33',
        productName: 'Seguro 33',
        description: 'Descripcion Seguro 33',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '34',
        logo: '34',
        productName: 'Seguro 34',
        description: 'Descripcion Seguro 34',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '35',
        logo: '35',
        productName: 'Seguro 35',
        description: 'Descripcion Seguro 35',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '36',
        logo: '36',
        productName: 'Seguro 36',
        description: 'Descripcion Seguro 36',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '37',
        logo: '37',
        productName: 'Seguro 37',
        description: 'Descripcion Seguro 37',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '38',
        logo: '38',
        productName: 'Seguro 38',
        description: 'Descripcion Seguro 38',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '39',
        logo: '39',
        productName: 'Seguro 39',
        description: 'Descripcion Seguro 39',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },      
      {
        id: '40',
        logo: '40',
        productName: 'Seguro 40',
        description: 'Descripcion Seguro 40',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '41',
        logo: '41',
        productName: 'Seguro 41',
        description: 'Descripcion Seguro 41',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '42',
        logo: '42',
        productName: 'Seguro 42',
        description: 'Descripcion Seguro 42',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '43',
        logo: '43',
        productName: 'Seguro 43',
        description: 'Descripcion Seguro 43',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '44',
        logo: '44',
        productName: 'Seguro 44',
        description: 'Descripcion Seguro 44',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '45',
        logo: '45',
        productName: 'Seguro 45',
        description: 'Descripcion Seguro 45',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '46',
        logo: '46',
        productName: 'Seguro 46',
        description: 'Descripcion Seguro 46',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '47',
        logo: '47',
        productName: 'Seguro 47',
        description: 'Descripcion Seguro 47',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '48',
        logo: '48',
        productName: 'Seguro 48',
        description: 'Descripcion Seguro 48',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
      {
        id: '49',
        logo: '49',
        productName: 'Seguro 49',
        description: 'Descripcion Seguro 49',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },      
      {
        id: '50',
        logo: '50',
        productName: 'Seguro 50',
        description: 'Descripcion Seguro 50',
        date1: '2023-12-13',
        date2: '2023-12-13'
      },
    ],
    options: {
      actions: {
        delete: true,
        edit: true
      },
      filter: true,
      rowId: 'id',
    }
  }
}






	
	
	
	
	
	
	

	
	
	