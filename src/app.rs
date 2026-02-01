use serde::{Deserialize, Serialize};
use sycamore::futures::spawn_local_scoped;
use sycamore::prelude::*;
use sycamore::web::events::SubmitEvent;
use wasm_bindgen::prelude::*;
use std::fs;
use std::io::{Read, Write};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = ["window", "__TAURI__", "core"])]
    async fn invoke(cmd: &str, args: JsValue) -> JsValue;
}

#[component]
pub fn App() -> View {
    let folder_empty = create_signal(None::<bool>);

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
                    div(class="screen"){
                        p {"No saves found,"}
                        p {"Create new?"}                    
                    }
                    div(class="buttons"){
                        button(class="nav-l") { "<" }

                        button(class="save-btn usable_btn", on:click=|_| { /* save logic */ }) { 
                            "New Save" 
                        }

                        button(class="save-btn hiddden", on:click=|_|{ }) {
                            "Create Save"
                        }
                        
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