import { TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { IButton } from "../../interfaces/button.interface";
import { SimpleChange } from "@angular/core";

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render button', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('should be called onClick', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector('button');

    jest.spyOn(component.clickEvent, 'emit');

    buttonElement?.click();

    expect(component.clickEvent.emit).toHaveBeenCalled();
  });

  it('should handle ngOnChanges and keep disabled state', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;

    const mockButton: IButton = {
      label: 'Enviar',
      customClass: 'primary',
      disabled: true
    };

    fixture.componentRef.setInput('buttonData', mockButton);

    const changes = {
      buttonData: new SimpleChange(null, mockButton, true)
    };

    component.ngOnChanges(changes);

    expect(component.buttonData()?.disabled).toBe(true);
  });
  
});