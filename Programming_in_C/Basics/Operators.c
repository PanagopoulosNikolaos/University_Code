/*
Operators in C

C provides a rich set of operators for performing various operations:

- Arithmetic Operators: +, -, *, /, % (modulo)
- Relational Operators: == (equal to), != (not equal to), > (greater than), < (less than), >= (greater than or equal to), <= (less than or equal to)
- Logical Operators: && (AND), || (OR), ! (NOT)
- Assignment Operators: =, +=, -=, *=, /=, %=
- Bitwise Operators: &amp;, |, ^, ~, <<, >> (These operate on individual bits of data)
*/

#include <stdio.h>

int main() {
  int a = 10, b = 5;

  printf("a + b = %d\n", a + b);
  printf("a - b = %d\n", a - b);
  printf("a * b = %d\n", a * b);
  printf("a / b = %d\n", a / b);
  printf("a %% b = %d\n", a % b); //Modulo operator

  if (a == b) {
    printf("a is equal to b\n");
  } else {
    printf("a is not equal to b\n");
  }

  return 0;
}
