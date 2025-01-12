import os
import datetime
import subprocess
import openai
import schedule
import time
import socket

# OpenAI API Key
openai.api_key = "your_openai_api_key"

# Path to your GitHub repository
repo_path = r"C:\Users\User\Documents\LM_Project1\LM_Project"

# Check for internet connection
def is_connected():
    try:
        # Check connectivity by connecting to a common DNS server
        socket.create_connection(("8.8.8.8", 53), timeout=3)
        return True
    except OSError:
        return False

# Function to read the latest file content
def get_latest_file_content():
    files = [f for f in os.listdir(repo_path) if f.startswith("update-") and f.endswith(".txt")]
    if not files:
        return "Start researching FPGA hardware and provide an initial overview."

    latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(repo_path, f)))
    with open(os.path.join(repo_path, latest_file), "r") as file:
        return file.read()

# Function to generate improved content based on the last file
def generate_new_content(previous_content):
    prompt = (
        "You are an expert in FPGA hardware. Read the following research content:\n\n"
        f"{previous_content}\n\n"
        "Improve upon it by adding more advanced research, technical details, and insights into FPGA technology. "
        "Make the content better structured and more detailed for educational purposes."
    )
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Use GPT-4 for premium responses
        messages=[
            {"role": "system", "content": "You are an expert in FPGA hardware."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=800
    )
    return response['choices'][0]['message']['content'].strip()

# Task to create a new file and push it to GitHub
def update_task():
    if not is_connected():
        print("No internet connection. Waiting for reconnection...")
        return

    os.chdir(repo_path)  # Change to the repository directory

    # Read the content of the latest file
    previous_content = get_latest_file_content()

    # Generate new content using OpenAI
    new_content = generate_new_content(previous_content)

    # Generate a new filename
    now = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    file_name = f"update-{now}.txt"

    # Save the new content to a file
    with open(file_name, "w") as file:
        file.write(new_content)

    # Run Git commands to add, commit, and push the new file
    subprocess.run(["git", "add", file_name], shell=True)
    subprocess.run(["git", "commit", "-m", f"Updated FPGA research: {now}"], shell=True)
    subprocess.run(["git", "push", "origin", "main"], shell=True)

    print(f"New file created and pushed: {file_name}")

# Schedule the task to run every 30 minutes
schedule.every(1).minutes.do(update_task)

# Keep the script running to execute the task
print("Automation script running. Press Ctrl+C to exit.")
while True:
    schedule.run_pending()
    time.sleep(1)