import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortdate'
})
export class SortdatePipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): unknown {
     return value.sort((x:any, y:any) => {
      return <any>new Date(y["date_added"]) - <any>new Date(x["date_added"]);
    })
  }

}
