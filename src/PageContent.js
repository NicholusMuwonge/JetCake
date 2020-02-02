import React, { Fragment, useState} from 'react';
import axios from 'axios';
import icon from './images/icon-detailed-records.svg';
import graphs from './images/icon-detailed-records.svg';
import bars from './images/icon-fully-customizable.svg';
import worker from './images/illustration-working.svg';


const Content = () =>{
    const [data, postfunction] = useState({url:''})
    const [initialButtonState, ButtonUpdater] = useState(false)
    const [submitButton, submitterFunction] = useState(false)
    
    const inputRef = React.createRef();
    const postUrl = 'https://rel.ink/api/links/';
    const concatUrl = 'https://rel.ink/'
    const makePost= () =>(
        axios.post(postUrl,{url: inputRef.current.value}).then(
        result => {
            if(!result.data){
                result = {
                    'error': 'not found'
                }
            }
            postfunction(result.data)
            
        }
    ).catch(
        err => (err)
    ))


    const handleSubmit=()=>{
        makePost();
        setTimeout(()=> {
            submitterFunction({...submitButton, submitButton:true})
        }, 1500)
        
    }
    
    const handleButtonClick = () => {
        const copied = {...initialButtonState, initialButtonState:true}
        ButtonUpdater(copied)
    }

    const copyToClipBoard = () => {
        
        const Copy = document.getElementById('finishedurl').innerHTML;
        const newField = document.getElementsByTagName('body')[0];
        const inputField = document.createElement('INPUT');
        newField.appendChild(inputField) 
        inputField.setAttribute('value', Copy);
        inputField.select();
        document.execCommand('copy');
        newField.removeChild(inputField);
        handleButtonClick()
    }


    const handleChange = (e) => {
        e.persist();
        postfunction({...data, url:inputRef.current.value})
        }
    
    const DisplayTiles = (props) => (
        <div className="card col-md-3 mr-auto" id="cardstyle" style={{width:'18rem'}}>
                    <div className="card-body">
                        <br/>
                        <img className="img-fluid" src={props.image} />
                        <br/><br/>
                        <h5 className="card-title">{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"></h6>
                        <br/>
                        <p 
                        className="card-text align-right text-muted muted">
                            {props.text}</p>
                    </div>
            </div>
    )

    return (
    <Fragment>
    <div className="container">
        <div className="row" id='intro'>
        <div className="col-md-6 col-sm-pull-6">
            <h3 className="display-4" id='heading'>More than Just <br/> shorter links </h3>
            <br/>
            <div className="lead mb-0" id="description">build your brand's recognition and get detailed
            insights on how your links are performing.
            </div>
        </div>
        <div className="col-md-6 col-sm-push-6" >
            <img 
            className='img-fluid' 
            src={worker} alt=""/></div>
        </div>
        <br/>
        <div className="started ">
        <button className="btn btn-info " id="start" >Get Started</button>
        </div>
        <br/>
        <br/>
        <div className='container' id='searchbox'>
                <input 
                className="url" type="text" 
                placeholder="https://example.com"
                ref={inputRef}
                name='url'
                value={data.url}
                onChange={handleChange}
                pattern="https?://.+" 
                required
                />
                <button className=" 
                btn btn-info log" 
                onClick={handleSubmit}
                id='shorten'>Shorten It !</button>
        </div>
        
        <div className='container list-inline' style={{visibility:(submitButton==false)?'hidden':'visible'}}id='searchbox1'>
                <span className="list-inline-item original" 
                style={{fontWeight:'bolder', display:'inline', paddingLeft:'2.3rem', justifyContent:'center'}}>{data['url']}</span>
                <span className="list-inline-item" id='finishedurl' 
                style={{color:'rgb(63, 204, 204)', fontWeight:'900px'}}>{concatUrl + data['hashid']}</span>
                <button 
                className="copy float-right list-inline-item btn btn-info log" 
                id='shorten'
                style={{
                    backgroundColor:(initialButtonState)?'black':'',
                    color:(initialButtonState)?'white':''
                }}
                onClick={copyToClipBoard}
                >{!initialButtonState?'Copy':'Copied'}</button>
        </div>
        
        <br/><br/><br/><br/>
        <div className="container justify-content-center advanced">
        <h3 className="text-center stats">Advanced Statistics</h3>
        <br/>
        <div className="lead text-center" id="description2">
            Track how your links are performing across the web<br/>
                our advanced Statistics dashbord.
            </div>
        </div>
        <div className="container row" id='tiles'>
            < DisplayTiles 
            image={icon}
            title='Brand Recognition'
            text='Boost your brand recognitionwith each click. Generic links dont mean a thing.Branded links help instill confidence in the content'
            />
            <DisplayTiles
            image={graphs}
            title={'Detailed Records'}
            text='Boost your brand recognitionwith each click. Generic links dont mean a thing.
            Branded links help instill confidence in the content' />

            <DisplayTiles 
            image={bars}
            title='Fully Customisable'
            text='Boost your brand recognitionwith each click. Generic links dont mean a thing.
            Branded links help instill confidence in the content' />
        </div>
        <br/>
        <br/>
    </div>
    <div className="container-fluid info">
    </div>
    </Fragment>
    )
};

export default Content;
