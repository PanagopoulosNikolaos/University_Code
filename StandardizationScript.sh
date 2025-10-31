#!/usr/bin/env bash
# This script combines the robust directory creation loop with
# specific commands to move content into the new standard structure.

set -euo pipefail

# Always run from the repo root
cd "/home/ice/Documents/DitOpenNotes"

# ---
# Phase 1: Create Standard Dirs (Your robust loop)
# ---

# Helper: rename a direct subdir of a course to a canonical name (case-insensitive)
rename_subdir_ci() {
    local course="$1" want="$2"
    local found
    # find any direct child directory that matches the target name case-insensitively
    found="$(find "$course" -mindepth 1 -maxdepth 1 -type d -iname "$want" -print -quit || true)"
    if [ -n "${found:-}" ] && [ "$found" != "$course/$want" ]; then
        # If target exists already, merge by moving content
        if [ -d "$course/$want" ]; then
            find "$found" -mindepth 1 -maxdepth 1 -exec mv -t "$course/$want" {} +
            rmdir "$found" || true
    else
            mv "$found" "$course/$want"
        fi
    fi
}

echo "--- Phase 1: Ensuring all courses have standard dirs ---"
# Loop over all course roots: Year_*/Semester_*/*
while IFS= read -r -d '' course; do
    # Normalize existing variants to canonical names
    rename_subdir_ci "$course" "Lectures"
    rename_subdir_ci "$course" "Exercises"
    rename_subdir_ci "$course" "Examples"
    rename_subdir_ci "$course" "Quizzes"

    # Ensure the standard structure exists
    mkdir -p "$course"/{Lectures,Exercises,Examples,Quizzes}

done < <(find Year_* -mindepth 2 -maxdepth 2 -type d -print0)

echo "--- Phase 2: Moving content into standard dirs ---"

# --- Year_1/Semester_1 ---

# C_PROGRAMMING_I: Move Challenges into Exercises
[ -d "Year_1/Semester_1/C_PROGRAMMING_I/Challenges" ] && \
  mv "Year_1/Semester_1/C_PROGRAMMING_I/Challenges" "Year_1/Semester_1/C_PROGRAMMING_I/Exercises/"

# MATHEMATICAL ANALYSIS: Move root book into Lectures
[ -f "Year_1/Semester_1/MATHEMATICAL ANALYSIS/James Stewart - Calculus - Early transcendentals (8th Edition).pdf" ] && \
  mv "Year_1/Semester_1/MATHEMATICAL ANALYSIS/James Stewart - Calculus - Early transcendentals (8th Edition).pdf" "Year_1/Semester_1/MATHEMATICAL ANALYSIS/Lectures/"

# --- Year_1/Semester_2 ---

# C_PROGRAMMING_II: Move src, bin, scripts into Examples
[ -d "Year_1/Semester_2/C_PROGRAMMING_II/src" ] && mv "Year_1/Semester_2/C_PROGRAMMING_II/src" "Year_1/Semester_2/C_PROGRAMMING_II/Examples/"
[ -d "Year_1/Semester_2/C_PROGRAMMING_II/bin" ] && mv "Year_1/Semester_2/C_PROGRAMMING_II/bin" "Year_1/Semester_2/C_PROGRAMMING_II/Examples/"
[ -d "Year_1/Semester_2/C_PROGRAMMING_II/scripts" ] && mv "Year_1/Semester_2/C_PROGRAMMING_II/scripts" "Year_1/Semester_2/C_PROGRAMMING_II/Examples/"

# DIGITAL_ELECTRONICS: Move project folders into Examples
[ -d "Year_1/Semester_2/DIGITAL_ELECTRONICS/Circuits" ] && mv "Year_1/Semester_2/DIGITAL_ELECTRONICS/Circuits" "Year_1/Semester_2/DIGITAL_ELECTRONICS/Examples/"
[ -d "Year_1/Semester_2/DIGITAL_ELECTRONICS/Quartus_Projects" ] && mv "Year_1/Semester_2/DIGITAL_ELECTRONICS/Quartus_Projects" "Year_1/Semester_2/DIGITAL_ELECTRONICS/Examples/"
[ -d "Year_1/Semester_2/DIGITAL_ELECTRONICS/VHDL_CODE_EXEC" ] && mv "Year_1/Semester_2/DIGITAL_ELECTRONICS/VHDL_CODE_EXEC" "Year_1/Semester_2/DIGITAL_ELECTRONICS/Examples/"

