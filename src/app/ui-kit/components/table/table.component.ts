import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { DataKeyTransfromedPipe } from '../../../shared/pipes/data-key-transfromed.pipe';
import { ITableHeader } from '../../interfaces/table-header.interface';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { IDropdown } from '../../interfaces/dropdown.interface';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [CommonModule, FormsModule, DataKeyTransfromedPipe, DropdownComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges{
  dataHeader = input<ITableHeader[]>([]);
  dataBody = input<any[]>([]);
  options = input<boolean>(false);
  searchContent = input<string>('');
  showSkeleton = input<boolean>(false);
  clickedOptions = output<any>();

  dataBodyFiltered: any[] = [];
  numberShowRecords = 5;
  numberRecordsForm = new FormGroup({'numberRecords': new FormControl(this.numberShowRecords)});

  numberRecordsList: IDropdown = {
    id: "numberRecords",
    formControlName: "numberRecords",
    options: [
      {
        label: "5",
        value: 5
      },
      {
        label: "10",
        value: 10
      },
      {
        label: "20",
        value: 20
      }
    ]
  };

  ngOnInit(): void {
    this.dataBodyFiltered = this.dataBody();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onSearch(this.searchContent());
  }

  get numberSkeletons(): number[] {
    return Array.from({ length: this.numberShowRecords }, (_, i) => i)
  }

  changeRecords(event: any): void {
    this.numberShowRecords = event;
  }

  onSearch(event: string): void {
    if (!event) {
      this.dataBodyFiltered = [...this.dataBody()];
      return;
    }

    const searchTerm = event.trim().toLowerCase();

    this.dataBodyFiltered = this.dataBody().filter(item => {
      return Object.values(item).some(value => {
        if (value !== null && value !== undefined) {
          return String(value).toLowerCase().includes(searchTerm);
        }
        return false
      });
    });
  }

  optionClicked(item:any, option: string): void {
    this.clickedOptions.emit({item: item, option: option});
  }

}