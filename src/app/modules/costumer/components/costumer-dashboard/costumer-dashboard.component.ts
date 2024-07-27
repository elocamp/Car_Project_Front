import { Component } from '@angular/core';
import { CostumerService } from '../../services/costumer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-costumer-dashboard',
  templateUrl: './costumer-dashboard.component.html',
  styleUrl: './costumer-dashboard.component.scss'
})
export class CostumerDashboardComponent {

  cars: any = [];

  constructor(private costumerService: CostumerService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.costumerService.getAllCars().subscribe((res) => {
        this.cars = res.map((element: any) => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
            return element;
        });
    });
  }
}
