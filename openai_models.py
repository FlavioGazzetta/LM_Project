from openai import OpenAI

# Initialize the OpenAI client with your API key
client = OpenAI(api_key="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")

# List and print available models
try:
    models = client.models.list()
    for model in models.data:
        print(model.id)
except client.APIError as e:
    print(f"Failed to retrieve models: {e}")
