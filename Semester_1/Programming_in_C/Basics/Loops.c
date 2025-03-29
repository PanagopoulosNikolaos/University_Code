/*
Loops in C

Loops allow for repetitive execution of code blocks.  C offers several loop types:

- for: Executes a block of code a specific number of times.
- while: Executes a block of code as long as a condition is true.
- do-while: Executes a block of code at least once, then repeats as long as a condition is true.
*/

#include <stdio.h>

int main() {
  // for loop
  for (int i = 0; i < 5; i++) {
    printf("Iteration %d\n", i);
  }

  // while loop
  int count = 0;
  while (count < 3) {
    printf("Count: %d\n", count);
    count++;
  }

  // do-while loop
  int j = 0;
  do {
    printf("Do-while iteration: %d\n", j);
    j++;
  } while (j < 2);

  return 0;
}
