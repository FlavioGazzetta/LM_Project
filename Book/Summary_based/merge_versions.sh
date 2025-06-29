#!/bin/bash

# Define the output file
output_file="C:/Users/User/Documents/LM_Project1/LM_Project/Book/Summary_based/combined_book.txt"

# Clear the output file if it exists
if [ -f "$output_file" ]; then
    rm "$output_file"
fi

# Define the folder containing the version files
version_folder="C:/Users/User/Documents/LM_Project1/LM_Project/Book/Summary_based/versions"

# Initialize version number
version_number=1

# Loop through version files
while true; do
    # Construct the version file path
    file_path="$version_folder/version_$version_number.txt"
    
    # Check if the version file exists
    if [ -f "$file_path" ]; then
        echo "Adding $file_path to the final output..."
        # Append the content of the version file to the output file
        cat "$file_path" >> "$output_file"
        # Add a new line between each file's content for clarity
        echo -e "\n\n" >> "$output_file"
        # Increment the version number
        version_number=$((version_number + 1))
    else
        # Stop the loop if a version file does not exist
        break
    fi
done

# Notify the user that the script has finished
echo "All available version files have been combined into $output_file."
