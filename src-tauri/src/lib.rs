use std::fs;
use dirs;

#[tauri::command]
fn create_save_file(name: String) -> Result<(), String> {
    if let Some(mut path) = dirs::data_dir() {
        path.push("wind");
        fs::create_dir_all(&path).map_err(|e| e.to_string())?;
        path.push(name);
        fs::write(&path, "").map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("Could not find local data directory".into())
    }
}

#[tauri::command]
fn delete_save_file(name: String) -> Result<(), String> {
    if let Some(mut path) = dirs::data_dir() {
        path.push("wind");
        path.push(name);

        if path.exists() {
            fs::remove_file(&path).map_err(|e| format!("Failed to delete file: {}", e))?;
            Ok(())
        } else {
            Err("File not found".into())
        }
    } else {
        Err("Could not find local data directory".into())
    }
}

#[tauri::command]
fn is_wind_empty() -> bool {
    if let Some(mut path) = dirs::data_dir() {
        path.push("wind");

        match fs::read_dir(&path) {
            Ok(mut entries) => entries.next().is_none(),
            Err(_) => {
                let _ = fs::create_dir_all(&path);
                true
            }
        }
    } else {
        true 
    }
}

#[tauri::command]
fn get_save_files() -> Result<Vec<String>, String> {
    if let Some(mut path) = dirs::data_dir() {
        path.push("wind");

        if !path.exists() {
            return Ok(vec![]);
        }

        let entries = fs::read_dir(path)
            .map_err(|e| format!("Failed to read directory: {}", e))?;

        let file_names = entries
            .filter_map(|entry| {
                let entry = entry.ok()?;
                let path = entry.path();
                if path.is_file() {
                    path.file_name()?.to_str().map(|s| s.to_string())
                } else {
                    None
                }
            })
            .collect();

        Ok(file_names)
    } else {
        Err("Could not find data directory".into())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            is_wind_empty,
            create_save_file,
            get_save_files,
            delete_save_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
