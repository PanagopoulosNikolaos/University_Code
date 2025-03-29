#include <stdio.h>

// 1.Function to calculate sum and average of 5 float values
void calculate_sum_and_average() {
    float values[5];
    float sum = 0.0;
    float average;
    
    printf("Enter 5 float values:\n");
    for (int i = 0; i < 5; i++) {
        scanf("%f", &values[i]);
        sum += values[i];
    }
    
    average = sum / 5;
    
    printf("Sum: %.2f\n", sum);
    printf("Average: %.2f\n", average);
}


// 2.Convert Fahrenheit to Celsius

// Function to convert Fahrenheit to Celsius
float fahrenheit_to_celsius(float fahrenheit) {
    return (fahrenheit - 32) * 5.0 / 9.0;
}

// Function to get temperature in Fahrenheit and convert to Celsius
void convert_temperature() {
    float fahrenheit, celsius;

    printf("Enter temperature in Fahrenheit: ");
    scanf("%f", &fahrenheit);

    celsius = fahrenheit_to_celsius(fahrenheit);

    printf("Temperature in Celsius: %.2f\n", celsius);
}


// 3.Will tke an hour in the following form 16:30:12 and will convert it to seconds
// Function to convert time in HH:MM:SS format to seconds
int time_to_seconds(int hours, int minutes, int seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

// Function to get time in HH:MM:SS format and convert to seconds
void convert_time_to_seconds() {
    int hours, minutes, seconds;
    
    printf("Enter time in Hours:Minutes:Seconds format: ");
    scanf("%d:%d:%d", &hours, &minutes, &seconds);
    
    int total_seconds = time_to_seconds(hours, minutes, seconds);
    
    printf("Total time in seconds: %d\n", total_seconds);
}


// 4. Takes a 3 digit int and returns the digits split and the summed digits
void split_and_sum_digits(int number) {
    int digit1, digit2, digit3;
    int sum;
    
    digit1 = number / 100;
    digit2 = (number / 10) % 10;
    digit3 = number % 10;
    
    sum = digit1 + digit2 + digit3;
    
    printf("Digit 1: %d\n", digit1);
    printf("Digit 2: %d\n", digit2);
    printf("Digit 3: %d\n", digit3);
    printf("Sum of digits: %d\n", sum);
}


// 5. takes 2 hours in the folowing form 16:30:12 and returns the difference in hours:minutes:seconds
void calculate_time_difference() {
    int hours1, minutes1, seconds1;
    int hours2, minutes2, seconds2;
    int total_seconds1, total_seconds2;
    int difference_seconds;
    int difference_hours, difference_minutes, difference_seconds_final;
    
    printf("Enter time 1 in Hours:Minutes:Seconds format: ");
    scanf("%d:%d:%d", &hours1, &minutes1, &seconds1);
    
    printf("Enter time 2 in Hours:Minutes:Seconds format: ");
    scanf("%d:%d:%d", &hours2, &minutes2, &seconds2);
    
    total_seconds1 = time_to_seconds(hours1, minutes1, seconds1);
    total_seconds2 = time_to_seconds(hours2, minutes2, seconds2);
    
    difference_seconds = total_seconds2 - total_seconds1;
    
    difference_hours = difference_seconds / 3600;
    difference_seconds %= 3600;
    difference_minutes = difference_seconds / 60;
    difference_seconds %= 60;
    difference_seconds_final = difference_seconds;
    
    printf("Time difference: %d:%d:%d\n", difference_hours, difference_minutes, difference_seconds_final);
}


// 6. reads the num of university students that passed  and faild the finals and calculates the percentage of students that passed and faild 
void calculate_pass_fail_percentage() {
    int passed, failed;
    int total;
    float pass_percentage, fail_percentage;

    printf("Enter the number of students who passed: ");
    scanf("%d", &passed);
    printf("Enter the number of students who failed: ");
    scanf("%d", &failed);

    total = passed + failed;
    if (total == 0) {
        printf("No students appeared for the exam.\n");
        return;
    }

    pass_percentage = (passed / (float)total) * 100;
    fail_percentage = (failed / (float)total) * 100;

    printf("Pass percentage: %.2f%%\n", pass_percentage);
    printf("Fail percentage: %.2f%%\n", fail_percentage);
}


// 7. will read 2 integers and will return the max and min integer

void calculate_max_min() {
    int max, min;
    int num1, num2;
    printf("Enter two integers: ");
    scanf(" %d", &num1);
    scanf(" %d", &num2);    
    if (num1 > num2) {
        max = num1;
        min = num2;
    } else {
        max = num2;
        min = num1;
    }
    
    printf("Max: %d\n", max);
    printf("Min: %d\n", min);
}
// Main function
int main() {
    int function_number;    // Variable to store the function number
    
    while (1) {
        printf("Enter a function number (1-8) or 0 to exit: ");
        printf("1. Calculate sum and average of 5 float values\n");
        printf("2. Convert Fahrenheit to Celsius\n");
        printf("3. Convert time in HH:MM:SS format to seconds\n");
        printf("4. Split and sum digits of a 3-digit number\n");
        printf("5. Calculate time difference between two times\n");
        printf("6. Calculate pass and fail percentage of students\n");
        printf("7. Calculate max and min of two integers\n");
        printf("8. (coming soon)\n");
        printf("Enter your choice here: ");
        scanf("%d", &function_number);
        
        if (function_number == 0) {
            break;
        } else if (function_number == 1) {
            calculate_sum_and_average();
        } else if (function_number == 2) {
            convert_temperature();
        } else if (function_number == 3) {
            convert_time_to_seconds();
        } else if (function_number == 4) {
            int number;
            printf("Enter a 3 digit number: ");
            scanf("%d", &number);
            split_and_sum_digits(number);
        } else if (function_number == 5) {
            calculate_time_difference();
        } else if (function_number == 6) {
            calculate_pass_fail_percentage();
        } else if (function_number == 7) {
            calculate_max_min();
        } else if (function_number == 8) {
            // Add your function here
        } else {
            printf("Invalid function number\n");
        }
    }
    
    return 0;
}
