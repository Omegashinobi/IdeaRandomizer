const fs = require('fs');

class Randomizer {
    allowence;
    constructor(config) {
        this.config = config
    }

    read(res) {
        fs.readFile('currentData.json', (err, data) => {
            if (err) throw err;
            let outputData = JSON.parse(data);
            res.json(outputData);
        });
    }

    run(res) {
        let output = {};

        Object.keys(this.config).forEach((key)=>{
            output[key] = [];
            let allowance = 1;

            if(this.config[key].allowance > 1){
                allowance = Math.floor((Math.random() * this.config[key].allowance)+1);
            }

            for(let i = 0; i < allowance; i++) {
                let contentArray = [];

                Object.keys(this.config[key].content).forEach(e=>{
                    for(let i = 0; i<this.config[key].content[e].probability; i++) {
                        contentArray.push(e);
                    }
                });

                let content = contentArray[Math.floor(Math.random() * contentArray.length)];

                if(output[key].indexOf(content) === -1) {
                    output[key].push(content);
                }
            }
        });

        let data = JSON.stringify(output);
        fs.writeFileSync('currentData.json', data);

        res.end('Generated:' + data);
    }
}

exports.Randomizer = Randomizer;
