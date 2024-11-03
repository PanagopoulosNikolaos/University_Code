/*
Arrays in C

Arrays are used to store collections of elements of the same data type.
*/

#include <stdio.h>

int main() {
  int numbers[5] = {10, 20, 30, 40, 50};

  for (int i = 0; i < 5; i++) {
    printf("Number %d: %d\n", i + 1, numbers[i]);
  }

  return 0;
}
