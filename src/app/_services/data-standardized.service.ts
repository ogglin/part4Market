import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStandardizedService {

  constructor() { }

  public standardizeProduct(data): Observable<any> {
    console.log(data);
    return new Observable<any> (observer => {
      const products = [];
      data.forEach(g => {
        let imgs = [];
        if (g.images && g.images !== '') {
          imgs = g.images.split(',');
        } else {
          imgs.push('no-image.jpg');
        }
        products.push({
          id: g.id,
          title: g.title,
          options: g.options,
          price: g.price,
          description: g.description,
          images: imgs,
          type: g.type,
          address: g.address,
          priority: g.priority,
          category: g.category,
          brand: g.brand,
          model: g.model,
          partcode: g.partcode
        });
      });
      console.log(products);
      observer.next(products);
    });
  }
}
