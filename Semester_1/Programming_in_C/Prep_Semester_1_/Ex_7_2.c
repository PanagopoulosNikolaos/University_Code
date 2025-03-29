#include <stdio.h>

double real_Numbers[100];
int count = 0;


void Read_Real_Numbers(){
    double integer;

    while(count<100 && integer != -1){
        scanf("%lf", &integer);
        if (integer > 5.0){
            real_Numbers[count] = integer;
            count++;
        }
    }
}


void Get_Min(){
    if(count == 0){
        printf("No number greater than 5.0 was entered");
        return;
    }
    double min = real_Numbers[0];
    for (int i = 1; i < 100; i++){
        if (real_Numbers[i]<min){
            min = real_Numbers[i];
        }
    }
    printf("The minimum number is: %lf", min);
}

int main(){
    Read_Real_Numbers();
    Get_Min();
    return 0;
}