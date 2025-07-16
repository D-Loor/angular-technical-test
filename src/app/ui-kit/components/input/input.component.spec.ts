import { TestBed } from "@angular/core/testing";
import { FormGroup, FormControl } from "@angular/forms";
import { InputComponent } from "./input.component";
import { IInput } from "../../interfaces/input.interface";
import { SimpleChange } from "@angular/core";

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the elements', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    const inputData: IInput = {
      id: 'id',
      label: 'label',
      value: 'value',
      placeholder: 'placeholder',
      type: 'text',
      formControlName: 'formControlName',
      required: true,
      disabled: false,
    };

    const formGroup = new FormGroup({
      formControlName: new FormControl(),
    });

    fixture.componentRef.setInput('inputData', inputData);
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.detectChanges();

    const labelElement = compiled.querySelector('label');
    const inputElement = compiled.querySelector('input');

    expect(labelElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
  });


  it('should set formControl when controlName changes', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;

    const inputData: IInput = {
      id: 'id',
      label: 'label',
      value: '',
      placeholder: 'placeholder',
      type: 'text',
      formControlName: 'formControlName',
      required: false,
      disabled: false,
    };

    const formGroup = new FormGroup({
      formControlName: new FormControl('testValue'),
    });

    fixture.componentRef.setInput('inputData', inputData);
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.detectChanges();

    component.ngOnChanges({
      controlName: new SimpleChange(null, 'formControlName', true),
    });

    expect(component.formControl).toBeTruthy();
    expect(component.formControl instanceof FormControl).toBe(true);
    expect(component.formControl.value).toBe('testValue');
  });

  it('should be called onKeyUp', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;

    const inputData: IInput = {
      id: 'id',
      label: 'label',
      value: 'value',
      placeholder: 'placeholder',
      type: 'text',
      formControlName: 'formControlName',
      required: true,
      disabled: false,
    };

    const formGroup = new FormGroup({
      formControlName: new FormControl(),
    });

    fixture.componentRef.setInput('inputData', inputData);
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input');

    jest.spyOn(component.outputData, 'emit');

    if (inputElement) {
      inputElement.value = 'search';
      inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 's' }));
    }

    fixture.detectChanges();

    expect(component.outputData.emit).toHaveBeenCalled();
  });
  
});