#include <stdio.h>
#include <stdlib.h> // Required for malloc, free

// Define a structure with a Flexible Array Member (FAM)
// This feature is available in C99 and later
struct DynamicArray {
    int size;
    int data[]; // Flexible array member - must be the last member
};

int main() {
    int num_elements = 5;
    // Calculate the total size needed: size of struct + size of array
    size_t total_size = sizeof(struct DynamicArray) + num_elements * sizeof(int);

    // Dynamically allocate memory for the structure and its array
    struct DynamicArray *arr = (struct DynamicArray*)malloc(total_size);

    if (arr == NULL) {
        perror("Failed to allocate memory");
        return 1;
    }

    arr->size = num_elements;

    // Populate the flexible array member
    printf("Populating array:\n");
    for (int i = 0; i < arr->size; i++) {
        arr->data[i] = (i + 1) * 10;
        printf("data[%d] = %d\n", i, arr->data[i]);
    }

    // Print the elements
    printf("\nElements in DynamicArray:\n");
    for (int i = 0; i < arr->size; i++) {
        printf("%d ", arr->data[i]);
    }
    printf("\n");

    // Free allocated memory
    free(arr);

    return 0;
}
