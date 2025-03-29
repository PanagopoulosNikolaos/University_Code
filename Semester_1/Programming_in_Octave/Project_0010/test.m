pkg load symbolic; % Φόρτωση της βιβλιοθήκης
syms x;
a = limit(sin(x)/x, x, 0)
disp(a)