## Χειμερινό Εξάμηνο 2024-2025

Η παρακάτω εργασία στόχο έχει την εξοικείωση των φοιτητών με μεθόδους στην γραμμική άλγεβρα.

<aside>
Καλείστε να υλοποιήσετε την παρακάτω εργασία.

</aside>

### Βασικές Πληροφορίες

- Η παράδοση της εργασίας είναι υποχρεωτική για την εξέταση του μαθήματος.
- Η εργασία είναι απαλλακτική δηλαδή ο βαθμός της εργασίας θα αποτελέσει και το βαθμό εξέτασης του μαθήματος, για τους φοιτητές που παραδώσουν την εργασία και εξεταστούν επιτυχώς σε αυτή.
- Η Εργασία είναι ατομική και οι φοιτητές θα εξεταστούν προφορικά στην εργασία που έχουν καταθέσει.
- Η παράδοση της εργασίας θα γίνει αποκλειστικά μέσω του περιβάλλοντος e-course και κάθε φοιτητής καλείται να αναρτήσει ένα αρχείο zip που θα το ονομάσετε Assigm2AM.zip (όπου ΑΜ ο αριθμός μητρώου σας)
- μία αναφορά με απαντήσεις στις παρακάτω ασκήσεις
- τα αρχεία υλοποίησης για την κάθε άσκηση δηλαδή τις υλοποιήσεις σε matlab/octave(τα m files, που για κάθε άσκηση θα τα ονομάσετε AskxAM, όπου x ο αριθμός της άσκησης και ΑΜ ο αριθμός μητρώου σας)

## Άσκηση 1 (30%)

Ας θεωρήσουμε το σύστημα Ax=b, με

```matlab
A = [1 0 -1 0;
     0 2 3 -1;
    -1 3 2 2;
     0 -1 2 1]
```

Και διανύσματα σταθερών όρων:

```matlab
b1 = [1; 0; -1; 1]
b2 = [0; -1; 0; 1]
```

### A. Τριγωνική Παραγοντοποίηση LU

Να γραφεί πρόγραμμα σε matlab/octave που να υπολογίζει την τριγωνική παραγοντοποίηση LU και χρησιμοποιήστε την για να επιλύσετε το σύστημα για κάθε διάνυσμα σταθερών όρων.

### B. Συναρτήσεις Επίλυσης

a. Γράψτε μια συνάρτηση σε MATLAB/Octave για τη λύση του παραπάνω τριγωνικού συστήματος με εμπρός αντικατάσταση. Η κλήση συνάρτησης πρέπει να μοιάζει:

```matlab
function[y] = SolForward(L, b)
```

Δοκιμάστε τον κώδικα με είσοδο των κάτω τριγωνικό πίνακα του ερωτήματος Α

b. Γράψτε μια συνάρτηση σε MATLAB/Octave για τη λύση του άνω τριγωνικού συστήματος με πίσω αντικατάσταση. Η κλήση συνάρτησης πρέπει να μοιάζει:

```matlab
function[x] = SolBackward(U, y)
```

Δοκιμάστε τον κώδικα για την επίλυση του συστήματος με είσοδο τον άνω τριγωνικό πίνακα του ερωτήματος Α

---

### Solution: Exercise_1_3323_.m

```jsx
% Άσκηση_1_3323_.m

function main()
    % Ορισμός πίνακα A
    A = [
        1  0 -1  0;
        0  2  3 -1;
       -1  3  2  2;
        0 -1  2  1
    ];

    % Ορισμός διανυσμάτων b1 και b2
    b1 = [1; 0; -1; 1];
    b2 = [0; -1; 0; 1];

    % Παραγοντοποίηση LU
    % Επιστρέφει τους πίνακες L (κάτω τριγωνικός), U (άνω τριγωνικός) και P (μεταθέσεων)
    [L, U, P] = lu(A);

    % Επίλυση για το b1
    % Πρώτα λύνουμε το Ly = Pb1
    y1 = SolForward(L, P*b1);
    % Μετά λύνουμε το Ux = y
    x1 = SolBackward(U, y1);

    % Επίλυση για το b2
    % Ομοίως για το δεύτερο σύστημα
    y2 = SolForward(L, P*b2);
    x2 = SolBackward(U, y2);

    % Εμφάνιση αποτελεσμάτων
    disp('Λύση για το b1:');
    disp(x1);

    disp('Λύση για το b2:');
    disp(x2);
end

main();

% Συνάρτηση για εμπρόσθια αντικατάσταση
% Επιλύει το σύστημα Ly = b
function y = SolForward(L, b)
    % n είναι η διάσταση του συστήματος
    n = length(b);
    % Αρχικοποίηση του διανύσματος λύσης
    y = zeros(n,1);
    for i = 1:n
        y(i) = b(i);
        % Υπολογισμός των όρων αθροίσματος
        for j = 1:i-1
            y(i) = y(i) - L(i,j)*y(j);
        end
        % Διαίρεση με το διαγώνιο στοιχείο
        y(i) = y(i) / L(i,i);
    end
end

% Συνάρτηση για οπίσθια αντικατάσταση
% Επιλύει το σύστημα Ux = y
function x = SolBackward(U, y)
    % n είναι η διάσταση του συστήματος
    n = length(y);
    % Αρχικοποίηση του διανύσματος λύσης
    x = zeros(n,1);
    for i = n:-1:1
        x(i) = y(i);
        % Υπολογισμός των όρων αθροίσματος
        for j = i+1:n
            x(i) = x(i) - U(i,j)*x(j);
        end
        % Διαίρεση με το διαγώνιο στοιχείο
        x(i) = x(i) / U(i,i);
    end
end

```

