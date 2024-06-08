class FileUtil {
   encodeBase64=(file)=>{
    return new Promise(()=>{
        const fileReader= new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(err)=>{
            reject(err)
        }
    })
   }
 }
 export default FileUtil;