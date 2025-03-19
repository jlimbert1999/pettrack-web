import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { lastValueFrom } from 'rxjs';
import { pet } from '../../infrastructure';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async generateCard(pet: pet) {
    // Generar el código QR
    const qrData = 'Código único: 12345';
    console.log(pet.image);
    // const petImage =  await this.convertImageABase64("images/no-image.png")

    // const docDefinition: TDocumentDefinitions = {
    //   pageSize: { width: 242, height: 153 }, // Tamaño aproximado de una tarjeta de crédito (85.6mm x 53.98mm)
    //   pageMargins: [10, 10, 10, 10], // Márgenes
    //   content: [
    //     {
    //       table: {
    //         widths: ['30%', '70%'], // Proporción de la imagen y la información
    //         body: [
    //           [
    //             {
    //               ...(pet.image
    //                 ? {
    //                     // Imagen de la mascota
    //                     marginTop:30,
    //                     image: await this.convertImageABase64(pet.image),
    //                     width: 60,
    //                     height: 60,
    //                     alignment: 'center',
    //                   }
    //                 : {
    //                     width: 60,
    //                     height: 60,
    //                     canvas: [
    //                       {
    //                         type: 'rect',
    //                         x: 0,
    //                         y: 0,
    //                         w: 60,
    //                         h: 60,
    //                         lineWidth: 1,
    //                       },
    //                     ],
    //                   }),
    //             },
    //             {
    //               stack: [
    //                 {
    //                   text: `Nombre: ${pet.name}`,
    //                   bold: true,
    //                   fontSize: 12,
    //                   margin: [0, 0, 0, 5],
    //                   alignment:'center'
    //                 },
    //                 {
    //                   text: `Codigo: ${pet.code}`,
    //                   fontSize: 10,
    //                   margin: [0, 0, 0, 5],
    //                   alignment:'center'

    //                 },
    //                 {
    //                   // Código QR generado por pdfMake
    //                   qr: 'http://10.0.38.30:55600/verify}',
    //                   fit: 60, // Ajustar el tamaño del QR
    //                   alignment: 'center',
    //                 },
    //               ],
    //             },
    //           ],
    //         ],
    //       },
    //       layout: 'noBorders', // Sin bordes en la tabla
    //     },
    //   ],
    // };

    // Generar el PDF
    const documentDefinition: TDocumentDefinitions = {
      pageSize: { width: 300, height: 200 }, // Tamaño tipo credencial
      header: {
        fillColor: '#5bc0de',
        // style: 'header',
        
        text: 'sd',
        // table: {
        //   widths: '*',
        //   body: [
        //     [
        //       {
        //         border: [false, false, false, false],
        //         fillColor: '#5bc0de',
        //         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        //       },
        //     ],
        //   ],
        // },
      },
      content: [
        { text: 'PET IDENTITY CARD', style: 'header', alignment: 'center' },
        {
          columns: [
            // {
            //   image: petImage,
            //   width: 80,
            //   height: 80,
            //   alignment: 'center',
            // },
            {
              stack: [
                { text: 'Nombre: Firulais', style: 'infoText' },
                { text: 'ID: 0000 1234 5678', style: 'infoText' },
                { text: 'Dueño: Juan Pérez', style: 'infoText' },
              ],
              margin: [10, 10, 0, 0],
            },
          ],
        },
        {
          columns: [
            // { image: 'data:image/png;base64,...', width: 20 }, // Ícono de dirección
            { text: 'Calle 123, Ciudad', style: 'infoText' },
          ],
          margin: [0, 5, 0, 0],
        },

        {
          columns: [
            // { image: 'data:image/png;base64,...', width: 20 }, // Ícono de teléfono
            { text: '987-654-321', style: 'infoText' },
          ],
          margin: [0, 5, 0, 0],
        },
        {
          qr: qrData,
          fit: 70,
          alignment: 'center',
          margin: [0, 10, 0, 0],
        },
      ],
      styles: {
        header: { fontSize: 16, bold: true, fillColor: '#f2f2f2' },
        infoText: { fontSize: 10, margin: [5, 2, 0, 0] },
      },
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  convertImageABase64(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fetch(path)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          reject(`Error generate image Base64: ${error}`);
        });
    });
  }
}
