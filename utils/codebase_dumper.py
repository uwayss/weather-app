import os
import datetime
import platform
from pathlib import Path

def generate_codebase_dump():
    # Configuration
    exclude_dirs = {'node_modules', '.expo', '.git', '__pycache__', 'android'}

    # Output directory
    output_dir = Path('codebase')
    output_dir.mkdir(exist_ok=True)

    # Latest snapshot filename
    latest_snapshot_file = output_dir / "LatestSnapshot.txt"

    # Rename existing LatestSnapshot.txt if it exists
    if latest_snapshot_file.exists():
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        old_snapshot_file = output_dir / f"LatestSnapshot_{timestamp}.txt"
        latest_snapshot_file.rename(old_snapshot_file)

    # Project root
    project_root = Path(os.getcwd())

    with open(latest_snapshot_file, 'w', encoding='utf-8') as f_out:
        f_out.write(f'// AUTOGENERATED CODEBASE DUMP\n')
        f_out.write(f'// Project Root: {project_root}\n\n')

        for root, _, files in os.walk(project_root):
            for file in files:
                file_path = Path(root) / file

                # Skip excluded directories
                if any(part in exclude_dirs for part in file_path.parts):
                    continue

                try:
                    with open(file_path, 'r', encoding='utf-8') as f_in:
                        content = f_in.read()

                    f_out.write(f'\n// FILE: {file_path.relative_to(project_root)}\n') # Relative path
                    f_out.write(content + '\n')

                except UnicodeDecodeError:
                    f_out.write(f'\n// FILE: {file_path.relative_to(project_root)} (Skipped due to unreadable content)\n')
                except Exception as e:
                    f_out.write(f'\n// ERROR READING {file_path.relative_to(project_root)}: {str(e)}\n')

    print(f"Codebase dump created: {latest_snapshot_file.resolve()}")

if __name__ == "__main__":
    generate_codebase_dump()