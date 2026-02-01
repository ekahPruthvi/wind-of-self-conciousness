use sycamore::futures::spawn_local_scoped;
use sycamore::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = ["window", "__TAURI__", "core"])]
    async fn invoke(cmd: &str, args: JsValue) -> JsValue;
}

#[component]
pub fn App() -> View {
    let folder_empty = create_signal(None::<bool>);
    let is_naming = create_signal(false);
    let save_name = create_signal(String::new());

    spawn_local_scoped(async move {
        let res = invoke("is_wind_empty", JsValue::NULL).await;
        folder_empty.set(res.as_bool());
    });


    view! {
        main(class="container") {
            div(class="welcome"){
                (match folder_empty.get() {
                None => view! { p { "Checking system..." } },
                
                Some(true) => view! {
                    div(class="screen") {
                        (if !is_naming.get() {
                            view! {
                                p { "No saves found," }
                                p { "Create new?" }
                            }
                        } else {
                            view! {
                                p { "Enter save name:" }
                                input(
                                    class="save-input",
                                    bind:value=save_name,
                                    placeholder="save name"
                                )
                            }
                        })
                    }
                    div(class="buttons"){
                        button(class="nav-l") { "<" }

                        (if !is_naming.get() {
                            let is_naming = is_naming.clone();
                            view! {
                                button(class="save-btn usable_btn", on:click=move |_| is_naming.set(true)) { 
                                    "New Save" 
                                }
                            }
                        } else {
                            view! {
                                button(class="save-btn usable_btn", on:click=move |_| {
                                    spawn_local_scoped(async move {
                                        let name_string = format!("{}.sav", save_name.get_clone());
                                        
                                        let args = js_sys::Object::new();
                                        js_sys::Reflect::set(&args, &"name".into(), &name_string.into()).unwrap();

                                        invoke("create_save_file", args.into()).await;
                                        is_naming.set(false);
                                    });
                                }) { 
                                    "Create Save" 
                                }
                            }
                        })
                        
                        button(class="nav-r") { ">" }
                    }    
                },

                Some(false) => view! {
                    div(class="screen"){
                        "saves found"
                    }
                    div(class="buttons"){
                        button(class="nav-l usable_btn") { "<" }

                        button(class="save-btn usable_btn", on:click=|_| { /* save logic */ }) { 
                            "Login" 
                        }
                        
                        button(class="nav-r usable_btn") { ">" }
                    } 
                },
            })
            }
            
        }
    }
}