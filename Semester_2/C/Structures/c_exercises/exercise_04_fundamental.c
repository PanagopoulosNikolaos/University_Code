#include <stdio.h>
#include <string.h>

// Define Address structure
struct Address {
    char street[50];
    char city[50];
    char zip_code[10];
};

// Define Person structure with nested Address
struct Person {
    char name[50];
    int age;
    struct Address address; // Nested structure
};

int main() {
    // Declare a variable of type struct Person
    struct Person p1;

    // Assign values to the members of the Person structure
    strcpy(p1.name, "John Doe");
    p1.age = 30;

    // Assign values to the members of the nested Address structure
    strcpy(p1.address.street, "123 Main St");
    strcpy(p1.address.city, "Anytown");
    strcpy(p1.address.zip_code, "12345");

    // Print the values
    printf("Person Name: %s\n", p1.name);
    printf("Person Age: %d\n", p1.age);
    printf("Address: %s, %s, %s\n", p1.address.street, p1.address.city, p1.address.zip_code);

    return 0;
}
