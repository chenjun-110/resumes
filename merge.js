// 配置区
let vconsole = false

// 代码区
let fs = require('fs');
// var uglify = require("uglify-js");
let total = ''
let combinePath = ''
let combineName = ''
let d = new Date()
let release = fs.readdirSync('./bin-release', 'utf8');
release.forEach(v => {
    let version = fs.readdirSync(`./bin-release/${v}`, 'utf8')
    combineName = `js/acombine_${d.getFullYear()}${(d.getMonth() + 1)}${d.getDate()}_${d.getHours()}${d.getMinutes()}${d.getSeconds()}.js`
    combinePath = `./bin-release/${v}/${version}/${combineName}`
    let manifest = JSON.parse(fs.readFileSync(`./bin-release/${v}/${version}/manifest.json`, 'utf8'))
    if (manifest.initial.length === 1) {
        console.log('重复操作')
        return
    }
    //  合并数据
    let mainpath = ''
    Object.values(manifest).forEach(arr => {
        arr.forEach((js, i) => {
            if (js.indexOf('default.thm') > -1) {
            //    let aaa =  uglify.minify(`./bin-release/${v}/${version}/${js}`)
            //    console.log('压缩', aaa)
            } else if (js.indexOf('main') > -1) {
                mainpath = js
            }
            if (vconsole) {
                let str = fs.readFileSync(`./bin-release/${v}/${version}/${js}`, 'utf8')
                total += '' + str
            } else if (js.indexOf('vconsole') === -1) {
                let str = fs.readFileSync(`./bin-release/${v}/${version}/${js}`, 'utf8')
                total += '' + str
            }
        })
    })
    //  删除 旧conbine 旧main
    fs.readdirSync(`./bin-release/${v}/${version}/js`, 'utf8').forEach(path => {
        if (path.indexOf('acombine') > -1) {
            fs.unlinkSync(`./bin-release/${v}/${version}/js/${path}`)
            console.log(`已删除 ${path}`)
        }
        if (path.indexOf('main') > -1 && `js/${path}` !== mainpath) {
            fs.unlinkSync(`./bin-release/${v}/${version}/js/${path}`)
            console.log(`已删除 ${path}`)
        }
    })
    //  修改manifest
    fs.rename(`./bin-release/${v}/${version}/manifest.json`, `./bin-release/${v}/${version}/oldmanifest.json`,_=>{
        fs.writeFile(`./bin-release/${v}/${version}/manifest.json`, JSON.stringify({initial:[combineName],game:[]}, null, 4), (err) => {
            if (err) throw err
        })
    })
    
    fs.writeFile(combinePath, total, (err) => {
        if (err) throw err;
        console.log('文件已合并！', combineName);
    });
})




