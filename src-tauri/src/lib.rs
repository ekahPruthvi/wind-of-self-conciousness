use std::fs;

#[tauri::command]
fn is_wind_empty() -> bool {
    let path = "/var/lib/cynager/wind/";
    match fs::read_dir(path) {
        Ok(mut entries) => entries.next().is_none(),
        Err(_) => true, 
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            is_wind_empty
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
