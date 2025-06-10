import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { v4 as uuid } from 'uuid';

export interface Character{
  id?: string;
  name: string;
  power: number;
}
