import os  # Ensure os module is imported
import time
import subprocess
import openai
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()  # This will read the .env file in the current directory

# Initialize OpenAI client using the API key from .env file
openai.api_key = os.getenv("OPENAI_API_KEY")  # Reads the OPENAI_API_KEY from the .env file

# Configuration
repo_path = r"C:\Users\User\Documents\LM_Project1\LM_Project\Book\Page_to_page"
version_folder = os.path.join(repo_path, "versions")  # Folder for version files
initial_file = os.path.join(repo_path, "initial_input_paper")
daily_request_limit = 10000
max_tokens = 2000  # Limit tokens per request
delay_seconds = 5  # Delay between API calls
request_count = 0  # Track requests made
max_retries = 5  # Maximum retries for incomplete responses

# Ensure the versions folder exists
os.makedirs(version_folder, exist_ok=True)

# Check for internet connection
def is_connected():
    try:
        import socket
        socket.create_connection(("8.8.8.8", 53), timeout=3)
        return True
    except OSError as e:
        print(f"Connection error: {e}")
        return False

# Get the latest file content
def get_latest_file_content():
    try:
        files = [f for f in os.listdir(version_folder) if f.startswith("version_") and f.endswith(".txt")]
        if not files and os.path.exists(initial_file):
            return read_file_content(initial_file)
        elif not files:
            print("No input files found. Please create 'initial_input_paper'.")
            return None
        latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(version_folder, f)))
        return read_file_content(os.path.join(version_folder, latest_file))
    except Exception as e:
        print(f"Error retrieving latest file content: {e}")
        return None

# Read file content
def read_file_content(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

# Write file content
def write_file_content(file_path, content):
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)
    except Exception as e:
        print(f"Error writing to {file_path}: {e}")

# Push changes to GitHub
def push_to_github(file_name, commit_message):
    try:
        os.chdir(repo_path)
        subprocess.run(["git", "add", os.path.join("versions", file_name)], check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        subprocess.run(["git", "push"], check=True)
        print(f"Changes pushed to GitHub: {file_name}")
    except subprocess.CalledProcessError as e:
        print(f"Error pushing to GitHub: {e}")

# Generate improved content using OpenAI
def generate_new_content(previous_content):
    global request_count
    retries = 0

    while retries < max_retries:
        if request_count >= daily_request_limit:
            print("Daily request limit reached. Exiting.")
            return None

        try:
            print(f"Generating new content... Request count: {request_count}")
            time.sleep(delay_seconds)
            response = openai.ChatCompletion.create(
                model="gpt-4",  # Ensure this is the correct model
                messages=[
                    {"role": "system", "content": "You are Stephen King."},
                    {"role": "user", "content": f"This is the last page in your book... {previous_content}"}
                ],
                max_tokens=max_tokens,
                temperature=0.8,
            )

            request_count += 1
            print("API response received")

            # Debug: Output the raw response for inspection
            print(f"Response from OpenAI: {response}")

            # Correctly accessing the generated content
            content = response['choices'][0]['message']['content'].strip()  # Use 'message' instead of 'text'

            # Check if the content is complete
            if content.endswith(".") or len(content.split()) > max_tokens * 0.9:
                return content

            print("Incomplete response detected. Retrying...")

        except Exception as e:
            print(f"Error during API call (Retry {retries + 1}/{max_retries}): {e}")
            time.sleep(delay_seconds * 2)
        retries += 1

    print("Max retries reached for generating new content. Exiting.")
    return None

# Main process loop
def iterative_improvement():
    global request_count
    version = 1
    while request_count < daily_request_limit:
        if not is_connected():
            print("No internet connection. Retrying...")
            time.sleep(delay_seconds)
            continue

        print(f"Processing version {version}...")
        previous_content = get_latest_file_content()
        if not previous_content:
            print("Error: No content to process. Exiting.")
            break

        new_content = generate_new_content(previous_content)
        if not new_content:
            print("Error generating new content. Exiting.")
            break

        new_file = os.path.join(version_folder, f"version_{version}.txt")
        write_file_content(new_file, new_content)
        print(f"Saved version {version} to {new_file}.")

        # Push to GitHub
        push_to_github(f"version_{version}.txt", f"Add version {version} of horror story")

        version += 1
        print(f"Waiting {delay_seconds} seconds for the next iteration...")
        time.sleep(delay_seconds)

# Run the script
if __name__ == "__main__":
    print("Automation script running. Press Ctrl+C to exit.")
    iterative_improvement()
