import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup } from "@angular/forms";
import { DropdownComponent } from "./dropdown.component";
import { IDropdown } from "../../interfaces/dropdown.interface";
import { SimpleChange } from "@angular/core";

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<DropdownComponent>;
  let component: DropdownComponent;

  const mockDropdownData: IDropdown = {
    id: 'id',
    label: 'label',
    formControlName: 'formControlName',
    options: [{ label: 'Opción 1', value: 'valor1' }],
    required: true,
    disabled: false,
  };

  const mockFormGroup = new FormGroup({
    formControlName: new FormControl('valor1')
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dropdownData', mockDropdownData);
    fixture.componentRef.setInput('formGroup', mockFormGroup);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and options', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const label = compiled.querySelector('label');
    const select = compiled.querySelector('select');
    const options = select?.querySelectorAll('option');

    expect(label?.textContent).toContain('label');
    expect(select).toBeTruthy();
    expect(options?.length).toBe(1);
    expect(options?.[0].textContent).toBe('Opción 1');
  });

  it('should emit selected value on change', () => {
    jest.spyOn(component.onChange, 'emit');
    const mockEvent = { target: { value: 'nuevoValor' } };

    component.onChangeEvent(mockEvent);

    expect(component.onChange.emit).toHaveBeenCalledWith('nuevoValor');
  });

  it('should set formControl in ngOnChanges', () => {
    const changes = {
      controlName: new SimpleChange(null, 'formControlName', true)
    };

    component.ngOnChanges(changes);

    expect(component.formControl).toBeTruthy();
    expect(component.formControl instanceof FormControl).toBe(true);
    expect(component.formControl?.value).toBe('valor1');
  });
  
});