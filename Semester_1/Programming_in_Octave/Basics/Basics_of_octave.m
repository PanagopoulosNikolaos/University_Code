% Basics of Octave Programming

% 1. Basic arithmetic operations
a = 5 + 3;    % Addition
b = 10 - 4;   % Subtraction
c = 3 * 6;    % Multiplication
d = 15 / 3;   % Division
e = 2^3;      % Exponentiation

% 2. Creating vectors
vector1 = [1 2 3 4 5];        % Row vector
vector2 = [1; 2; 3; 4; 5];    % Column vector
vector3 = 1:5;                % Creates [1 2 3 4 5]
vector4 = 1:0.5:3;           % Creates [1 1.5 2 2.5 3]

% 3. Creating matrices
matrix1 = [1 2 3; 4 5 6; 7 8 9];
matrix2 = zeros(3,3);        % 3x3 matrix of zeros
matrix3 = ones(2,4);         % 2x4 matrix of ones
matrix4 = eye(3);            % 3x3 identity matrix

% 4. Matrix operations
transpose_mat = matrix1';    % Matrix transpose
mat_mult = matrix1 * matrix4;% Matrix multiplication
element_mult = matrix1 .* matrix1; % Element-wise multiplication

% 5. Basic plotting
x = 0:0.1:10;
y = sin(x);
plot(x, y);
title('Basic Sin Plot');
xlabel('x');
ylabel('sin(x)');

% 6. Control structures
for i = 1:5
    disp(i);
end

if a > b
    disp('a is greater than b');
else
    disp('b is greater than or equal to a');
end

% 7. Functions (inline example)
f = @(x) x^2 + 2*x + 1;

% 8. Basic statistics
data = [1 2 3 4 5];
mean_val = mean(data);
std_val = std(data);
max_val = max(data);

% 9. String operations
str1 = 'Hello';
str2 = 'World';
concat_str = [str1 ' ' str2];

% 10. Saving and loading data
save('mydata.mat', 'matrix1');
% To load: load('mydata.mat');

% Display results
disp('Basic operations completed');