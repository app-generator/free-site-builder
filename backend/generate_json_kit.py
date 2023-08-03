import os
import json
import base64

def convert_html_to_base64(html_file):
    with open(html_file, 'rb') as file:
        html_data = file.read()
        base64_data = base64.b64encode(html_data).decode('utf-8')
    return base64_data

def process_templates(root_directory):
    for root, dirs, files in os.walk(root_directory):
        for dir in dirs:
            if dir == 'components':
                components_dir = os.path.join(root, dir)
                json_path = os.path.dirname(components_dir)

                file_keys = {}

                for component_root, component_dirs, component_files in os.walk(components_dir):
                    for file in component_files:
                        if file.endswith(".html"):
                            html_file_path = os.path.join(component_root, file)
                            relative_path = os.path.relpath(html_file_path, components_dir)

                            key, value = os.path.split(relative_path)

                            if key.capitalize() not in file_keys:
                                file_keys[key.capitalize()] = {}
                            
                            base64_data = convert_html_to_base64(html_file_path)
                            file_keys[key.capitalize()][value] = base64_data

                # Create the JSON file within the component folder
                parent_folder_name = os.path.basename(os.path.dirname(components_dir))

                # Define the order of keys
                ordered_keys = ["Grids", "Navigation", "Common"] + [k for k in file_keys.keys() if k not in ["Grids", "Navigation", "Common", "Footers"]] + ["Footers"]

                # Create a new dictionary with ordered keys
                ordered_file_keys = {k: file_keys[k] for k in ordered_keys if k in file_keys}

                json_data = {
                    "name": parent_folder_name,
                    "content": {
                        "layouts": {
                            "base.html": "BASE64"
                        },
                        "components": ordered_file_keys
                    }
                }
                with open(os.path.join(json_path, 'info.json'), 'w') as json_file:
                    json.dump(json_data, json_file, indent=4)


current_script_path = os.path.abspath(__file__)
base_path = os.path.dirname(current_script_path)
process_templates(os.path.join(base_path, 'apps/templates'))
