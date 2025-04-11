import os
import shutil


def restore_backups(directory="docs", delete_backups=False):
    restored_files = []
    log_path = "restoration_log.txt"

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md.bak"):
                backup_path = os.path.join(root, file)
                original_path = backup_path[:-4]  # strip .bak

                shutil.copyfile(backup_path, original_path)
                restored_files.append(original_path)

                if delete_backups:
                    os.remove(backup_path)

                print(f"Restored: {original_path}")

    with open(log_path, "w", encoding="utf-8") as log:
        for path in restored_files:
            log.write(f"Restored: {path}\n")

    print(f"\nRestoration complete. {len(restored_files)} file(s) restored. See restoration_log.txt for details.")


if __name__ == "__main__":
    # Set delete_backups to True if you want to remove .bak files after restoring
    restore_backups("docs", delete_backups=False)
