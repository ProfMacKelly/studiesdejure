import os
import shutil
import yaml
import re
from bs4 import BeautifulSoup

GITBOOK_EXPORT_DIR = "gitbook-export"
MKDOCS_PROJECT_DIR = "mkdocs-site"
DOCS_DIR = os.path.join(MKDOCS_PROJECT_DIR, "docs")
MKDOCS_YML_PATH = os.path.join(MKDOCS_PROJECT_DIR, "mkdocs.yml")


def clean_mkdocs_dir():
    if os.path.exists(MKDOCS_PROJECT_DIR):
        shutil.rmtree(MKDOCS_PROJECT_DIR)
    os.makedirs(DOCS_DIR)


def copy_assets():
    assets_src = os.path.join(GITBOOK_EXPORT_DIR, "gitbook")
    assets_dst = os.path.join(DOCS_DIR, "assets")
    if os.path.exists(assets_src):
        shutil.copytree(assets_src, assets_dst)


def parse_summary_html():
    summary_path = os.path.join(GITBOOK_EXPORT_DIR, "SUMMARY.html")
    with open(summary_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")
    return soup.find_all("li")


def clean_markdown(content):
    # Convert GitBook-style admonitions to MkDocs-style
    lines = content.splitlines()
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith("> **"):
            match = re.match(r"> \*\*(\w+)\*\*", line)
            if match:
                kind = match.group(1).lower()
                buffer = []
                i += 1
                while i < len(lines) and lines[i].strip().startswith(">"):
                    buffer.append(lines[i].strip()[1:].strip())
                    i += 1
                content_block = "\n    ".join(buffer)
                new_lines.append(f"!!! {kind}\n    {content_block}")
                continue
        new_lines.append(lines[i])
        i += 1

    content = "\n".join(new_lines)

    # Strip common unwanted HTML wrappers or inline styles
    content = re.sub(r'<div[^>]*>', '', content)
    content = re.sub(r'</div>', '', content)
    content = re.sub(r'<span[^>]*>', '', content)
    content = re.sub(r'</span>', '', content)
    content = re.sub(r'style="[^"]*"', '', content)

    return content


def process_markdown_file(src_path, dest_path):
    with open(src_path, "r", encoding="utf-8") as f:
        content = f.read()

    cleaned = clean_markdown(content)

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(cleaned)


def process_nav_items(li_elements):
    nav = []
    for li in li_elements:
        a_tag = li.find("a")
        if not a_tag:
            continue

        name = a_tag.text.strip()
        href = a_tag["href"]
        markdown_path = href.split("#")[0]

        src_md_path = os.path.join(GITBOOK_EXPORT_DIR, markdown_path)
        dest_md_path = os.path.join(DOCS_DIR, markdown_path)

        if os.path.exists(src_md_path):
            process_markdown_file(src_md_path, dest_md_path)

        sub_ul = li.find("ul")
        if sub_ul:
            children = process_nav_items(sub_ul.find_all("li"))
            nav.append({name: children})
        else:
            nav.append({name: markdown_path.replace("\\", "/")})
    return nav


def create_mkdocs_yml(nav):
    config = {
        "site_name": "My GitBook Site",
        "nav": nav,
        "theme": {
            "name": "material"
        },
        "markdown_extensions": [
            "toc",
            "tables",
            "fenced_code",
            "codehilite"
        ],
        "extra": {
            "social": [],
        }
    }

    with open(MKDOCS_YML_PATH, "w", encoding="utf-8") as f:
        yaml.dump(config, f, sort_keys=False)


def convert_gitbook_to_mkdocs():
    clean_mkdocs_dir()
    copy_assets()
    li_elements = parse_summary_html()
    nav = process_nav_items(li_elements)
    create_mkdocs_yml(nav)
    print("✅ Conversion complete! MkDocs site is ready in:", MKDOCS_PROJECT_DIR)


if __name__ == "__main__":
    convert_gitbook_to_mkdocs()
