import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { pet, treatment, user } from '../../infrastructure';
import { environment } from '../../../environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private readonly queryUrl = environment.queryUrl;
  constructor() {}

  async generateCard(pet: pet, owner: user) {
    const qrData = `${this.queryUrl}/${pet.id}`;
    const photo = await this.imageABase64(pet.image ?? 'images/no-image.png');
    const leftIcon = await this.imageABase64('images/logos/sacaba-white.png');
    const rightIcon = await this.imageABase64('images/logos/slogan.png');
    const backgroundImage = await this.imageABase64('images/card.png');
    const sloganImage = await this.imageABase64('images/logos/rum.png');

    const documentDefinition: TDocumentDefinitions = {
      pageSize: { width: 250, height: 150 },
      pageMargins: [8, 10, 8, 8],
      background: [
        {
          image: backgroundImage,
          width: 250,
          height: 150,
          absolutePosition: { x: 0, y: 0 },
          opacity: 0.5,
        },
      ],
      content: [
        {
          columns: [
            { image: leftIcon, height: 20, width: 50 },
            {
              width: '*',
              alignment: 'center',
              stack: [
                {
                  text: 'Gobierno Autónomo Municipal de Sacaba',
                  fontSize: 7,
                  bold: true,
                },
                {
                  text: 'Registro Único de Mascotas (RUM)',
                  fontSize: 6,
                },
                { text: 'Mi Carnet de Mascota', fontSize: 7, bold: true },
              ],
            },
            { image: rightIcon, height: 20, width: 45 },
          ],
        },
        {
          marginTop: 15,
          columns: [
            {
              alignment: 'center',
              width: 60,
              stack: [
                { image: photo, width: 60, height: 60 },
                {
                  text: pet.name.toUpperCase(),
                  bold: true,
                  marginTop: 5,
                  fontSize: 9,
                },
                { text: `Codigo: ${pet.code}`, fontSize: 6 },
              ],
            },
            {
              stack: [
                {
                  fontSize: 6,
                  table: {
                    widths: [45, '*'],
                    body: [
                      [{ text: 'Nombre:', bold: true }, pet.name],
                      [
                        { text: 'Raza:', bold: true },
                        `${pet.breed.name} `,
                      ],
                      [
                        { text: 'Tipo:', bold: true },
                        `${pet.breed.species}`,
                      ],
                      [
                        { text: 'Macho/Hembra:', bold: true },
                        pet.sex.toUpperCase(),
                      ],
                      [
                        { text: 'Esterilizado:', bold: true },
                        pet.is_neutered ? 'SI' : 'NO',
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
              margin: [5, 0, 0, 0],
            },
          ],
        },
        {
          text: 'Registro Unico de Mascotas Sacaba',
          fontSize: 10,
          bold: true,
          pageBreak: 'before',
        },
        {
          marginTop: 10,
          marginLeft: 5,
          columns: [
            {
              width: '*',
              fontSize: 10,
              text: '\n"Cuidar a nuestros animales es un deber. Respetemos la Ley 700 y la Ley Municipal 009/2014 para garantizar su bienestar"',
            },
            { qr: qrData, fit: 70, width: 70 },
          ],
        },
        { image: sloganImage, width: 120, alignment: 'center' },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  async generatePetSheet(owner: user, pet: pet, treatments: treatment[]) {
    const backgroundImage = await this.imageABase64('images/logos/rum.png');
    const headerImage = await this.imageABase64(
      'images/logos/sacaba-white.png'
    );
    const sloganImage = await this.imageABase64('images/logos/slogan.png');
    const petImage =
      pet.image !== 'images/no-image.png'
        ? await this.imageABase64(pet.image!)
        : null;

    const qrData = `${this.queryUrl}/${pet.id}`;

    const docDefinition: TDocumentDefinitions = {
      header: {
        margin: [20, 20, 20, 40],
        columns: [
          {
            image: headerImage,
            width: 120,
          },
          {
            width: '*',
            alignment: 'center',
            stack: [
              {
                text: 'Secretaría Municipal de Salud',
                bold: true,
                fontSize: 18,
              },
              { text: 'Centro Municipal de Zoonosis', fontSize: 16 },
              { text: 'Registro Unico de Mascotas Sacaba' },
            ],
          },
          {
            image: sloganImage,
            width: 120,
          },
        ],
      },
      footer: {
        columns: [
          {
            qr: qrData,
            fit: 75,
            margin: [20, 0, 0, 0],
          },
          {
            stack: [
              {
                alignment: 'right',
                fontSize: 10,
                marginRight: 20,
                text: `Generado el ${new Date().toLocaleString()}`,
              },
            ],
            width: '*',
            margin: [0, 40, 0, 0],
          },
        ],
      },
      background: function () {
        return {
          image: backgroundImage,
          alignment: 'center',
          opacity: 0.2,
          width: 400,
          height: 150,
          marginTop: 60,
        };
      },
      pageSize: 'LETTER',
      pageMargins: [30, 100, 30, 90],
      content: [
        { text: 'DATOS GENERALES DEL PROPIETARIO', bold: true },
        {
          marginBottom: 10,
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 550, y2: 0, lineWidth: 1 },
          ],
        },
        {
          marginBottom: 40,
          columns: [
            {
              width: '*',
              table: {
                body: [
                  [{ text: 'NOMBRE:', bold: true }, owner.fullname],
                  [{ text: 'DIRECCION:', bold: true }, owner.address],
                ],
              },
              layout: 'noBorders',
            },
            {
              width: 200,
              table: {
                body: [
                  [{ text: 'NRO. CI:', bold: true }, owner.dni],
                  [{ text: 'TELEFONO:', bold: true }, owner.phone],
                ],
              },
              layout: 'noBorders',
            },
          ],
        },
        { text: 'DATOS DE LA MASCOTA', bold: true },
        {
          marginBottom: 10,
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 550, y2: 0, lineWidth: 1 },
          ],
        },
        {
          columns: [
            {
              width: 220,
              alignment: 'center',
              stack: [
                {
                  ...(petImage
                    ? { width: 200, height: 200, image: petImage }
                    : {
                        width: 200,
                        height: 200,
                        canvas: [
                          {
                            type: 'rect',
                            x: 0,
                            y: 0,
                            w: 200,
                            h: 200,
                            lineWidth: 1,
                          },
                        ],
                      }),
                },
                {
                  text: `CODIGO: ${pet.code}`,
                  bold: true,
                  alignment: 'center',
                  marginTop: 5,
                },
              ],
            },
            { width: 10, text: '' },
            {
              width: '*',
              columns: [
                {
                  width: '*',
                  fontSize: 10,
                  table: {
                    widths: [120, '*'],
                    body: [
                      [{ text: 'NOMBRE:', bold: true }, pet.name],
                      [{ text: 'COLOR:', bold: true }, pet.color],
                      [{ text: 'ESPECIE:', bold: true }, pet.breed.species],
                      [{ text: 'RAZA:', bold: true }, pet.breed.name],
                      [
                        { text: 'MACHO/HEMBRA:', bold: true },
                        pet.sex.toUpperCase(),
                      ],
                      [
                        { text: 'NACIMIENTO:', bold: true },
                        pet.birthDate
                          ? new Date(pet.birthDate).toLocaleDateString()
                          : '----',
                      ],
                      [
                        { text: 'ESTERILIZADO:', bold: true },
                        pet.is_neutered ? 'SI' : 'NO',
                      ],
                      [
                        { text: 'FECHA ESTERILIZACIÓN:', bold: true },
                        pet.neuter_date
                          ? new Date(pet.neuter_date).toLocaleDateString()
                          : '----',
                      ],
                      [{ text: 'DESCRIPCION' }, pet.description ?? ''],
                    ],
                  },
                  layout: 'noBorders',
                },
              ],
            },
          ],
        },
        { text: 'Listado de tratamientos', marginTop: 20, marginBottom: 5 },
        {
          fontSize: 10,
          table: {
            dontBreakRows: true,
            headerRows: 1,
            widths: [100, 150, 100, '*'],
            body: [
              ['Tratamiento', 'Nombre', 'Fecha', 'Lugar'],
              ...(treatments.length === 0
                ? [['Sin registros', '', '', '']]
                : treatments.map((treatment) => [
                    treatment.typeTreatment.category,
                    treatment.typeTreatment.name,
                    new Date(treatment.date).toLocaleDateString(),
                    treatment.medicalCenter.name,
                  ])),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
    };
    pdfMake.createPdf(docDefinition).print();
  }

  private imageABase64(path: string): Promise<string> {
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
