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
            (match folder_empty.get() {
                None => view! { p { "Checking system..." } },
                
                Some(true) => view! {
                    div(class="welcome") {
                        "No saves found. Create new?"
                        button { "New Save" }
                    }
                },

                Some(false) => view! {
                    div(class="welcome") {
                        "Saves found! Load last?"
                        button { "Load Save" }
                    }
                },
            })
        }
    }
}