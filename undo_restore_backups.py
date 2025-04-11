import os
import shutil

def restore_from_post_restore_backup(source_dir="docs_post_restore_backup", target_dir="docs"):
    """Restores .md files from the post-restore backup."""
    if not os.path.exists(source_dir):
        print("Backup directory not found.")
        return

    for root, _, files in os.walk(source_dir):
        for filename in files:
            if filename.endswith(".md"):
                source_path = os.path.join(root, filename)
                target_path = os.path.join(target_dir, os.path.relpath(source_path, source_dir))
                os.makedirs(os.path.dirname(target_path), exist_ok=True) #creates subdirectories within the target dir
                shutil.copyfile(source_path, target_path)

    print("Restoration complete.")

if __name__ == "__main__":
    restore_from_post_restore_backup()