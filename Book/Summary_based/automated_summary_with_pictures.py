import os
import time
import subprocess
import openai
import requests
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

# Load environment variables from the .env file
load_dotenv()  # This will read the .env file in the current directory

# Initialize OpenAI client using the API key from .env file
openai.api_key = os.getenv("OPENAI_API_KEY")  # Reads the OPENAI_API_KEY from .env file

# Configuration
repo_path = r"C:\Users\User\Documents\LM_Project1\LM_Project\Book\Summary_based"
version_folder = os.path.join(repo_path, "versions")  # Folder for version files
initial_file = os.path.join(repo_path, "initial_input_paper.txt")  # Correcting the input file extension
daily_request_limit = 10000
max_tokens = 2000  # Limit tokens per request
delay_seconds = 5  # Delay between API calls
request_count = 0  # Track requests made
max_retries = 5  # Maximum retries for incomplete responses
topic_transition_threshold = 5  # After 5 versions, GPT will consider moving to the next chapter

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

# Get the content of the last 5 versions
def get_last_5_versions_content():
    try:
        files = [f for f in os.listdir(version_folder) if f.startswith("version_") and f.endswith(".txt")]
        if not files and os.path.exists(initial_file):
            return read_file_content(initial_file)
        elif not files:
            print("No input files found. Please create 'initial_input_paper.txt'.")
            return None

        # Sort files based on modification time (most recent first)
        files = sorted(files, key=lambda f: os.path.getmtime(os.path.join(version_folder, f)), reverse=True)

        # Get the content of the last 5 files
        last_5_files = files[:5]
        content = ""
        for file in last_5_files:
            content += read_file_content(os.path.join(version_folder, file)) + "\n"

        return content
    except Exception as e:
        print(f"Error retrieving last 5 versions: {e}")
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

# Extract specific concepts or key phrases for image generation
def extract_image_prompt(content):
    image_keywords = [
        "vector extension", "RISC-V pipeline", "cryptographic accelerator", 
        "machine learning", "neural network", "domain-specific architecture", 
        "heterogeneous computing", "security mechanisms", "performance optimization"
    ]
    prompt = None
    for keyword in image_keywords:
        if keyword.lower() in content.lower():
            prompt = f"Create an illustration or diagram showing the concept of {keyword}. Focus on clear technical visualization of this idea, for example, a RISC-V pipeline diagram or vector extension illustration."
            break
    return prompt

# Generate improved content using OpenAI
def generate_new_content(previous_content, chapter_number, version_count):
    global request_count
    retries = 0
    topic_threshold_reached = False

    while retries < max_retries:
        if request_count >= daily_request_limit:
            print("Daily request limit reached. Exiting.")
            return None, None, topic_threshold_reached

        try:
            print(f"Generating new content for page {chapter_number}... Request count: {request_count}")
            time.sleep(delay_seconds)

            traits = read_file_content("writer_traits.txt")

            # Pass content to GPT for continuation
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{
                    "role": "system", "content": f"You are a writer with the following traits: {traits}"},
                    {"role": "user", "content": f"Write the next page in the book, continuing from the following content (last 5 versions). The book is about processors, and you are currently working on page {chapter_number}. Keep the tone consistent, technical, and engaging. The content has covered various aspects of processors. Here's the previous content:\n\n{previous_content}"}
                ],
                max_tokens=max_tokens,
                temperature=0.8,
            )

            request_count += 1
            print("API response received")

            content = response['choices'][0]['message']['content'].strip()

            # Prevent redundancy by introducing new topics
            if version_count >= topic_transition_threshold:
                content += "\n\nNow that we've covered enough on processor evolution and their history, let's move to the next chapter on advanced implementation strategies in processors."

                topic_threshold_reached = True

            # Extract specific image prompt based on content
            image_prompt = extract_image_prompt(content)
            if not image_prompt:
                image_prompt = "Create an illustration related to processor architecture focusing on key technical aspects like pipeline or vector extensions."

            return content, image_prompt, topic_threshold_reached

        except Exception as e:
            print(f"Error during API call (Retry {retries + 1}/{max_retries}): {e}")
            time.sleep(delay_seconds * 2)
        retries += 1

    print("Max retries reached for generating new content. Exiting.")
    return None, None, topic_threshold_reached

# Generate image using DALL·E
def generate_image(prompt, save_path):
    global request_count
    if request_count >= daily_request_limit:
        print("Daily request limit reached. Exiting.")
        return None

    try:
        print(f"Generating image with prompt: '{prompt}'")
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )

        image_url = response['data'][0]['url']
        image_response = requests.get(image_url)

        img = Image.open(BytesIO(image_response.content))
        img.save(save_path)
        
        request_count += 1
        print(f"Image saved at: {save_path}")
        return save_path

    except Exception as e:
        print(f"Error generating image: {e}")
        return None

# Main process loop
def iterative_improvement():
    global request_count
    version = 1
    chapter_number = 2  # Start at chapter 2
    version_count = 0
    while request_count < daily_request_limit:
        if not is_connected():
            print("No internet connection. Retrying...")
            time.sleep(delay_seconds)
            continue

        print(f"Processing page {version} of Chapter {chapter_number}...")
        previous_content = get_last_5_versions_content()
        if not previous_content:
            print("Error: No content to process. Exiting.")
            break

        new_content, image_prompt, topic_threshold_reached = generate_new_content(previous_content, chapter_number, version_count)
        if not new_content:
            print("Error generating new content. Exiting.")
            break

        new_file = os.path.join(version_folder, f"version_{version}.txt")
        write_file_content(new_file, new_content)
        print(f"Saved page {version} to {new_file}.")

        # Save image
        image_path = os.path.join(version_folder, f"version_{version}_image.png")
        generate_image(image_prompt, image_path)

        # Push to GitHub
        push_to_github(f"version_{version}.txt", f"Add page {version} of processor architecture")
        push_to_github(f"version_{version}_image.png", f"Add illustration for page {version}")

        version += 1
        version_count += 1

        if topic_threshold_reached:
            chapter_number += 1
            version_count = 0  # Reset version count for new chapter

        print(f"Waiting {delay_seconds} seconds for the next iteration...")
        time.sleep(delay_seconds)

# Run the script
if __name__ == "__main__":
    print("Automation script running. Press Ctrl+C to exit.")
    iterative_improvement()
