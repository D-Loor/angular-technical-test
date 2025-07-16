import { ValidatorFn } from '@angular/forms';
import { IInput } from './input.interface';

export interface IField {
    type: string;
    name: string;
    class: string;
    input?: IInput;
    validators?: ValidatorFn[];
}