/*
Pointers in C

Pointers are variables that store memory addresses.  This example demonstrates basic pointer usage.
*/

#include <stdio.h>

int main() {
  int num = 10;
  int *ptr; // Declare a pointer to an integer

  ptr = &num; // Assign the address of num to ptr

  printf("Value of num: %d\n", num);
  printf("Address of num: %p\n", &num);
  printf("Value of ptr: %p\n", ptr);  //Address stored in ptr
  printf("Value pointed to by ptr: %d\n", *ptr); // Dereference ptr to get the value

  return 0;
}
