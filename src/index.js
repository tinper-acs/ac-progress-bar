import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'bee-progress-bar';
import "./index.scss"

const propsTypes = {
    tenantId:PropTypes.string,
    startFlag:PropTypes.boolean,
    check:PropTypes.func.isRequired,
    loadingOverFunc:PropTypes.func,
    loadingDesc:PropTypes.string,
}

const defaultProps ={
    tenantId:'default',
    startFlag:false,
    loadingDesc:null,
}

class  ProgressBarDiwork extends Component {
    constructor(props){
        super(props);
        this.state={
            processValue:0,//默认开始的是0
        }
    }

    componentDidMount = () =>{
        const {tenantId,startFlag} = this.props;
        startFlag && this.goToLoading()
    }

    componentWillReceiveProps = (nextProps) =>{
        const {tenantId,startFlag} = nextProps;
        startFlag && this.goToLoading(tenantId)
    }

    goToLoading = (tenantId) =>{
        const tenantIdVal = tenantId || this.props.tenantId;
        if(tenantIdVal == '' || tenantIdVal == undefined) return false;
        const {check} = this.props;
        let self = this;
        let perValue  = (Math.floor(Math.random()*10+1));//输出1～10之间的随机整数
        if(self.state.processValue < 90 ){
            self.setState({processValue:self.state.processValue+perValue})
        }
        check && check(tenantIdVal,this.setLoadingValue,this.goToLoadingAfter);
    }

    setLoadingValue = (tenantIdVal) =>{
        let perValue  = (Math.floor(Math.random()*10+1));//输出1～10之间的随机整数
        if(this.state.processValue < 90 ){
            this.setState({processValue:this.state.processValue+perValue})
        }
    }
    goToLoadingAfter = () =>{
        if(this.props.loadingOverFunc){
            ProgressBar.done();
            this.setState({processValue:100})//直接结束
            this.props.loadingOverFunc();
            return false;
        }
        const {tenantId}  = this.props;
        ProgressBar.done();
        this.setState({processValue:100})//直接结束
        // setTimeout(() => {
        //   window.location.href  ="/?tenantId=" + tenantId + "&switch=true";
        // }, 600);
    }

    render(){
        const {loadingDesc, className, children, ...restProps}  = this.props
        let now = this.state.processValue;
        let classes;
        if(className){
            classes = `progress_loading ${className}`
        }else{
            classes = `progress_loading`;
        }
        return(
            <div className={"progress_wrap"}>
                <ProgressBar  className={classes} {...restProps}  now = {now} label={`${now}%`} ></ProgressBar>
                {/* <Icon className={progress_load_icon} type="loading" /> */}
                { loadingDesc && <span className={"loading_desc"}>{loadingDesc}</span>}
                {children}
            </div>
        )
    }

}
ProgressBarDiwork.propsTypes = propsTypes;
ProgressBarDiwork.defaultProps = defaultProps;
export default ProgressBarDiwork;