# DISCREET_MATHEMATICS: Move LEARNING_MATERIAL to Lectures, move root .md files
[ -d "Year_1/Semester_2/DISCREET_MATHEMATICS/LEARNING_MATERIAL" ] && \
  mv Year_1/Semester_2/DISCREET_MATHEMATICS/LEARNING_MATERIAL/* Year_1/Semester_2/DISCREET_MATHEMATICS/Lectures/ && \
  rmdir Year_1/Semester_2/DISCREET_MATHEMATICS/LEARNING_MATERIAL
find "Year_1/Semester_2/DISCREET_MATHEMATICS" -maxdepth 1 -type f -name "[1-7]_*.md" -exec mv -t "Year_1/Semester_2/DISCREET_MATHEMATICS/Lectures" {} +
[ -f "Year_1/Semester_2/DISCREET_MATHEMATICS/ΔΙΑΚΡΙΤΑ_ΜΑΘΗΜΑΤΙΚΑ_Θεωρία_και_Λύσεις_Ασκήσεων.md" ] && \
  mv "Year_1/Semester_2/DISCREET_MATHEMATICS/ΔΙΑΚΡΙΤΑ_ΜΑΘΗΜΑΤΙΚΑ_Θεωρία_και_Λύσεις_Ασκήσεων.md" "Year_1/Semester_2/DISCREET_MATHEMATICS/Exercises/"

# ELECTROMAGNETICS: Move root PDFs to Lectures, .ipynb to Examples
find "Year_1/Semester_2/ELECTROMAGNETICS" -maxdepth 1 -type f -name "*.pdf" -exec mv -t "Year_1/Semester_2/ELECTROMAGNETICS/Lectures" {} +
[ -f "Year_1/Semester_2/ELECTROMAGNETICS/math.ipynb" ] && mv "Year_1/Semester_2/ELECTROMAGNETICS/math.ipynb" "Year_1/Semester_2/ELECTROMAGNETICS/Examples/"

# NETWORKING: Move THEORY to Lectures, LabDocs to Exercises, root .md to Exercises
[ -d "Year_1/Semester_2/NETWORKING/THEORY" ] && \
  mv Year_1/Semester_2/NETWORKING/THEORY/* Year_1/Semester_2/NETWORKING/Lectures/ && \
  rmdir Year_1/Semester_2/NETWORKING/THEORY
[ -d "Year_1/Semester_2/NETWORKING/LabDocs" ] && \
  mv Year_1/Semester_2/NETWORKING/LabDocs/* Year_1/Semester_2/NETWORKING/Exercises/ && \
  rmdir Year_1/Semester_2/NETWORKING/LabDocs
find "Year_1/Semester_2/NETWORKING" -maxdepth 1 -type f -name "Exercise*.md" -exec mv -t "Year_1/Semester_2/NETWORKING/Exercises" {} +

# --- Year_2/Semester_3 ---

# DSA: Move Exercise_* to Exercises, src/DSA_Python to Examples
find "Year_2/Semester_3/DSA_DATA_STRUCTURES_ALGORITHMS" -maxdepth 1 -type d -name "Exercise_*" -exec mv -t "Year_2/Semester_3/DSA_DATA_STRUCTURES_ALGORITHMS/Exercises" {} +
[ -d "Year_2/Semester_3/DSA_DATA_STRUCTURES_ALGORITHMS/src/DSA_Python" ] && \
  mv "Year_2/Semester_3/DSA_DATA_STRUCTURES_ALGORITHMS/src/DSA_Python" "Year_2/Semester_3/DSA_DATA_STRUCTURES_ALGORITHMS/Examples/" && \
  rmdir "Year_2/Semester_3/DSA_DATA_STRUCTURES_ALGORITHMS/src"
  
# OOP: Move root PDFs to Lectures, Exercise_1 to Exercises
find "Year_2/Semester_3/OBJECT_ORIENTED_PROGRAMMING" -maxdepth 1 -type f -name "*.pdf" -exec mv -t "Year_2/Semester_3/OBJECT_ORIENTED_PROGRAMMING/Lectures" {} +
[ -d "Year_2/Semester_3/OBJECT_ORIENTED_PROGRAMMING/Exercise_1" ] && mv "Year_2/Semester_3/OBJECT_ORIENTED_PROGRAMMING/Exercise_1" "Year_2/Semester_3/OBJECT_ORIENTED_PROGRAMMING/Exercises/"

# SIGNAL_PROPAGATION: Move root PDF to Lectures
find "Year_2/Semester_3/SIGNAL_PROPAGATION" -maxdepth 1 -type f -name "*.pdf" -exec mv -t "Year_2/Semester_3/SIGNAL_PROPAGATION/Lectures" {} +

# SIGNALS_AND_SYSTEMS: Move root PDFs to Lectures
find "Year_2/Semester_3/SIGNALS_AND_SYSTEMS" -maxdepth 1 -type f -name "*.pdf" -exec mv -t "Year_2/Semester_3/SIGNALS_AND_SYSTEMS/Lectures" {} +


echo "Standardization complete."