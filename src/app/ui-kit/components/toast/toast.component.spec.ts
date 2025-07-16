import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ToastComponent } from "./toast.component";
import { IToast } from "../../interfaces/toast.interface";
import { Subject } from "rxjs";
import { CommonModule } from "@angular/common";
import { ToastService } from "../../services/utils/toast.service";

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;
  let toastServiceMock: Partial<ToastService>;
  let toastDataSubject: Subject<IToast>;

  beforeEach(async () => {
    toastDataSubject = new Subject<IToast>();

    toastServiceMock = {
      $toastData: toastDataSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ToastComponent],
      providers: [
        { provide: ToastService, useValue: toastServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the elements with data', () => {
    const toastData: IToast = {
      title: 'title',
      message: 'message',
      type: 'info',
      duration: 1000,
      close: true,
    };

    component.toastData = toastData;
    component.show = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const pDescription = compiled.querySelector('.toast__description');
    const buttonElement = compiled.querySelector('button');

    expect(pDescription?.textContent).toContain(toastData.message);
    expect(buttonElement).toBeTruthy();
  });

  it('should subscribe to toastService and show toast', () => {
    const toastData: IToast = {
      title: 'Auto Toast',
      message: 'Mensaje automático',
      type: 'success',
      duration: 3000,
      close: true,
    };

    toastDataSubject.next(toastData);
    expect(component.toastData).toEqual(toastData);
    expect(component.show).toBe(true);
  });

  it('should call closeToast after duration', fakeAsync(() => {
    const toastData: IToast = {
      title: 'Auto Close',
      message: 'Auto close after timer',
      type: 'info',
      duration: 1000,
      close: true,
    };

    toastDataSubject.next(toastData);
    fixture.detectChanges();

    expect(component.show).toBe(true);

    tick(1000);
    fixture.detectChanges();

    expect(component.show).toBe(false);
  }));

  it('should close toast manually', () => {
    component.show = true;
    component.closeToast();
    expect(component.show).toBe(false);
  });

  it('should clean up subscription on destroy', () => {
    const spy = jest.spyOn(component['destroy$'], 'next');
    const spyComplete = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
  
});