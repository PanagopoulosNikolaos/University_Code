# include <stdio.h>

/* Sto arxeio grades.txt yparxoun oi bathmoi foititon se 3 ergastiria. Se kathe grammi exei 3 dekadikes
    * times. To programma prepei na diabazei to arxeio kai na emfanizei ta akoloutha:
    * 1) To plithos ton foititon
    * 2) To plithos ton foititon pou kopikan toulaxiston se ena ergastirio
    * 3) To plithos ton foititon pou kopikan se ola ta ergastiria
    * 4) Ton meso oro ton bathmologion gia tous foitites pou perasan kai ta 3 ergastiria.
    * Gia dieykolinsi sas yparxoyn dilomenes oi apaitoumenes metavlites.
    * */
int main(){
    FILE *fp;
    double lab1,lab2,lab3;
    double average;
    int count=0;
    int countFailedOne=0;
    int countFailedAll=0;
    double averagePassed=0.0;
    fp=fopen("grades.txt","r");
    if(fp==NULL){
        printf("Error opening file\n");
        return 1;
    }
    while(fscanf(fp,"%lf %lf %lf",&lab1,&lab2,&lab3)==3){
        count++;
        if(lab1<5.0 || lab2<5.0 || lab3<5.0){
            countFailedOne++;
        }
        if(lab1<5.0 && lab2<5.0 && lab3<5.0){
            countFailedAll++;
        }
        if(lab1>=5.0 && lab2>=5.0 && lab3>=5.0){
            averagePassed += (lab1+lab2+lab3)/3;
        }
    }
    printf("Total number of students: %d\n",count);
    printf("Number of students who failed at least one lab: %d\n",countFailedOne);
    printf("Number of students who failed all labs: %d\n",countFailedAll);
    if(countFailedAll==0){
        printf("No students failed all labs\n");
    }
    else{
        printf("Average of students who passed all labs: %.2f\n",averagePassed/(count-countFailedAll));
    }
    fclose(fp);
    return 0;

    }