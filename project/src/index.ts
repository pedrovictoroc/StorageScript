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

    readFile(path:string, callback:Function, option?:string):void{

        if(!this.existsSync(path) ){
            callback("The specified file could not be found!", undefined);
            return;
        }
        if(!option || option == 'b')
            fs.readFile(path, callback);
        else if(option == 's'){
            try{
                fs.readFile(path, (error, data)=>{
                    try{
                        callback(error, data.toString('utf8'));    
                    }
                    catch(e_inside){
                        callback(e_inside, undefined)
                    }
                    
                }); 
            }
            catch(e){
                callback("Error: "+e.toString(), undefined);
            }
        }
        else if(option == 'j'){
            fs.readFile(path, (error, data)=>{
                try{
                    callback(error, JSON.parse(data.toString('utf8')));    
                }
                catch(e_inside){
                    callback(e_inside, undefined)
                }
            }); 
        }
        else
            callback(`Unknown option "${option}", please, choose either 'b'[default], 'j' or 's'`, undefined);
    }

    writeFile(path:string, content:string, callback:Function, option?:string):void{
        const exists: boolean = this.existsSync(path);
        if( option == 'o' && !exists){
            callback("The specified file could not be found!");
        }
        else if( ((option == 'o' || !option || option == 'c') && exists) || option == 'c' && !exists){

            fs.writeFile(path, content, (e_inside)=>{
                callback(e_inside);
            });
        }
        else{
            callback("The specified file could not be found!");
        }
    }

    
}

const a = new fileReader();

//console.log(a.existsSync(pathResolve.resolve(__dirname, "file.json")));

/*
console.log(pathResolve.resolve(__dirname, "arquivo_teste.json"));

a.readFile(pathResolve.resolve(__dirname, "arquivo_teste.json"), (e, data) => {
    if(e){
        console.log("ERRO:", e);
        return;
    } 
    console.log("DATA:", data);
});// or 's' for string or 'j' for javascript object
*/

const file_contents = JSON.stringify({
    teste: 23,
    test2: 46
}, null, 4);

console.log(file_contents)

a.writeFile(pathResolve.resolve(__dirname, "arquivo_tese2.json"), file_contents, (e)=>{
    if(e){
        console.log("ERRO:", e);
    }
    else{
        console.log("Sucess!")
    }
}, 'o'); // 'c' : creates the archive if it doenst exists, 'o' only overwrite already existing files