### Output:

```jsx
warning: function name 'main' does not agree with function filename '/home/ice/Documents/Programming/Octave/Exercise_1_3323_.m'
Λύση για το b1:
   1.2500
  -0.2500
   0.2500
   0.2500
Λύση για το b2:
   0.071429
  -0.357143
   0.071429
   0.500000
```

## Άσκηση 2 (35%)

1. Για τον πίνακα Α υπολογίστε τους Στοιχειώδεις Πίνακες που απαιτούνται ώστε ο πίνακας A να ,μετατραπεί σε κλιμακωτό και ανοιγμένο κλιμακωτό. Για την ανεύρεση των πινάκων θα πρέπει να εκτελέσετε γραμμικές πράξεις στους πίνακες καλείστε τις πράξεις αυτές να τις υλοποιήσετε με την βοήθεια της matlab/octave και να παρουσιάστε τα κατάλληλα επιλεγμένα μητρώα(πίνακες) ή διανύσματα που χρησιμοποιήσατε για να πολλαπλασιάζεται το κάθε μητρώο/πίνακα.
2. Έπειτα θα υπολογίσετε τον αντίστροφο του πίνακα Α με την βοήθεια των πινάκων που χρησιμοποιήσατε

<aside>
Για την συγκεκριμένη άσκηση:

- a) θα καταγράψετε στην αναφορά σας τα κατάλληλα επιλεγμένα μητρώα(πίνακες) ή διανύσματα που χρησιμοποιήσατε για να πολλαπλασιάζεται το κάθε μητρώο/πίνακα που χρησιμοποιήσετε.
- b) θα καταθέσετε το αρχείο m που πραγματοποιεί την επίλυση της παραπάνω άσκησης
</aside>

### Solution: Exercise_2_3323_.m

