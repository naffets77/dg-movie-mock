import { Pipe, PipeTransform } from '@angular/core';
import { OMDBMovie } from '../models/OMDAPI.interface';


@Pipe({
  name: 'decadeFilter',
  pure: false
})
export class DecadeFilterPipe implements PipeTransform {
  transform(items: OMDBMovie[], year: number): any {
    if (!items || !year) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item._meta.decade === year); // it'd be more optimal to cache the year as a number
  }
}
