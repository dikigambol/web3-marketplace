export const fileToDataUri = (file: Blob): Promise<string | null> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        let res = e.target?.result as string | null;
        resolve(res);
    };
    reader.readAsDataURL(file);
});