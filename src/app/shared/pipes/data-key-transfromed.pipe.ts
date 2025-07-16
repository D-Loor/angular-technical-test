import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataKeyTransfromed',
  standalone: true
})
export class DataKeyTransfromedPipe implements PipeTransform {

  transform(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

}