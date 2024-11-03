/*
Functions in C

Functions are blocks of code that perform specific tasks. They improve code organization and reusability.
*/

#include <stdio.h>

// Function to add two integers
int add(int a, int b) {
  return a + b;
}

int main() {
  int num1 = 10, num2 = 20;
  int sum = add(num1, num2);
  printf("Sum: %d\n", sum);
  return 0;
}
