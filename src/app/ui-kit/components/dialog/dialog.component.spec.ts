import { TestBed } from "@angular/core/testing";
import { DialogComponent } from "./dialog.component";
import { IDialog } from "../../interfaces/dialog.interface";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe('DialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
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
    const fixture = TestBed.createComponent(DialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the elements', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    const dialogData: IDialog = {
      title: 'title',
      description: 'description',
      labelButtonLeft: 'left',
      labelButtonRight: 'right',
    };

    fixture.componentRef.setInput('presentDialog', true);
    component.showDialog = true;
    component.dialogData = dialogData;
    fixture.detectChanges();

    const badgeElement = compiled.querySelector('h4');
    expect(badgeElement).toBeTruthy();
  });

  it('should close dialog on onClose()', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const component = fixture.componentInstance;
    component.showDialog = true;
    component.onClose();
    expect(component.showDialog).toBe(false);
  });

  it('should emit clickLeftButton and close dialog', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const component = fixture.componentInstance;
    jest.spyOn(component.clickLeftButton, 'emit');
    component.showDialog = true;

    component.onClickLeftButton();

    expect(component.showDialog).toBe(false);
    expect(component.clickLeftButton.emit).toHaveBeenCalled();
  });

  it('should emit clickRightButton without closing dialog', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const component = fixture.componentInstance;
    jest.spyOn(component.clickRightButton, 'emit');
    component.showDialog = true;

    component.onClickRightButton();

    expect(component.showDialog).toBe(true);
    expect(component.clickRightButton.emit).toHaveBeenCalled();
  });
  
});