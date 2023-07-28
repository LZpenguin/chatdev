class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def authenticate(self, username, password):
        return self.username == username and self.password == password
    
class Student:
    students = []

    def __init__(self, name, student_id, contact_details):
        self.name = name
        self.student_id = student_id
        self.contact_details = contact_details
        self.grades = {}

    def add_grade(self, subject, grade):
        self.grades[subject] = grade

    def delete_grade(self, subject):
        del self.grades[subject]

    @classmethod
    def create_student(cls, name, student_id, contact_details):
        student = cls(name, student_id, contact_details)
        cls.students.append(student)
        return student

    @classmethod
    def delete_student(cls, student):
        cls.students.remove(student)
        
class GradeManager:
    @staticmethod
    def calculate_overall_grade(student):
        grades = student.grades.values()
        if not grades:
            return 0
        return sum(grades) / len(grades)

    @staticmethod
    def generate_student_report(student):
        report = f"Student Name: {student.name}\n"
        report += f"Student ID: {student.student_id}\n"
        report += "Grades:\n"
        for subject, grade in student.grades.items():
            report += f"{subject}: {grade}\n"
        report += f"Overall Grade: {GradeManager.calculate_overall_grade(student)}"
        return report

    @classmethod
    def generate_class_report(cls):
        report = "Class Report\n"
        for student in Student.students:
            report += cls.generate_student_report(student) + "\n"
        return report

class CLI:
    def __init__(self, user):
        self.user = user

    def start(self):
        print("Welcome to the Student Grade Management System!")
        while True:
            print("\nPlease enter your credentials to log in:")
            username = input("Username: ")
            password = input("Password: ")
            if self.user.authenticate(username, password):
                print("\nLogin Successful!")
                self.menu()
                break
            else:
                print("\nInvalid username or password. Please try again.")

    def menu(self):
        while True:
            print("\nPlease select an option:")
            print("1. Add a student")
            print("2. View all students")
            print("3. Search for a student")
            print("4. Add a grade for a student")
            print("5. Update a student's grade")
            print("6. Delete a student's grade")
            print("7. Generate a student report")
            print("8. Generate a class report")
            print("9. Exit")

            option = input("Option: ")
            if option == "1":
                self.add_student()
            elif option == "2":
                self.view_students()
            elif option == "3":
                self.search_student()
            elif option == "4":
                self.add_grade()
            elif option == "5":
                self.update_grade()
            elif option == "6":
                self.delete_grade()
            elif option == "7":
                self.generate_student_report()
            elif option == "8":
                self.generate_class_report()
            elif option == "9":
                print("\nGoodbye!")
                break
            else:
                print("\nInvalid option. Please try again.")

    def add_student(self):
        print("\nAdd a Student")
        name = input("Name: ")
        student_id = input("Student ID: ")
        contact_details = input("Contact Details: ")
        student = Student.create_student(name, student_id, contact_details)
        print(f"\nStudent {student.name} added successfully!")

    def view_students(self):
        print("\nAll Students")
        if not Student.students:
            print("No students found.")
        else:
            for student in Student.students:
                print(f"Name: {student.name}, Student ID: {student.student_id}")

    def search_student(self):
        print("\nSearch for a Student")
        keyword = input("Enter name or Student ID: ")
        found_students = []
        for student in Student.students:
            if keyword.lower() in student.name.lower() or keyword.lower() in student.student_id.lower():
                found_students.append(student)
        if not found_students:
            print("No students found.")
        else:
            for student in found_students:
                print(f"Name: {student.name}, Student ID: {student.student_id}")

    def add_grade(self):
        print("\nAdd a Grade")
        student_id = input("Student ID: ")
        subject = input("Subject: ")
        grade = float(input("Grade: "))
        for student in Student.students:
            if student.student_id == student_id:
                student.add_grade(subject, grade)
                print("Grade added successfully!")
                return
        print(f"No student found with ID {student_id}.")

    def update_grade(self):
        print("\nUpdate a Grade")
        student_id = input("Student ID: ")
        subject = input("Subject: ")
        grade = float(input("New Grade: "))
        for student in Student.students:
            if student.student_id == student_id:
                if subject in student.grades:
                    student.grades[subject] = grade
                    print("Grade updated successfully!")
                    return
                else:
                    print("No grade found for the specified subject.")
                    return
        print(f"No student found with ID {student_id}.")

    def delete_grade(self):
        print("\nDelete a Grade")
        student_id = input("Student ID: ")
        subject = input("Subject: ")
        for student in Student.students:
            if student.student_id == student_id:
                if subject in student.grades:
                    student.delete_grade(subject)
                    print("Grade deleted successfully!")
                    return
                else:
                    print("No grade found for the specified subject.")
                    return
        print(f"No student found with ID {student_id}.")

    def generate_student_report(self):
        print("\nGenerate Student Report")
        student_id = input("Student ID: ")
        for student in Student.students:
            if student.student_id == student_id:
                report = GradeManager.generate_student_report(student)
                print(f"\n{report}")
                return
        print(f"No student found with ID {student_id}.")

    def generate_class_report(self):
        print("\nGenerate Class Report")
        report = GradeManager.generate_class_report()
        print(f"\n{report}")

def main():
    user = User("admin", "password123")
    cli = CLI(user)
    cli.start()

if __name__ == "__main__":
    main()