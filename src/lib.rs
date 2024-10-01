mod utils;

use image::{RgbaImage};
use image::imageops;
 
use wasm_bindgen::prelude::*;

// //use 'wee_alloc' when feature is enabled
// #[cfg(feature = 'wee_alloc')]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = 
//     wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn shrink_by_half(og_img: Vec<u8>, width: u32, height: u32) ->
    Vec<u8> {
        let image: RgbaImage = 
            image::ImageBuffer::from_vec(width, height, og_img).unwrap();
        let output_img =
             imageops::resize(&image, width/2, height/2, imageops::FilterType::Nearest);
        output_img.into_vec()
    }