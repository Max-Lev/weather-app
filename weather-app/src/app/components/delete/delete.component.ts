import { DeleteService } from './../../services/delete.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  indexList: Array<any> = [];
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private deleteService: DeleteService) { }

  ngOnInit() {
  }

  //emitter to favorites component
  deleteItem() {
    this.deleteService.getItem().subscribe((indexList) => {
      this.indexList = indexList;
    });
    this.deleteEmitter.emit(this.indexList);
    this.deleteService.reset();
  };

}
