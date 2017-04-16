import { DeleteService } from './../../services/delete.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges {

  @Input() favoritesList: any;
  @Input() itemIndx: number;
  state: boolean = false;

  constructor(private ref: ChangeDetectorRef, private deleteService: DeleteService) { }

  ngOnInit() {

  };

  ngOnChanges(changes: any): void {
    this.ref.detectChanges();
    this.state = false;
  };

  imageError($event) {
    this.favoritesList.img = "http://www.nokiafirmware.net/img/nokia/Image-Not-Found.png";
  };

  setDelete(item) {
    this.state = !this.state;
    this.deleteService.setItem(this.itemIndx, this.state);
  };


}
