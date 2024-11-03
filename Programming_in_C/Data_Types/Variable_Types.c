#include <stdio.h>

int main() {
    int age = 25;               // Declare an integer variable named 'age' and assign it the value 25
    float salary = 55000.50;    // Declare a float variable named 'salary' and assign it a value
    char grade = 'A';           // Declare a char variable named 'grade' and assign it a character

    printf("Age: %d\n", age);           // %d is used to format an integer
    printf("Salary: %.2f\n", salary);   // %.2f formats the float to 2 decimal places
    printf("Grade: %c\n", grade);       // %c is used for characters

    return 0;
}