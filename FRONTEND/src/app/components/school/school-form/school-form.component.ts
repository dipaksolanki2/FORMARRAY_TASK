import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SchoolService } from '../../shared/services/school.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.css'
})
export class SchoolFormComponent {
  schoolForm: FormGroup;

  constructor(private fb: FormBuilder, private schoolService: SchoolService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // this.fetchStudents();
    this.schoolForm = this.fb.group({
      students: this.fb.array([this.newStudent()]),
    });
  }

  //! ------------------------Students FormArray----------------------------------------
  students(): FormArray {
    return this.schoolForm.get('students') as FormArray;
  }

  newStudent(): FormGroup {
    return this.fb.group({
      studentName: ['', Validators.required],
      rollNo: ['', Validators.required],
      Standard: ['', Validators.required],
      exams: this.fb.array([this.newExam()]),
    });
  }

  addStudent() {
    this.students().push(this.newStudent());
  }

  removeStudent(studentIndex: number) {
    this.students().removeAt(studentIndex);
  }

  //! ------------------------Exams FormArray----------------------------------------
  exams(studentIndex: number): FormArray {
    return this.students().at(studentIndex).get('exams') as FormArray;
  }

  newExam(): FormGroup {
    return this.fb.group({
      examType: '',
      subjects: this.fb.array([this.newSubject()]),
    });
  }

  addExam(studentIndex: number) {
    this.exams(studentIndex).push(this.newExam());
  }

  removeExam(studentIndex: number, examIndex: number) {
    this.exams(studentIndex).removeAt(examIndex);
  }

  //! ------------------------Subjects FormArray----------------------------------------
  subjects(studentIndex: number, examIndex: number) {
    let exams = this.students().at(studentIndex).get('exams') as FormArray;
    let subjects = exams.at(examIndex).get('subjects') as FormArray;
    return subjects;
  }

  newSubject(): FormGroup {
    return this.fb.group({
      subjectName: '',
    });
  }

  addSubject(studentIndex: number, examIndex: number) {
    this.subjects(studentIndex, examIndex).push(this.newSubject());
  }

  removeSubject(studentIndex: number, examIndex: number, subjectIndex: number) {
    this.subjects(studentIndex, examIndex).removeAt(subjectIndex);
  }

  //! ------------------------Console FormArray Values---------------------------------------
  onSubmit() {
    console.log(this.schoolForm.value);

    this.schoolService.saveStudents(this.schoolForm.value).subscribe(
      (response) => {
        console.log('Form data saved successfully:', response);
        this.snackBar.open('Form data saved successfully', 'close', {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
        });
        this.schoolForm.reset();
      },
      (error) => {
        console.error('Error saving form data:', error);
          this.snackBar.open('Error saving form data', "close", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
          });
      }
    );
  }

  isLoading = false
  // isFetchClicked: boolean = false;
  studentsData: any[] = [];
  fetchStudents() {
 
    this.schoolService.getStudents().subscribe(async (students) => {
      // console.log(students);
      this.isLoading = true
      this.studentsData = []; // Clear existing data before adding fetched data
      students.forEach((el) => {

        // console.log(el);

        el.students.forEach((elem) => {
          elem.new_id = el._id;
          // console.log(elem);
          this.studentsData.push(elem);

        });
      });
      setTimeout(() => {
        this.isLoading = false
      });
    });
    // this.isFetchClicked = true;

  }

  deleteStudent(studentId: any) {
    this.schoolService.deleteStudentonly(studentId).subscribe(
      (response) => {
        // console.log('Student deleted successfully:', response);
        this.snackBar.open('Student deleted successfully', "close", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
        });

        this.studentsData = this.studentsData.filter(
          (student) => student._id !== studentId
        );
      },
      (error) => {
        // console.error('Error deleting student:', error);
        this.snackBar.open('Error deleting student', "close", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000
        });
      }
    );
    // location.reload();
  }

  deleteAll(id) {
    this.schoolService.deleteStudent(id).subscribe(
      (response) => {
        console.log('Student of same SchoolID deleted successfully:', response);
        this.snackBar.open('Student of same SchoolID deleted successfully', "close", {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        this.studentsData = this.studentsData.filter(
          (student) => student.new_id !== id
        );
      },
      (error) => {
        console.error('Error deleting student:', error);
        this.snackBar.open('Error deleting student', "close", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000
        });
      }
    );
    // location.reload();
  }


  toggleUpdateBtn: boolean = false
  isEditMode: boolean = false;
  editedStudentIndex = -1;
  editStudent(student: any) {
    this.editedStudentIndex = this.studentsData.indexOf(student);
    this.isEditMode = true;
    this.toggleUpdateBtn = true;

    const studentForm = this.students().at(0); // for one student in the form array
    studentForm.patchValue({
      studentName: student.studentName,
      rollNo: student.rollNo,
      Standard: student.Standard,
    });

    const examsFormArray = studentForm.get('exams') as FormArray;
    examsFormArray.clear();

    student.exams.forEach((exam) => {
      const examFormGroup = this.fb.group({
        examType: exam.examType,
        subjects: this.fb.array([]),
      });

      const subjectsFormArray = examFormGroup.get('subjects') as FormArray;
      exam.subjects.forEach((subject) => {
        const subjectFormGroup = this.fb.group({
          subjectName: subject.subjectName,
        });
        subjectsFormArray.push(subjectFormGroup);
      });

      examsFormArray.push(examFormGroup);
    });

    // this.schoolService.editStudent(student._id, this.schoolForm.value).subscribe(
    //   (response) => {
    //     console.log('Student data updated successfully:', response);
    //     this.fetchStudents();
    //   },
    //   (error) => {
    //     console.error('Error updating student data:', error);
    //   }
    // )
  }

  updateStudentData(student: any) {
    this.schoolService
      .editStudent(student.new_id, this.schoolForm.value)
      .subscribe(
        (response) => {
          // console.log('Student data updated successfully:', response);
          this.snackBar.open('Student data updated successfully', "close", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
          });
          this.fetchStudents(); // Fetch updated data after successful update
        },
        (error) => {
          // console.error('Error updating student data:', error);
          this.snackBar.open('Error deleting student', "close", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000
          });
        }
      );
      this.schoolForm.reset()
      this.toggleUpdateBtn = false;
  }
}
