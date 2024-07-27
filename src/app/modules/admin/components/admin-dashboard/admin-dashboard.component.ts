import { Component } from '@angular/core';
import { AdminService } from '../../sevices/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
        this.cars = res.map((element: any) => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
            return element;
        });
    });
}

  deleteCar(id: number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe(() => {
        this.getAllCars();
        this.message.success("Car deleted successfully", { nzDuration: 5000 });
    });
  }
}
