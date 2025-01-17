from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load Pretrained Model
tokenizer = AutoTokenizer.from_pretrained("gpt-4")
model = AutoModelForCausalLM.from_pretrained("gpt-4")

optimizer = torch.optim.Adam(model.parameters(), lr=1e-5)

# Fine-Tune Model (Example)
def fine_tune_model(dataset):
    model.train()
    for data in dataset:
        inputs = tokenizer(data["input"], return_tensors="pt")
        labels = tokenizer(data["output"], return_tensors="pt")["input_ids"]
        outputs = model(**inputs, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
    model.save_pretrained("./fine_tuned_model")

# Guardrails for Mental Health
def generate_response(prompt):
    response = model.generate(
        torch.tensor([tokenizer.encode(prompt)]),
        max_length=200,
        num_return_sequences=1,
    )
    return tokenizer.decode(response[0], skip_special_tokens=True)

# Test
if __name__ == "__main__":
    prompt = "I'm feeling very anxious about my exams."
    response = generate_response(prompt)
    print("AI Response:", response)
