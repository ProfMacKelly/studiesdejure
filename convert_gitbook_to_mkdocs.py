import os
import re
import shutil
import html
import json
from pathlib import Path

# --- Helper Functions ---
def backup_file(file_path):
    backup_path = file_path + ".bak"
    shutil.copyfile(file_path, backup_path)
    return backup_path

def load_custom_regex_rules(filepath="rules.json"):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def apply_custom_regex_rules(content, rules):
    for rule in rules:
        content = re.sub(rule["pattern"], rule["replacement"], content, flags=re.MULTILINE | re.DOTALL)
    return content

def convert_admonitions(content):
    pattern = re.compile(r'{% hint style="(.*?)" %}\n?(.*?)\n?{% endhint %}', re.DOTALL)
    def replace(match):
        style = match.group(1).strip()
        body = match.group(2).strip()
        indented = "\n".join(["    " + line for line in body.splitlines()])
        return f"!!! {style}\n{indented}"
    return pattern.sub(replace, content)

def convert_embeds(content):
    pattern = re.compile(r'{% embed url="(.*?)" %}\n?(.*?)\n?{% endembed %}', re.DOTALL)
    def replace(match):
        url = match.group(1).strip()
        body = match.group(2).strip()
        return f"[▶️ Watch here]({url})\n\n{body}"
    return pattern.sub(replace, content)

def convert_html_entities(content):
    return html.unescape(content)

def remove_gitbook_anchors(content):
    return re.sub(r'\(?#user-content-fnref-\d+\)|#user-content-fn-\d+', '', content)

def convert_file(file_path, rules):
    with open(file_path, "r", encoding="utf-8") as f:
        original = f.read()

    modified = original
    modified = apply_custom_regex_rules(modified, rules)
    modified = convert_admonitions(modified)
    modified = convert_embeds(modified)
    modified = convert_html_entities(modified)
    modified = remove_gitbook_anchors(modified)

    if modified != original:
        backup_file(file_path)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(modified)
        return True
    return False

def convert_directory(directory="docs"):
    rules = load_custom_regex_rules()
    log_path = "conversion_log.txt"
    changed_files = []

    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith(".md"):
                path = os.path.join(root, filename)
                if convert_file(path, rules):
                    changed_files.append(path)

    with open(log_path, "w", encoding="utf-8") as log:
        for path in changed_files:
            log.write(f"Modified: {path}\n")

    print(f"Conversion complete. {len(changed_files)} file(s) modified. See conversion_log.txt for details.")

if __name__ == "__main__":
    convert_directory("docs")