```jsx
% Exercise_2_3323_.m
A = [1 0 -1 0;
     0 2 3 -1;
    -1 3 2 2;
     0 -1 2 1];

n = size(A, 1);

% 1. Μετατροπή σε κλιμακωτό και ανοιγμένο κλιμακωτό
A_klimakoto = A;
elementary_matrices = {};
for i = 1:n-1
  % Αν είναι 0 το στοιχείο [i,i]
  if abs(A_klimakoto(i,i)) < 1e-10
        % Αλλάζω γραμμές αν δεν είναι 0 τα κάτω στοιχεία
        found = false;
        for j = i+1:n
          if abs(A_klimakoto(j,i)) > 1e-10
            temp = A_klimakoto(i,:);
            A_klimakoto(i,:) = A_klimakoto(j,:);
            A_klimakoto(j,:) = temp;
            E = eye(n);
            temp = E(i,:);
            E(i,:) = E(j,:);
            E(j,:) = temp;
            elementary_matrices{end+1} = E;
            found = true;
            break
          end
        end
        if ~found
          continue % Αν βρέθηκε 0 τότε το αφήνω ως έχει.
        end
  end
  for j = i+1:n
      factor = A_klimakoto(j,i) / A_klimakoto(i,i);
      A_klimakoto(j,:) = A_klimakoto(j,:) - factor * A_klimakoto(i,:);
       E = eye(n);
       E(j, i) = -factor;
       elementary_matrices{end+1} = E;
  end
end

fprintf('Κλιμακωτός Πίνακας:\n');
disp(A_klimakoto);

% Από τον κλιμακωτό σε ανοιγμένο κλιμακωτό
A_anoigmenos_klimakotos = A_klimakoto;
for i = n:-1:2
    for j = i-1:-1:1
        factor = A_anoigmenos_klimakotos(j, i) / A_anoigmenos_klimakotos(i, i);
        A_anoigmenos_klimakotos(j, :) = A_anoigmenos_klimakotos(j, :) - factor * A_anoigmenos_klimakotos(i,:);
        E = eye(n);
        E(j, i) = -factor;
        elementary_matrices{end+1} = E;
    end
end

for i = 1:n
    factor = 1 / A_anoigmenos_klimakotos(i, i);
    A_anoigmenos_klimakotos(i, :) = A_anoigmenos_klimakotos(i, :) * factor;
    E = eye(n);
    E(i,i) = factor;
    elementary_matrices{end+1} = E;
end

fprintf('Ανοιγμένος Κλιμακωτός Πίνακας:\n');
disp(A_anoigmenos_klimakotos);

% 2. Υπολογισμός αντίστροφου
inverse_A = eye(n);
for i = length(elementary_matrices):-1:1
   inverse_A = inverse_A* elementary_matrices{i};
end
fprintf('Ο αντίστροφος του A είναι:\n');
disp(inverse_A);

% Έλεγχος του αντίστροφου
identity_check = A * inverse_A;
fprintf('Έλεγχος Α * A^(-1) = I:\n');
disp(identity_check)
assert(norm(eye(n) - identity_check, 'fro') < 1e-10)
```

### Output:

```jsx
Κλιμακωτός Πίνακας:
   1.0000        0  -1.0000        0
        0   2.0000   3.0000  -1.0000
        0        0  -3.5000   3.5000
        0        0        0   4.0000
Ανοιγμένος Κλιμακωτός Πίνακας:
   1   0   0   0
   0   1   0   0
   0   0   1   0
   0   0   0   1
Ο αντίστροφος του A είναι:
   0.964286   0.178571  -0.035714   0.250000
   0.178571   0.107143   0.178571  -0.250000
  -0.035714   0.178571  -0.035714   0.250000
   0.250000  -0.250000   0.250000   0.250000
Έλεγχος Α * A^(-1) = I:
   1.0000        0        0        0
        0   1.0000        0        0
        0   0.0000   1.0000        0
   0.0000  -0.0000   0.0000   1.0000
```

## Άσκηση 3 (35%)

Η άσκηση αυτή θα πρέπει να υλοποιηθεί στο προγραμματιστικό περιβάλλον matlab/octave.

1.  Καλείστε να υλοποιήσετε μια συνάρτηση που θα έχει σαν είσοδο έναν 3Χ3 συμμετρικό πίνακα.
2.  Επίσης η συνάρτηση θα υπολογίζει το χαρακτηριστικό πολυώνυμο του πίνακα
3.  Η συνάρτηση θα υπολογίζει τις ιδιοτιμές του πίνακα χρησιμοποιώντας το χαρακτηριστικό πολυώνυμο.

Για την εκτέλεση των ερωτημάτων 1,2 και 3 χρησιμοποιείστε τον πίνακα Β:

```matlab
B = [1 5 10;
     5 1 3;
     10 3 1]
```

1.  Υπολογίστε τις ιδιοτιμές για τον πίνακα Α2:

```matlab
A2 = [-1 5 2;
      5 -1 2;
      2 2 2]
```

1.  Ποια είναι τα ιδιοδιανύσματα του πίνακα; Ο πίνακας είναι διαγωνοποιήσιμος και γιατί; Υπολογίστε τον αντίστροφο του πίνακα. Τί έχετε να παρατηρήσετε;
2.  Για την επίλυση των ερωτημάτων IV και V χρησιμοποιείστε τον πίνακα Α της πρώτης άσκησης. Τι έχετε να παρατηρήσετε για τις ιδιοτιμές του και τα ιδιοδιανύσματα σε σχέση με τον πίνακα Α2. Επιπρόσθετα επιλύστε το σύστημα με την βοήθεια των ιδιοδιανυσμάτων που βρήκατε για τα διανύσματα σταθερών όρων b1 και b2.και 𝑏2.

### Solution: Exercise_3_3323_.m

