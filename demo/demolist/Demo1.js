/**
 *
 * @title 应用组件名称
 * @description 应用组件描述, 自定义check方法
 *
 */

import React, { Component } from 'react';
import ProgressBarDiwork from '../../src/index';
 class Demo1 extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            now:false,
        }
        this.timer = 0;
    }

    setStartFunc = () =>{
        this.setState({
            now:true
        })
    }
    
    loadingOverFunc=() =>{
        window.location.href="http://www.baidu.com"
    }

    checkFunc = (tenantId,loadingFunc,successFunc) =>{
        console.log(tenantId);
        ++this.timer;
        let self = this;
        if(this.timer<10){
            setTimeout(function () {
                loadingFunc(tenantId);
                self.checkFunc(tenantId,loadingFunc,successFunc) 
            }, 1000)
        }else{
            successFunc();
        }
        
    }


    render () {
        return (
            <div className="demoPadding">
                <div className="start_button" onClick={this.setStartFunc}>开始按钮</div>
                <ProgressBarDiwork className={'32'} check={this.checkFunc} loadingOverFunc={this.loadingOverFunc} tenantId={'1'} startFlag={this.state.now} loadingDesc={'正在配置团队信息…'}/>
            </div>
        )
    }
}

export default Demo1;
