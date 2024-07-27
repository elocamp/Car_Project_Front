import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../sevices/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
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
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  postCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const yearControl = this.postCarForm.get('year');
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

    formData.append('brand', this.postCarForm.get('brand').value);
    formData.append('name', this.postCarForm.get('name').value);
    formData.append('type', this.postCarForm.get('type').value);
    formData.append('color', this.postCarForm.get('color').value);
    formData.append('year', year?.toString() || '');
    formData.append('transmission', this.postCarForm.get('transmission').value);
    formData.append('description', this.postCarForm.get('description').value);
    formData.append('price', this.postCarForm.get('price').value);

    this.adminService.postCar(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success("Car posted successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      },
      (error) => {
        this.isSpinning = false;
        this.message.error("Error while posting car", { nzDuration: 5000 });
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
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