```jsx
% Exercise_3_3323_.m

function main()
    % Exercise 3: Eigenvalues and Eigenvectors Analysis
    % Author: Your Name
    % Date: Current Date
    
    % Test the function with matrix B
    B = [1 5 10; 5 1 3; 10 3 1];
    disp('Analysis for matrix B:');
    disp('Matrix B =');
    disp(B);
    [eigenvals_B, char_poly_B] = calculate_eigenvalues(B);
    disp('Characteristic polynomial coefficients:');
    disp(char_poly_B);
    disp('Eigenvalues of B:');
    disp(eigenvals_B);

    % Analysis for matrix A2
    A2 = [-1 5 2; 5 -1 2; 2 2 2];
    disp('Analysis for matrix A2:');
    disp('Matrix A2 =');
    disp(A2);
    [eigenvals_A2, char_poly_A2] = calculate_eigenvalues(A2);
    disp('Eigenvalues of A2:');
    disp(eigenvals_A2);

    % Calculate eigenvectors for A2
    [V, D] = eig(A2);
    disp('Eigenvectors of A2:');
    disp(V);

    % Check if A2 is diagonalizable
    if rank(V) == 3
        disp('A2 is diagonalizable because it has a full set of linearly independent eigenvectors');
    else
        disp('A2 is not diagonalizable');
    end

    % Calculate inverse of A2
    A2_inv = inv(A2);
    disp('Inverse of A2:');
    disp(A2_inv);

    % Analysis for matrix A from Exercise 1
    A = [1 0 -1 0; 0 2 3 -1; -1 3 2 2; 0 -1 2 1];
    [V_A, D_A] = eig(A);
    disp('Eigenvalues of A:');
    disp(diag(D_A));
    disp('Eigenvectors of A:');
    disp(V_A);

    % Solve systems using eigenvectors
    b1 = [1; 0; -1; 1];
    b2 = [0; -1; 0; 1];

    sol_b1 = V_A * inv(D_A) * inv(V_A) * b1;
    sol_b2 = V_A * inv(D_A) * inv(V_A) * b2;

    disp('Solution for b1:');
    disp(sol_b1);
    disp('Solution for b2:');
    disp(sol_b2);
end

function [eigenvals, char_poly] = calculate_eigenvalues(A)
    % Check if matrix is 3x3 and symmetric
    [m, n] = size(A);
    if m ~= 3 || n ~= 3
        error('Matrix must be 3x3');
    end
    if ~isequal(A, A')
        error('Matrix must be symmetric');
    end
    
    % Calculate characteristic polynomial coefficients
    a = -trace(A);
    b = det(A(1:2,1:2)) + det(A(2:3,2:3)) + det([A(1,1) A(1,3); A(3,1) A(3,3)]);
    c = -det(A);
    char_poly = [1 a b c];
    
    % Calculate eigenvalues using roots function
    eigenvals = roots(char_poly);
end

```

### Output:

```bash

warning: function name 'main' does not agree with function filename '/home/ice/Documents/Programming/Octave/Exercise_3_3323_.m'
Ανάλυση για τον πίνακα B:
Πίνακας B =
    1    5   10
    5    1    3
   10    3    1
Συντελεστές χαρακτηριστικού πολυωνύμου:
     1    -3  -131  -167
Ιδιοτιμές του B:
   13.5649
   -9.2312
   -1.3336
Ανάλυση για τον πίνακα A2:
Πίνακας A2 =
  -1   5   2
   5  -1   2
   2   2   2
Ιδιοτιμές του A2:
   6
  -6
   0
Ιδιοδιανύσματα του A2:
  -7.0711e-01  -4.0825e-01  -5.7735e-01
   7.0711e-01  -4.0825e-01  -5.7735e-01
   6.1059e-17   8.1650e-01  -5.7735e-01
Ο A2 είναι διαγωνοποιήσιμος επειδή έχει πλήρες σύνολο γραμμικά ανεξάρτητων ιδιοδιανυσμάτων
Ο πίνακας A2 είναι ιδιομορφικός και δεν μπορεί να αντιστραφεί.
Ιδιοτιμές του A:
  -2.4819
   0.9466
   2.2586
   5.2766
Ιδιοδιανύσματα του A:
  -0.182388   0.952979  -0.168981   0.173237
   0.541147   0.116380  -0.559860  -0.616581
  -0.635052   0.050849   0.212676  -0.740873
   0.520195   0.275138   0.782797  -0.202300
Λύση για το b1:
   1.2500
  -0.2500
   0.2500
   0.2500
Λύση για το b2:
   0.071429
  -0.357143
   0.071429
   0.500000
```