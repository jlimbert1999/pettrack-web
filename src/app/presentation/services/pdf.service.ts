import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { pet, user } from '../../infrastructure';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async generateCard(pet: pet, owner: user) {
    const qrData = 'Código único: 12345';
    const petImage = await this.convertImageABase64( pet.image ?? 'images/no-image.png');
    const iconImage = await this.convertImageABase64('images/icons/pets.png');

    const documentDefinition: TDocumentDefinitions = {
      pageSize: { width: 250, height: 150 },
      pageMargins: [8, 8, 8, 8],
      content: [
        {
          canvas: [
            { type: 'rect', x: 0, y: 0, w: 230, h: 25, r: 5, color: '#76C893' },
          ],
        },
        {
          margin: [10, -22, 10, 0],
          columns: [
            {
              text: [
                { text: 'Mi Carnet de Mascota', fontSize: 10 },
                {
                  text: '\nSistema "Registro Único de Mascotas" (RUM)',
                  fontSize: 6,
                },
              ],
              bold: true,
              color: 'white',
            },
            { image: iconImage, width: 20, height: 20 },
          ],
        },
        {
          marginTop: 10,
          columns: [
            {
              width: 60,
              stack: [
                { image: petImage, width: 60, height: 60 },
                {
                  text: pet.name,
                  bold: true,
                  alignment: 'center',
                  marginTop: 5,
                  fontSize: 9,
                },
              ],
            },
            {
              stack: [
                {
                  fontSize: 6,
                  table: {
                    widths: [35, '*'],
                    body: [
                      [{ text: 'Nombre:', bold: true }, pet.name],
                      [
                        { text: 'Raza:', bold: true },
                        `${pet.sex} - ${pet.breed.name} ${pet.breed.species}`,
                      ],
                      [
                        { text: 'Propietario:', bold: true },
                        owner.fullname.toUpperCase(),
                      ],
                      [{ text: 'Telefono:', bold: true }, owner.phone],
                      [{ text: 'Dirección:', bold: true }, owner.address],
                    ],
                  },
                  layout: 'noBorders',
                },
              ],
              margin: [10, 0, 0, 0],
            },
          ],
        },
        {
          absolutePosition: { x: 210, y: 110 },
          qr: qrData,
          fit: 40,
        },
      ],
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
