// Copying Strings (strcpy)

#include <stdio.h>
#include <string.h>

int main() {
    char source[] = "C Programming";
    char destination[20];
    
    strcpy(destination, source);
    
    printf("Source string: %s\n", source);
    printf("Destination string: %s\n", destination);
    
    return 0;
}
