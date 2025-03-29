# include<stdio.h>

float a,b;
float student_scores[100];

void ReadsScores(){
    for (int i = 0; i < 100; i++){
        scanf("%f", &student_scores[i]);
    }
}

void Get_A_B(){
    printf("Enter the value of a and b: ");
    scanf("%f %f", &a, &b);
    while (a>b){
        printf("Enter a value of a and b 'a<=b': ");
        scanf("%f %f", &a, &b);
    }
}

int main(){
    ReadsScores();
    Get_A_B();
    int count = 0;
    for (int i = 0; i < 100; i++){
        if (student_scores[i]>=a && student_scores[i]<=b){
            count++;
        }
    }
    printf("The number of students who scored between a and b is: %d", count);
    return 0;
}