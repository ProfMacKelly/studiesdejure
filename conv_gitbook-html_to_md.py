import os
import re
import shutil
import html
import json
from pathlib import Path
from bs4 import BeautifulSoup
import markdownify

# --- Backup ---
def backup_file(file_path):
    backup_path = file_path + ".bak"
    shutil.copyfile(file_path, backup_path)
    return backup_path

# --- Load & Apply Custom Regex Rules ---
def load_custom_regex_rules(filepath="rules.json"):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def apply_custom_regex_rules(content, rules):
    for rule in rules:
        content = re.sub(rule["pattern"], rule["replacement"], content, flags=re.MULTILINE | re.DOTALL)
    return content

# --- Convert GitBook Admonitions & Embeds ---
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

# --- Decode HTML Entities and Cleanups ---
def convert_html_entities(content):
    return html.unescape(content)

def remove_gitbook_anchors(content):
    return re.sub(r'\(?#user-content-fnref-\d+\)|#user-content-fn-\d+', '', content)

# --- HTML to Markdown Conversion ---
def convert_iframe(tag):
    src = tag.get("src", "")
    title = tag.get("title", "Embedded content")
    return f"\n[!NOTE]\nMarkdown can't embed this iframe. Here's the source:\n[{title}]({src})\n"

def convert_video(tag):
    src = tag.get("src", "")
    if src:
        return f"\n[!NOTE]\nEmbedded video placeholder:\n[Video Link]({src})\n"
    return "\n[!NOTE]\n(Video element could not be processed)\n"

def convert_button(tag):
    text = tag.text.strip()
    return f"**[{text}]**"

def clean_img(tag):
    alt = tag.get("alt", "")
    src = tag.get("src", "")
    return f"![{alt}]({src})"

def handle_custom_html_elements(soup):
    for iframe in soup.find_all("iframe"):
        iframe.replace_with(convert_iframe(iframe))

    for video in soup.find_all("video"):
        video.replace_with(convert_video(video))

    for button in soup.find_all("button"):
        button.replace_with(convert_button(button))

    for img in soup.find_all("img"):
        img.replace_with(clean_img(img))

    for span in soup.find_all("span"):
        if span.has_attr("style"):
            span.unwrap()
        else:
            span.unwrap()

    return soup

def convert_inline_html(content):
    soup = BeautifulSoup(content, "html.parser")
    soup = handle_custom_html_elements(soup)

    for details in soup.find_all("details"):
        summary = details.find("summary")
        if summary:
            title = summary.text.strip()
            details_content = ''.join(str(c) for c in details.contents if c != summary)
            details_md = markdownify.markdownify(details_content, heading_style="atx")
            collapsible = f"???+ note \"{title}\"\n    " + "\n    ".join(details_md.splitlines())
            details.replace_with(collapsible)

    for div in soup.find_all("div", class_="admonition"):
        classes = div.get("class", [])
        style = [cls for cls in classes if cls != "admonition"]
        style = style[0] if style else "note"
        content = markdownify.markdownify(str(div), heading_style="atx")
        replacement = f"!!! {style}\n    " + "\n    ".join(content.splitlines())
        div.replace_with(replacement)

    return markdownify.markdownify(str(soup), heading_style="atx")

# --- File & Directory Processing ---
def convert_file(file_path, rules):
    with open(file_path, "r", encoding="utf-8") as f:
        original = f.read()

    modified = original
    modified = apply_custom_regex_rules(modified, rules)
    modified = convert_admonitions(modified)
    modified = convert_embeds(modified)
    modified = convert_html_entities(modified)
    modified = remove_gitbook_anchors(modified)

    if "<" in modified and ">" in modified:
        modified = convert_inline_html(modified)

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