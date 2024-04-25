'use client';

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    // Image url
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();
    
    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        // 하나의 파일만 받는다
        // 여러파일을 받으려면 input에 multiple 옵션을 줘야함
        const file = event.target.files[0];

        if (!file) {
            // 이미지가 선택되지 않았을때 reset
            setPickedImage(null);
            return;
        }

        // 자바스크립트 생성자
        const fileReader = new FileReader();

        fileReader.onload = () => {
            // 상태에 저장
            setPickedImage(fileReader.result);
        }
    }
    
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill />}
            </div>
            <div className={classes.controls}>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                ></input>
            </div>
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick an Image
            </button>
        </div>
    );
}
