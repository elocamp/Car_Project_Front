import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../sevices/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {

  isSpinning = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  carId: number = 0;
  imgChanged = false;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  listOfBrands = [
    "BMW", "AUDI", "Ferrari", "VOLVO", "TOYOTA", "FORD", "CHEVROLET",
    "MERCEDES-BENZ", "JAGUAR", "PONTIAC", "DODGE", "MUSTANG", "ALFA ROMEO",
    "MGA", "MG", "CADILLAC", "LINCOLN", "BUICK", "PLYMOUTH", "RENAULT", "VOLKSWAGEN"
  ];
  
  listOfType = [
    "Petrol", "Hybrid", "Diesel", "Electric", "CNG", "Two-Stroke", "Four-Stroke"
  ];
  
  listOfColor = [
    "Red", "White", "Blue", "Black", "Orange", "Grey", "Silver", "Green", "Brown", "Yellow"
  ];
  
  listOfTransmission = [
    "Manual", "Automatic", "Semi-Automatic", "Overdrive"
  ];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carId = this.activatedRoute.snapshot.params["id"];
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.updateForm.patchValue(carDto);
    });
  }

  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const yearControl = this.updateForm.get('year');
    let year: number | null = null;

    if (yearControl && yearControl.value) {
      const yearValue = yearControl.value;

      if (yearValue instanceof Date) {
        year = yearValue.getFullYear();
      } else {
        year = parseInt(yearValue, 10);
      }

      if (isNaN(year)) {
        year = null;
      }
    }

    formData.append('brand', this.updateForm.get('brand').value);
    formData.append('name', this.updateForm.get('name').value);
    formData.append('type', this.updateForm.get('type').value);
    formData.append('color', this.updateForm.get('color').value);
    formData.append('year', year?.toString() || '');
    formData.append('transmission', this.updateForm.get('transmission').value);
    formData.append('description', this.updateForm.get('description').value);
    formData.append('price', this.updateForm.get('price').value);

    this.adminService.updateCar(this.carId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success("Car updated successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      },
      (error) => {
        this.isSpinning = false;
        this.message.error("Error while updating car", { nzDuration: 5000 });
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.imgChanged = true;
      this.existingImage = null;
      this.previewImage();
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }
}
