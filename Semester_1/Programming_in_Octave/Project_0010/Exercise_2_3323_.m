function main()
  % Ορίζουμε τον πίνακα A
  A = [1 0 -1 0;
     0 2 3 -1;
    -1 3 2 2;
     0 -1 2 1];
  
  % Μετατρέπουμε τον πίνακα A σε κλιμακωτή μορφή και αποθηκεύουμε τις στοιχειώδεις μήτρες
  [A_klimakoto, elementary_matrices] = toEchelon(A);
  fprintf('Κλιμακωτός Πίνακας:\n'); % Εντολή για εκτύπωση κειμένου
  disp(A_klimakoto); % Εντολή για εμφάνιση του πίνακα A_klimakoto
  
  % Μετατρέπουμε τον κλιμακωτό πίνακα σε ανοιγμένο κλιμακωτό πίνακα
  [A_anoigmenos_klimakotos, elementary_matrices] = toReducedEchelon(A_klimakoto, elementary_matrices);
  fprintf('Ανοιγμένος Κλιμακωτός Πίνακας:\n'); % Εντολή για εκτύπωση κειμένου
  disp(A_anoigmenos_klimakotos); % Εντολή για εμφάνιση του πίνακα A_anoigmenos_klimakotos
  
  % Υπολογίζουμε τον αντίστροφο του A χρησιμοποιώντας τις στοιχειώδεις μήτρες
  inverse_A = computeInverse(A, elementary_matrices);
  fprintf('Ο αντίστροφος του A είναι:\n'); % Εντολή για εκτύπωση κειμένου
  disp(inverse_A); % Εντολή για εμφάνιση του πίνακα inverse_A
  
  % Ελέγχουμε αν το γινόμενο του A με τον αντίστροφό του δίνει την ταυτότητα
  identity_check = A * inverse_A; % Πολλαπλασιασμός πινάκων
  fprintf('Έλεγχος Α * A^(-1) = I:\n'); % Εντολή για εκτύπωση κειμένου
  disp(identity_check) % Εντολή για εμφάνιση του πίνακα identity_check
  assert(norm(eye(size(A)) - identity_check, 'fro') < 1e-10) % Έλεγχος αν το γινόμενο είναι η ταυτότητα
end

function [A_klimakoto, elementary_matrices] = toEchelon(A)
  A_klimakoto = A;
  n = size(A, 1); % Επιστρέφει το μέγεθος του πίνακα A
  elementary_matrices = {};
  for i = 1:n-1 % Βρόχος for από 1 έως n-1
    % Αν το στοιχείο της διαγωνίου είναι πολύ μικρό, κάνουμε ανταλλαγή γραμμών
    if abs(A_klimakoto(i,i)) < 1e-10 % Επιστρέφει την απόλυτη τιμή του στοιχείου A_klimakoto(i,i)
      [A_klimakoto, E, found] = swapRows(A_klimakoto, i, n);
      if found
        elementary_matrices{end+1} = E; % Προσθήκη της μήτρας E στο τέλος του πίνακα elementary_matrices
      else
        continue
      end
    end
    % Μηδενίζουμε τα στοιχεία κάτω από τη διαγώνιο
    for j = i+1:n % Εσωτερικός βρόχος for από i+1 έως n
      factor = A_klimakoto(j,i) / A_klimakoto(i,i); % Υπολογισμός του παράγοντα
      A_klimakoto(j,:) = A_klimakoto(j,:) - factor * A_klimakoto(i,:); % Ενημέρωση της γραμμής j του πίνακα A_klimakoto
      E = eye(n); % Δημιουργία ταυτοτικής μήτρας μεγέθους n
      E(j, i) = -factor; % Ενημέρωση του στοιχείου E(j, i)
      elementary_matrices{end+1} = E; % Προσθήκη της μήτρας E στο τέλος του πίνακα elementary_matrices
    end
  end
end

function [A, E, found] = swapRows(A, i, n)
  found = false;
  for j = i+1:n % Βρόχος for από i+1 έως n
    % Βρίσκουμε γραμμή για ανταλλαγή
    if abs(A(j,i)) > 1e-10 % Επιστρέφει την απόλυτη τιμή του στοιχείου A(j,i)
      temp = A(i,:); % Αποθήκευση της γραμμής i του πίνακα A
      A(i,:) = A(j,:); % Αντιγραφή της γραμμής j στη γραμμή i
      A(j,:) = temp; % Αντιγραφή της αποθηκευμένης γραμμής στη γραμμή j
      E = eye(n); % Δημιουργία ταυτοτικής μήτρας μεγέθους n
      temp = E(i,:); % Αποθήκευση της γραμμής i της μήτρας E
      E(i,:) = E(j,:); % Αντιγραφή της γραμμής j στη γραμμή i της μήτρας E
      E(j,:) = temp; % Αντιγραφή της αποθηκευμένης γραμμής στη γραμμή j της μήτρας E
      found = true;
      return
    end
  end
  E = [];
end

function [A, elementary_matrices] = toReducedEchelon(A, elementary_matrices)
  n = size(A, 1); % Επιστρέφει το μέγεθος του πίνακα A
  for i = n:-1:2 % Βρόχος for από n έως 2 με βήμα -1
    % Μηδενίζουμε τα στοιχεία πάνω από τη διαγώνιο
    for j = i-1:-1:1 % Εσωτερικός βρόχος for από i-1 έως 1 με βήμα -1
      factor = A(j, i) / A(i, i); % Υπολογισμός του παράγοντα
      A(j, :) = A(j, :) - factor * A(i, :); % Ενημέρωση της γραμμής j του πίνακα A
      E = eye(n); % Δημιουργία ταυτοτικής μήτρας μεγέθους n
      E(j, i) = -factor; % Ενημέρωση του στοιχείου E(j, i)
      elementary_matrices{end+1} = E; % Προσθήκη της μήτρας E στο τέλος του πίνακα elementary_matrices
    end
  end
  for i = 1:n % Βρόχος for από 1 έως n
    % Κανονικοποιούμε τις γραμμές
    factor = 1 / A(i, i); % Υπολογισμός του παράγοντα
    A(i, :) = A(i, :) * factor; % Ενημέρωση της γραμμής i του πίνακα A
    E = eye(n); % Δημιουργία ταυτοτικής μήτρας μεγέθους n
    E(i,i) = factor; % Ενημέρωση του στοιχείου E(i,i)
    elementary_matrices{end+1} = E; % Προσθήκη της μήτρας E στο τέλος του πίνακα elementary_matrices
  end
end

function inverse_A = computeInverse(A, elementary_matrices)
  n = size(A, 1); % Επιστρέφει το μέγεθος του πίνακα A
  inverse_A = eye(n); % Δημιουργία ταυτοτικής μήτρας μεγέθους n
  % Υπολογίζουμε τον αντίστροφο πολλαπλασιάζοντας τις στοιχειώδεις μήτρες
  for i = length(elementary_matrices):-1:1 % Βρόχος for από το μήκος του πίνακα elementary_matrices έως 1 με βήμα -1
    inverse_A = inverse_A * elementary_matrices{i}; % Πολλαπλασιασμός του inverse_A με την i-οστή στοιχειώδη μήτρα
  end
end

main()