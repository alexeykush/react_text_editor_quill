export const fontLabelFormatter = selectedFont => (font, i) => ({
    label: font
        .replace("-", " ")
        .split(" ")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" "),
    value: font, selected: i === selectedFont
});

export const filesToArray = fileList => {
    const arr = [];
    if(fileList.forEach !== void 0) {
        fileList.forEach(file => arr.push(file));
    } else {
        for(let item of fileList) {
            arr.push(item);
        }
    }
    return arr;
};

export const isImage = (file, key) => {
    if(file instanceof File) key = "type";
    return file[key].startsWith("image");
};

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const processFiles = files => Promise.all(files.map(toBase64));

export const isLastInArr = (index, arr) => index === arr.length - 1;