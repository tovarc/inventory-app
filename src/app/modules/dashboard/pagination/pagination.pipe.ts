import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(rows: any, page: number, rowsPerPage: number): any {
    const from = page * rowsPerPage - rowsPerPage;
    const to = page * rowsPerPage;

    return rows?.slice(from, to);
  }
}
