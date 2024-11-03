#include <stdio.h>


int main() {
    int m, d, y;
    printf("Enter your birthdate (mm/dd/yyyy): ");
    scanf("%d/%d/%d", &m, &d, &y);


    int current_year = 2024;
    int age = current_year - y;

    printf("You were born on %d.\n", y);
    printf("You are %d years old.\n", age);

    return 0;
}