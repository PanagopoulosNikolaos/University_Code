#include <stdio.h>
#include <string.h>

// Define a structure named Movie
struct Movie {
    int id;
    char title[100];
    int year;
};

int main() {
    FILE *fp;
    struct Movie movie;
    int search_id;
    int found = 0;

    printf("Enter Movie ID to search: ");
    scanf("%d", &search_id);

    fp = fopen("movies.dat", "rb");
    if (fp == NULL) {
        perror("Error opening movies.dat");
        return 1;
    }

    while (fread(&movie, sizeof(struct Movie), 1, fp) == 1) {
        if (movie.id == search_id) {
            printf("\nMovie Found:\n");
            printf("ID: %d\n", movie.id);
            printf("Title: %s\n", movie.title);
            printf("Year: %d\n", movie.year);
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("Movie with ID %d not found.\n", search_id);
    }

    fclose(fp);

    return 0;
}
