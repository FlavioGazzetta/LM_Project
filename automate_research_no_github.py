import os
import time
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key="")  # Replace with your actual API key

# Configuration
repo_path = r"C:\Users\User\Documents\LM_Project1\LM_Project"
initial_file = os.path.join(repo_path, "initial_input_paper")
daily_request_limit = 200
max_tokens = 500  # Limit tokens per request to reduce usage
delay_seconds = 40  # Delay between API calls to respect 3 RPM

# Globals
request_count = 0  # Track requests made

# Check for internet connection
def is_connected():
    try:
        time.sleep(delay_seconds / 2)
        import socket
        socket.create_connection(("8.8.8.8", 53), timeout=3)
        return True
    except OSError:
        return False

# Get the latest file content or initial input
def get_latest_file_content():
    files = [f for f in os.listdir(repo_path) if f.startswith("version_") and f.endswith(".txt")]
    if not files and os.path.exists(initial_file):
        return read_file_content(initial_file)
    elif not files:
        print("No input files found. Please create 'initial_input_paper'.")
        return None
    latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(repo_path, f)))
    return read_file_content(os.path.join(repo_path, latest_file))

# Read file content
def read_file_content(file_path):
    try:
        time.sleep(delay_seconds / 2)
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

# Write file content
def write_file_content(file_path, content):
    try:
        time.sleep(delay_seconds / 2)
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)
    except Exception as e:
        print(f"Error writing to {file_path}: {e}")

# Generate improved content using OpenAI
def generate_new_content(previous_content):
    global request_count
    if request_count >= daily_request_limit:
        print("Daily request limit reached. Exiting.")
        return None

    try:
        time.sleep(delay_seconds)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert in FPGA hardware."},
                {"role": "user", "content": f"Improve upon this content:\n\n{previous_content}"}
            ],
            max_tokens=max_tokens,
            temperature=0.7,
        )
        request_count += 1
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error during API call: {e}. Retrying after a delay...")
        time.sleep(delay_seconds * 3)
        return generate_new_content(previous_content)

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

        new_file = os.path.join(repo_path, f"version_{version}.txt")
        write_file_content(new_file, new_content)
        print(f"Saved version {version} to {new_file}.")

        version += 1
        print(f"Waiting {delay_seconds} seconds for the next iteration...")
        time.sleep(delay_seconds)

# Run the script
if __name__ == "__main__":
    print("Automation script running. Press Ctrl+C to exit.")
    iterative_improvement()
