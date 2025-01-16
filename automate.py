import os
import time
import subprocess
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key="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")  # Replace with your actual API key

# Configuration
repo_path = r"C:\Users\User\Documents\LM_Project1\LM_Project"
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
    except OSError:
        return False

# Get the latest file content
def get_latest_file_content():
    files = [f for f in os.listdir(version_folder) if f.startswith("version_") and f.endswith(".txt")]
    if not files and os.path.exists(initial_file):
        return read_file_content(initial_file)
    elif not files:
        print("No input files found. Please create 'initial_input_paper'.")
        return None
    latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(version_folder, f)))
    return read_file_content(os.path.join(version_folder, latest_file))

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
            time.sleep(delay_seconds)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are Stephen King."},
                    {"role": "user", "content": f"This is the last page in your book, use this and the previous parts of our conversation to write the next page for a horror story. Keep in mind this story will be around 200 pages long, you are currently on page: {request_count} :\n\n{previous_content}"}
                ],
                max_tokens=max_tokens,
                temperature=0.8,
            )
            request_count += 1
            content = response.choices[0].message.content.strip()
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
        push_to_github(f"version_{version}.txt", f"Add version {version} of FPGA research")

        version += 1
        print(f"Waiting {delay_seconds} seconds for the next iteration...")
        time.sleep(delay_seconds)

# Run the script
if __name__ == "__main__":
    print("Automation script running. Press Ctrl+C to exit.")
    iterative_improvement()
