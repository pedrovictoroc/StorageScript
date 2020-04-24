import * as fs from 'fs';

import * as pathResolve from 'path';

class fileReader {
    constructor(){}
    
    existsSync(path: string):boolean{
        if (fs.existsSync(path))
            return true;
        else
            return false;
    }
    
    createFile(name:string, path:string, callback:Function):void{
        if(this.existsSync( pathResolve.resolve(path, name) ) ){
            callback("There is already a file with this name in the specified destination!");
            return;
        }

        fs.writeFile(pathResolve.resolve(path, name), "", callback);
    }

    readFile(path:string, callback:Function):void{
        if(!this.existsSync(path) ){
            callback("The specified file cannot be found!", undefined);
            return;
        }

        fs.readFile(path, callback);
        
    }
    
    async readJSONFile(path: string):Promise<any>{
        return await fs.readFileSync(path);
    }




    /*
    readJSONFileCall(path: string, callback: function):void{
        fs.readFile(path, callback)
    }*/
}

const a = new fileReader();

//console.log(a.existsSync(pathResolve.resolve(__dirname, "file.json")));


a.readFile(pathResolve.resolve(__dirname, "arquivo_teste.json"), (e, data) => {
    if(e){
        console.log("ERRO:", e);
        return;
    } 
    console.log("DATA:", JSON.parse(data.toString('utf8')));
})
