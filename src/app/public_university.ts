import { Injectable } from '@angular/core';
import { Public_Uni } from './shared/public_university';

@Injectable()
export class Public_University {
    active: Public_Uni[];
    notActive: Public_Uni[];
    activeIn_5: Public_Uni[];
}