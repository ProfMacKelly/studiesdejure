import os
import shutil

def undo_restore_backups(directory="docs"):
    """Undoes the restore_backups.py script by copying .md.bak to .md."""
    undone_files = []
    log_path = "undo_restoration_log.txt"

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                original_path = os.path.join(root, file)
                backup_path = original_path + ".bak"

                if os.path.exists(backup_path):  # Check if the .bak file exists
                    shutil.copyfile(backup_path, original_path)
                    undone_files.append(original_path)
                    print(f"Undone: {original_path}")
                else:
                    print(f"Backup not found for: {original_path}")

    with open(log_path, "w", encoding="utf-8") as log:
        for path in undone_files:
            log.write(f"Undone: {path}\n")

    print(f"\nUndo restoration complete. {len(undone_files)} file(s) undone. See undo_restoration_log.txt for details.")

if __name__ == "__main__":
    undo_restore_backups("docs")