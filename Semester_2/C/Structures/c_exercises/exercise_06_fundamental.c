#include <stdio.h>
#include <math.h> // For math functions, though M_PI might need _USE_MATH_DEFINES or manual definition

// Define PI manually for portability
const double PI = 3.14159265358979323846;

// Define a structure named Circle
struct Circle {
    double radius;
};

// Function to calculate the area of a circle
double calculateArea(struct Circle c) {
    return PI * c.radius * c.radius;
}

int main() {
    // Declare a variable of type struct Circle
    struct Circle myCircle = {5.0};

    // Calculate area using the function
    double area = calculateArea(myCircle);

    // Print the area
    printf("The area of the circle with radius %.2f is %.2f\n", myCircle.radius, area);

    return 0;
}
