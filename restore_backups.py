import os
import shutil

def restore_backups(directory):
    restored = 0
    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith(".md.bak"):
                orig_path = os.path.join(root, filename)
                new_path = orig_path[:-4]  # remove .bak
                shutil.copyfile(orig_path, new_path)
                os.remove(orig_path)
                restored += 1
                print(f"Restored: {new_path}")

    if restored:
        print(f"\n{restored} file(s) restored from backup.")
    else:
        print("No backups found to restore.")

if __name__ == "__main__":
    restore_backups("docs")
