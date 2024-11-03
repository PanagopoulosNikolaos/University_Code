/*
Data Types and Variables in C

C supports several fundamental data types:

- int: Integer values (e.g., 10, -5, 0)
- float: Single-precision floating-point numbers (e.g., 3.14, -2.5)
- double: Double-precision floating-point numbers (e.g., 3.14159265359, -2.50000)
- char: Single characters (e.g., 'A', 'b', '5')
- void: Represents the absence of a type.

Variables are used to store data.  They must be declared with a data type before use.
*/

#include <stdio.h>

int main() {
  int age = 30;
  float price = 99.99;
  char initial = 'J';
  double pi = 3.14159265359;

  printf("Age: %d\n", age);
  printf("Price: %f\n", price);
  printf("Initial: %c\n", initial);
  printf("Pi: %lf\n", pi);

  return 0;
}
