import { TestBed } from "@angular/core/testing";
import { TableComponent } from "./table.component";
import { ITableHeader } from "../../interfaces/table-header.interface";

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the elements', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    const tableHeader: ITableHeader[] = [{
      name: 'name',
      key: 'key1',
      type: 'text',
    }];

    const tableBody = [{ key1: 'name1' }];

    fixture.componentRef.setInput('dataHeader', tableHeader);
    fixture.componentRef.setInput('dataBody', tableBody);
    fixture.detectChanges();

    const tableElement = compiled.querySelector('table');
    const itemElement = compiled.querySelectorAll('.table__cell');

    expect(tableElement).toBeTruthy();
    expect(itemElement.length).toBe(tableBody.length);
  });

  it('should initialize dataBodyFiltered on ngOnInit', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    const tableBody = [{ key1: 'value1' }];
    fixture.componentRef.setInput('dataBody', tableBody);
    fixture.detectChanges();

    component.ngOnInit();

    expect(component.dataBodyFiltered).toEqual(tableBody);
  });

  it('should filter dataBodyFiltered when searchContent is set', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    const tableBody = [{ name: 'Carlos' }, { name: 'Ana' }];
    fixture.componentRef.setInput('dataBody', tableBody);
    fixture.componentRef.setInput('searchContent', 'Carlos');
    fixture.detectChanges();

    component.ngOnChanges({
      searchContent: {
        previousValue: '',
        currentValue: 'Carlos',
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.dataBodyFiltered.length).toBe(1);
    expect(component.dataBodyFiltered[0].name).toBe('Carlos');
  });

  it('should reset dataBodyFiltered if searchContent is empty', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    const tableBody = [{ name: 'Carlos' }, { name: 'Ana' }];
    fixture.componentRef.setInput('dataBody', tableBody);
    fixture.detectChanges();

    component.onSearch('');
    expect(component.dataBodyFiltered).toEqual(tableBody);
  });

  it('should update numberShowRecords on changeRecords', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    component.changeRecords(10);
    expect(component.numberShowRecords).toBe(10);
  });

  it('should emit clickedOptions on optionClicked()', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;
    jest.spyOn(component.clickedOptions, 'emit');

    const item = { name: 'Test' };
    component.optionClicked(item, 'edit');

    expect(component.clickedOptions.emit).toHaveBeenCalledWith({ item, option: 'edit' });
  });

  it('should return correct array from numberSkeletons getter', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    component.numberShowRecords = 3;
    expect(component.numberSkeletons).toEqual([0, 1, 2]);
  });
  
});