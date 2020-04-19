/** 
 @ Author: Saurabh Tiwari
 @ Date of Creation: 19-04-2020 
**/

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'p-group-multiselect',
  templateUrl: './p-group-multiselect.component.html',
  styleUrls: ['./p-group-multiselect.component.scss']
})
export class PGroupMultiselectComponent implements OnInit {

  public selectedOptions: Array<SelectItem> = new Array<SelectItem>();
  public selectedItemsLabel = 'Choose';
  @Input() options: Array<SelectItem>;
  @Output() onPanelHide: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public onChangeMultiSelect($event) {
    // $event.itemValue is clicked element always, whether checked or unchecked.
    // $event.value is the total selected value in p-multiselect after this change.
    // So, if $event.itemValue is present in $event.value it means itemValue was checked else unchecked.
    // itemValue is not present in $event if header checkbox is clicked, though $event.value is present.
    if ($event.itemValue) {
      // this is when a single multi select option is clicked
      this.handleMultiSelectOptionClicked($event);
    } else {
      // this is when header check box is clicked
      this.handleMultiSelectHeaderClicked($event);
    }
  }

  private handleMultiSelectOptionClicked(event) {
    let elementChecked = false;
    event.value.forEach(element => {
      if (element.label === event.itemValue.label) {
        elementChecked = true;
      }
    });
    if (elementChecked) {
      // this is when element is checked
      this.options.forEach((option) => {
        if (option.value.label === event.itemValue.label) {
          option.value.selectedChildOptions = [];
          event.itemValue.childOptions.forEach(element => {
            option.value.selectedChildOptions.push(element.value);
          });
        }
      });
    } else {
      // this is when element is unchecked
      this.options.forEach((option) => {
        if (option.value.label === event.itemValue.label) {
          option.value.selectedChildOptions = [];
        }
      });
    }
  }

  private handleMultiSelectHeaderClicked(event) {
    if (event.value.length === this.options.length) {
      this.options.forEach((option) => {
          option.value.selectedChildOptions = [];
          option.value.childOptions.forEach(element => {
            option.value.selectedChildOptions.push(element.value);
          });
      });
    } else {
      this.options.forEach((option) => {
          option.value.selectedChildOptions = [];
      });
    }
  }

  public onChangeChildOptionCheckbox(option) {
    // $event is true or false depending on whether its checked or unchecked.
    if (option.value.childOptions.length !== option.value.selectedChildOptions.length) {
        this.selectedOptions = this.selectedOptions.filter((selectedOption) => selectedOption.label !== option.value.label);
      } else {
        this.selectedOptions = [...this.selectedOptions];
        this.selectedOptions.push(option.value);
      }
  }

  public onClickChildOptionChecbox(event) {
    event.stopPropagation();
  }

  public onClickChildOptionContainer(event) {
    event.stopPropagation();
  }

  public getSelectedItemsLabel() {
    // return 'Label';
    const selectedItemLabels = [];
    this.options.forEach((option) => {
      if (option.value.childOptions.length === option.value.selectedChildOptions.length) {
        selectedItemLabels.push(option.label);
      } else {
        option.value.selectedChildOptions.forEach((childOption) => {
          selectedItemLabels.push(childOption.label);
        });
      }
    });
    return selectedItemLabels.length > 0 ? selectedItemLabels.join(',') : this.selectedItemsLabel;
  }

  public onMultiSelectPanelHide() {
    const selectedresults = {
      parentOptions: [],
      childOptions: []
    };

    this.options.forEach((option) => {
      if (option.value.childOptions.length === option.value.selectedChildOptions.length) {
        selectedresults.parentOptions.push(option);
      } else {
        option.value.selectedChildOptions.forEach((childOption) => {
          selectedresults.childOptions.push(childOption);
        });
      }
    });
    this.onPanelHide.emit(selectedresults);
  }
}
