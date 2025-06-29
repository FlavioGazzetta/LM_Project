#!/bin/bash

# Define the output markdown file
output_file="C:/Users/User/Documents/LM_Project1/LM_Project/Book/Summary_based/combined_book.md"

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
    image_path="$version_folder/version_${version_number}_image.png"
    
    # Check if the version file exists
    if [ -f "$file_path" ]; then
        echo "Adding $file_path to the final output..."
        
        # Add the version text to the markdown output file
        echo "## Version $version_number" >> "$output_file"
        cat "$file_path" >> "$output_file"
        echo -e "\n\n" >> "$output_file"  # Add space between versions

        # Check if the image file exists and update path to relative path
        if [ -f "$image_path" ]; then
            # Add the image path to the markdown output file
            echo "![Version $version_number Image](versions/version_${version_number}_image.png)" >> "$output_file"
            echo -e "\n\n" >> "$output_file"
        else
            echo "No image found for version $version_number."
        fi
        
        # Increment the version number
        version_number=$((version_number + 1))
    else
        # Stop the loop if a version file does not exist
        break
    fi
done

# Notify the user that the markdown file has been created
echo "All available version files have been combined into $output_file."

# Convert the markdown file to PDF using Pandoc
pandoc "$output_file" -o "C:/Users/User/Documents/LM_Project1/LM_Project/Book/Summary_based/combined_book.pdf" --pdf-engine=xelatex

# Notify the user that the PDF has been generated
echo "PDF generated at C:/Users/User/Documents/LM_Project1/LM_Project/Book/Summary_based/combined_book.pdf."
