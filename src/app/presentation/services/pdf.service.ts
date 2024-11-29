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

    const docDefinition: TDocumentDefinitions = {
      pageSize: { width: 242, height: 153 }, // Tamaño aproximado de una tarjeta de crédito (85.6mm x 53.98mm)
      pageMargins: [10, 10, 10, 10], // Márgenes
      content: [
        {
          table: {
            widths: ['30%', '70%'], // Proporción de la imagen y la información
            body: [
              [
                {
                  ...(pet.image
                    ? {
                        // Imagen de la mascota
                        marginTop:30,
                        image: await this.convertImageABase64(pet.image),
                        width: 60,
                        height: 60,
                        alignment: 'center',
                      }
                    : {
                        width: 60,
                        height: 60,
                        canvas: [
                          {
                            type: 'rect',
                            x: 0,
                            y: 0,
                            w: 60,
                            h: 60,
                            lineWidth: 1,
                          },
                        ],
                      }),
                },
                {
                  stack: [
                    {
                      text: `Nombre: ${pet.name}`,
                      bold: true,
                      fontSize: 12,
                      margin: [0, 0, 0, 5],
                      alignment:'center'
                    },
                    {
                      text: `Codigo: ${pet.code}`,
                      fontSize: 10,
                      margin: [0, 0, 0, 5],
                      alignment:'center'

                    },
                    {
                      // Código QR generado por pdfMake
                      qr: 'http://10.0.38.30:55600/verify}',
                      fit: 60, // Ajustar el tamaño del QR
                      alignment: 'center',
                    },
                  ],
                },
              ],
            ],
          },
          layout: 'noBorders', // Sin bordes en la tabla
        },
      ],
    };

    // Generar el PDF
    pdfMake.createPdf(docDefinition).open();
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
