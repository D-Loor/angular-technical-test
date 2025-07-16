import { IButton } from "./button.interface";
import { IField } from "./field.interface";

export interface IForm{
    fields: IField[],
    leftButtonForm: IButton,
    rigthButtonForm: IButton
}