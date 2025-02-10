import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private assetsPath = path.join(__dirname, '..', 'assets');

  getAllFilesInfo() {
    if (!fs.existsSync(this.assetsPath)) {
      throw new Error(`El directorio assets no existe.`);
    }

    const files = fs.readdirSync(this.assetsPath);
    const filesInfo = files.map((filename) => {
      const filePath = path.join(this.assetsPath, filename);
      const stats = fs.statSync(filePath);
      const fileBuffer = fs.readFileSync(filePath);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

      return {
        Num: parseInt(filename.split(' ')[0]),
        Documento: filename,
        TamañoEnBytes: stats.size,
        FechaUltimaModificacion: stats.mtime,
        CodigoHash: hash,
        Algoritmo: 'MD5',
      };
    });

    return filesInfo;
  }
}
