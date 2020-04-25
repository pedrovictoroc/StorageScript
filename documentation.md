## File Reader

* createFile(name: string, path: string, callback: Function):void
    
    * Receives 3 parameters: Name of the file to be created, path to the directory to store all documents, use the path library to pass these parameters, a custom callback function to handle errors

* existsSync(path: string):boolean
    
    * Receives just 1 parameter, the full path for the file, use the path library to pass these          parameters

* readFile(path:string, callback:Function, option?:string):void

    * Receives 3 parameters: The full path for the file, use the path library to pass these              parameters, a custom callback function to handle data and errors, a string to define the data      type of the response 's' for string, 'j' for JSON

* writeFile(path:string, content:string, callback:Function, option?:string):void
    
    * Receives 3 parameters: The full path for the file, use the path library to pass these              parameters, a JSON with the content that will be added to the document ,a custom callback          function to handle data and errors, a string to define if the data will be added just if the       document already exists ('o') or the document will be created before insert the data ('c')
    * PROBLEM: OVERWRITE THE DATA
    * FEATURE: Modify string to JSON in content

* deleteFile(path:string, callback:Function, option?:string):void

    * Receives 3 parameters: The full path for the file, use the path library to pass these              parameters, a custom callback function to handle data and errors, a string to define if a file
      will be deleted ('f'), or if a directory will be deleted ('d') 