#include <stdio.h>

// Define a structure named Point
struct Point {
    int x;
    int y;
};

int main() {
    // Declare a variable of type struct Point
    struct Point p1;

    // Assign values to the members of the structure
    p1.x = 10;
    p1.y = 20;

    // Print the values
    printf("Point coordinates: (%d, %d)\n", p1.x, p1.y);

    return 0;
}
