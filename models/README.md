
To add a model, you would need to do following,

1. Create a model with yo-generator

    $ yo archiejs:model modelName

2. Add the model to package.json file.

    "plugins": {
        "provides": {
            "db": {
                "ModelName": "modelName"
            }
        }
    }

3. Add your custom fields to /model/modelName.js


