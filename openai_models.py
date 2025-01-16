from openai import OpenAI

# Initialize the OpenAI client with your API key
client = OpenAI(api_key="")

# List and print available models
try:
    models = client.models.list()
    for model in models.data:
        print(model.id)
except client.APIError as e:
    print(f"Failed to retrieve models: {e}")
