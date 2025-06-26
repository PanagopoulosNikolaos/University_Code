# include <stdio.h>
# define NMAX 10


/** Auti i synartisi diabazei tous bathmous n foititon sto mathima x.
 * I synartisi diabazei times mono sto diastima [0,10]**/
void readArray(int x[],int n){
    int i;
    for(i=0;i<n;i++){
        do{
            printf("Dwse bathmo gia foititi %d: ",i);
            scanf("%d",&x[i]);
        }while(x[i]<0 || x[i]>10);
    }
}

/** Auti i synartisi briskei kai epistrefei ton foititi (thesi ston pinaka)
 * pou exei ton kalytero meso oro sta dyo mathimata x,y**/
int bestStudent(int x[], int y[], int n){
    int i, maxIndex = 0;
    float maxAvg = 0, currentAvg;
    
    for(i = 0; i < n; i++){
        currentAvg = (x[i] + y[i]) / 2.0;
        if(currentAvg > maxAvg){
            maxAvg = currentAvg;
            maxIndex = i;
        }
    }
    
    return maxIndex;
}


int main(){
    int lesson1[NMAX],lesson2[NMAX];
    int best;
    readArray(lesson1,NMAX);
    readArray(lesson2,NMAX);
    best = bestStudent(lesson1,lesson2,NMAX);
    printf("Best student %d \n",best);//array position
    return 0;
}

