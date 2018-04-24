
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';



const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 应用组件名称","code":"/**\n *\n * @title 应用组件名称\n * @description 应用组件描述, 自定义check方法\n *\n */\n\nimport React, { Component } from 'react';\nimport ProgressBarDiwork from '../../src/index';\n class Demo1 extends Component {\n    \n    constructor(props){\n        super(props);\n        this.state = {\n            now:false,\n        }\n        this.timer = 0;\n    }\n\n    setStartFunc = () =>{\n        this.setState({\n            now:true\n        })\n    }\n    \n    loadingOverFunc=() =>{\n        window.location.href=\"http://www.baidu.com\"\n    }\n\n    checkFunc = (tenantId,loadingFunc,successFunc) =>{\n        console.log(tenantId);\n        ++this.timer;\n        let self = this;\n        if(this.timer<10){\n            setTimeout(function () {\n                loadingFunc(tenantId);\n                self.checkFunc(tenantId,loadingFunc,successFunc) \n            }, 1000)\n        }else{\n            successFunc();\n        }\n        \n    }\n\n\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <div className=\"start_button\" onClick={this.setStartFunc}>开始按钮</div>\n                <ProgressBarDiwork loadingOverFunc={this.loadingOverFunc} tenantId={'1'} startFlag={this.state.now} loadingDesc={'正在配置团队信息…'}/>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 应用组件描述, 自定义check方法"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
