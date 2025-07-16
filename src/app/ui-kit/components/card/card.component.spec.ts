import { TestBed } from "@angular/core/testing";
import { CardComponent } from "./card.component";
import { ButtonComponent } from "../button/button.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { IButton } from "../../interfaces/button.interface";
import { ICard } from "../../interfaces/card.interface";

describe('CardComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CardComponent],
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
      const fixture = TestBed.createComponent(CardComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the provided component in the ngComponentOutlet', () => {
      const fixture = TestBed.createComponent(CardComponent);
      const compiled = fixture.nativeElement as HTMLElement;

      const cardData: ICard = {
        header: 'header',
        component: ButtonComponent,
        componentInputs: {
          buttonData:{
            customClass: "primary",
            label: "test",
            disabled: false
          } as IButton,
        }
      };
  
      fixture.componentRef.setInput('cardData', cardData);
      fixture.detectChanges();
  
      const buttonElement = compiled.querySelector('app-button');
      
      expect(buttonElement).toBeTruthy();
  
    });

});