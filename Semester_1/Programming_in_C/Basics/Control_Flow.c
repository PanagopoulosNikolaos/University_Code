/*
Control Flow in C

Control flow statements alter the sequential execution of code.  They include:

- if: Executes a block of code only if a condition is true.
- else: Executes a block of code if the preceding if condition is false.
- else if: Allows for multiple conditions to be checked sequentially.
- switch: Selects a block of code to execute based on the value of an expression.
*/

#include <stdio.h>

int main() {
  int grade = 85;

  if (grade >= 90) {
    printf("A\n");
  } else if (grade >= 80) {
    printf("B\n");
  } else if (grade >= 70) {
    printf("C\n");
  } else {
    printf("F\n");
  }

  int day = 3;
  switch (day) {
    case 1:
      printf("Monday\n");
      break;
    case 2:
      printf("Tuesday\n");
      break;
    case 3:
      printf("Wednesday\n");
      break;
    default:
      printf("Other day\n");
  }

  return 0;
}
