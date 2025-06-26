#include <stdio.h>
#include <string.h>
#include <ctype.h>

/** I synartisi auti elegxei an ola ta grammata tou keimenou secret emfanizontai
 * mesa sto message. An emfanizontai epistrefei 1 allios 0.
 * Ta grammata prepei na emfanizontai me tin seira pou einai sto secret ena pros ena
 * alla oxi aparaitita synexomena mesa sto message
 *  **/
int checkMessage(char message[],char secret[]){
    int i=0;
    int j=0;
    int found=0;

    while(message[i]!='\0'){
        if(tolower(message[i])==tolower(secret[j])){

            j++;
            if(secret[j]=='\0'){

                found=1;
                j=0;
            }
        }else{

            j=0;
        }
        i++;
    }
    if(found==1){

        return 1;
    }
    // return 0;
}



/** I main() prepei na diabazei apo to pliktrologio word kai secret mexri na parei san word tin lexi END.
 * Gia kathe zeygari poy diabazei tha prepei na kalei tin checkMessage(). Sto telos na emfanisei
 * poses fores i checkMessage() epestrepse 1**/
int main(){
    char word[100];
    char secret[100];
    int count=0;
    do{
        printf("Give word: ");
        scanf("%s",word);
        printf("Give secret: ");
        scanf("%s",secret);
        count+=checkMessage(word,secret);
    }while(strcmp(word,"END")!=0);

    printf("The word was found %d times\n",count);

    return 0;
}