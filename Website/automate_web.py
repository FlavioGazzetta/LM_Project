import os
import time
import subprocess
from openai import OpenAI

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Configuration
repo_path = r"C:\Users\User\Documents\LM_Project1\LM_Project\Website"
stage_prefix = "web_"
daily_request_limit = 10000
max_tokens = 2000
delay_seconds = 5
request_count = 0
max_retries = 5
iteration_delay = 60  # Wait 1 minute between stages

# Ensure the base repo folder exists
os.makedirs(repo_path, exist_ok=True)

# Check for internet connection
def is_connected():
    try:
        import socket
        socket.create_connection(("8.8.8.8", 53), timeout=3)
        return True
    except OSError:
        return False

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
        subprocess.run(["git", "add", os.path.join(file_name)], check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        subprocess.run(["git", "push"], check=True)
        print(f"Changes pushed to GitHub: {file_name}")
    except subprocess.CalledProcessError as e:
        print(f"Error pushing to GitHub: {e}")

# Generate content using OpenAI
def generate_content(prompt):
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
                    {"role": "system", "content": "You are a highly skilled web developer. Who wants to make sure he every single requirement asked to him is fulfilled"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=0.8,
            )
            request_count += 1
            content = response.choices[0].message.content.strip()
            if "<html>" in content or "function" in content or "body" in content:
                return content
            print("Generated response does not meet criteria. Retrying...")
        except Exception as e:
            print(f"Error during API call (Retry {retries + 1}/{max_retries}): {e}")
            time.sleep(delay_seconds * 2)
        retries += 1

    print("Max retries reached for generating content. Exiting.")
    return None

# Stage processing
def process_stage(stage_number):
    print(f"Processing stage {stage_number}...")
    stage_folder = os.path.join(repo_path, f"{stage_prefix}{stage_number}")
    os.makedirs(stage_folder, exist_ok=True)

    # Read the input file
    if stage_number == 1:
        input_file = os.path.join(repo_path, "old_input")
        input_copy_file = os.path.join(stage_folder, "input")
        initial_content = read_file_content(input_file)
        if initial_content:
            write_file_content(input_copy_file, initial_content)  # Ensure input file is created in web_1
    else:
        previous_stage_folder = os.path.join(repo_path, f"{stage_prefix}{stage_number - 1}")
        input_file = os.path.join(previous_stage_folder, "input")

    initial_content = read_file_content(input_file)
    if not initial_content:
        print(f"Error: No content found in {input_file}. Exiting.")
        return False

    # Generate HTML
    html_prompt = f"Based on the following description, create an HTML structure for a website. Only provide the full HTML code, make sure the first documents requirements are all met and if they are add new features on top:\n\n{initial_content}"
    html_content = generate_content(html_prompt)
    if not html_content:
        print("Error generating HTML content. Exiting.")
        return False

    html_file = os.path.join(stage_folder, f"web_html_{stage_number}.html")
    write_file_content(html_file, html_content)
    print(f"Generated HTML saved to {html_file}.")
    push_to_github(f"{stage_prefix}{stage_number}/web_html_{stage_number}.html", f"Add HTML for stage {stage_number}")

    # Generate JavaScript
    js_prompt = f"Based on the following HTML, create JavaScript to enhance its functionality. Only provide the full JavaScript code, make sure the first documents requirements are all met and if they are add new features on top:\n\n{html_content}"
    js_content = generate_content(js_prompt)
    if not js_content:
        print("Error generating JavaScript content. Exiting.")
        return False

    js_file = os.path.join(stage_folder, f"web_javascript_{stage_number}.js")
    write_file_content(js_file, js_content)
    print(f"Generated JavaScript saved to {js_file}.")
    push_to_github(f"{stage_prefix}{stage_number}/web_javascript_{stage_number}.js", f"Add JavaScript for stage {stage_number}")

    # Generate CSS
    css_prompt = f"Based on the following description, HTML, and JavaScript, create a CSS file to style the website. Only provide the full CSS code, make sure the first documents requirements are all met and if they are add new features on top:\n\nDescription:\n{initial_content}\n\nHTML:\n{html_content}\n\nJavaScript:\n{js_content}"
    css_content = generate_content(css_prompt)
    if not css_content:
        print("Error generating CSS content. Exiting.")
        return False

    css_file = os.path.join(stage_folder, f"web_css_{stage_number}.css")
    write_file_content(css_file, css_content)
    print(f"Generated CSS saved to {css_file}.")
    push_to_github(f"{stage_prefix}{stage_number}/web_css_{stage_number}.css", f"Add CSS for stage {stage_number}")

    # Generate improvements
    improvement_prompt = (
        f"Review the following website components and suggest improvements:\n\n"
        f"Description:\n{initial_content}\n\nHTML:\n{html_content}\n\nJavaScript:\n{js_content}\n\nCSS:\n{css_content}"
    )
    improvement_content = generate_content(improvement_prompt)
    if not improvement_content:
        print("Error generating improvement suggestions. Exiting.")
        return False

    improvement_file = os.path.join(stage_folder, f"web_improvements_{stage_number}.txt")
    write_file_content(improvement_file, improvement_content)
    print(f"Generated improvements saved to {improvement_file}.")
    push_to_github(f"{stage_prefix}{stage_number}/web_improvements_{stage_number}.txt", f"Add improvement suggestions for stage {stage_number}")

    # Prepare input for the next stage
    next_stage_folder = os.path.join(repo_path, f"{stage_prefix}{stage_number + 1}")
    os.makedirs(next_stage_folder, exist_ok=True)
    next_input_file = os.path.join(next_stage_folder, "input")
    combined_content = (
        f"Description:\n{initial_content}\n\nHTML:\n{html_content}\n\nJavaScript:\n{js_content}\n\nCSS:\n{css_content}\n\nImprovements:\n{improvement_content}"
    )
    write_file_content(next_input_file, combined_content)

    print(f"Stage {stage_number} completed. Moving to stage {stage_number + 1}...")
    return True

# Main iterative process
def iterative_website_generator():
    stage_number = 1
    while request_count < daily_request_limit:
        if not is_connected():
            print("No internet connection. Retrying...")
            time.sleep(delay_seconds)
            continue

        success = process_stage(stage_number)
        if not success:
            break

        stage_number += 1
        time.sleep(iteration_delay)

# Run the script
if __name__ == "__main__":
    print("Website generator running. Press Ctrl+C to exit.")
    iterative_website_generator()
