//nodejs commonjs 模块化方式  babel使用nodejs调用
module.exports = function({types:t}) {
    return {
      visitor: {
        ImportDeclaration(path){
            if (!t.isStringLiteral(path.node.source, { value: 'taro-ui' })) {
                return;
            }
            const stylePath = 'taro-ui/dist/style/components'
            const newImports = path.node.specifiers.map( item => {
                const name = item.local.name.slice(2).toLowerCase()
                return t.importDeclaration([], t.stringLiteral(`${stylePath}/${name}.scss`))
            });
            path.insertAfter(newImports);
            if(path.node.specifiers.some( item => item.local.name === 'AtButton' )){
                path.insertAfter(t.importDeclaration([],t.stringLiteral(`${stylePath}/loading.scss`)))
            }
        }
      },
    };
}