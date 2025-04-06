#include<stdio.h>


int main(){

    int x  = 123;
    int y = 456;
    int age = 20;
    char name[20] = "John Doe";
    double height = 5.9;
    int counter = 0;
    while (0){
        printf("Hello, World!\n");
        printf("x = %d\n", x);
        printf("y = %d\n", y);
        printf("My age is %d\n", age);
        printf("My name is %s\n", name);
        printf("And my height is %0.1f\n", height);//%[width].[precision][type]
        counter++;
        if (counter == 10){
            break;
        }
    
    }
    

    return 0;
}