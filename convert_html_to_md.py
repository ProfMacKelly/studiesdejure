import os
import shutil
from bs4 import BeautifulSoup
import markdownify

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

def handle_custom_elements(soup):
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
            span.unwrap()  # Could add emphasis here if desired
        else:
            span.unwrap()

    return soup

def convert_html_to_md(html):
    soup = BeautifulSoup(html, 'html.parser')

    # Handle custom elements first
    soup = handle_custom_elements(soup)

    # Convert <details><summary> to collapsible
    for details in soup.find_all("details"):
        summary = details.find("summary")
        if summary:
            title = summary.text.strip()
            details_content = ''.join(str(c) for c in details.contents if c != summary)
            details_md = markdownify.markdownify(details_content, heading_style="atx")
            collapsible = f"???+ note \"{title}\"\n    " + "\n    ".join(details_md.splitlines())
            details.replace_with(collapsible)

    # Convert <div class="admonition info"> to "!!! info"
    for div in soup.find_all("div", class_="admonition"):
        title = div.get("class")[1] if len(div["class"]) > 1 else "note"
        content = markdownify.markdownify(str(div), heading_style="atx")
        replacement = f"!!! {title}\n    " + "\n    ".join(content.splitlines())
        div.replace_with(replacement)

    return markdownify.markdownify(str(soup), heading_style="atx")

def process_single_md_file(file_path):
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return

    backup_path = file_path + ".bak"
    shutil.copyfile(file_path, backup_path)
    print(f"✅ Backup created at: {backup_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "<" in content and ">" in content:  # crude HTML detection
        converted = convert_html_to_md(content)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(converted)
        print(f"✅ Converted HTML in: {file_path}")
    else:
        print(f"ℹ️ No HTML found in: {file_path}")


