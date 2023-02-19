const saveFile = (content: string, fileType: string, saveAs: string) => {
    const blob = new Blob([content], {type: fileType});
    const a = document.createElement('a');
    a.download = saveAs;
    a.href = window.URL.createObjectURL(blob);
    a.click();
}

export default saveFile;