import React from 'react';
import { connect } from 'react-redux';
import { StateProvider } from '../../../stateProvider';
import { withRouter } from 'react-router';
import { lifeCycleHooks } from './lifecycle';
import { setStop, setPlay, setAudio, setVolume } from '../actions';
import styles from './styles.scss';

const initialState = {
    playBtn: 'fa-play',
    audioBtn: 'fa-volume-off'
};

const controls = props => {

    function play() {
        props.play
            ? props.setState({ playBtn: 'fa-play' })
            : props.setState({ playBtn: 'fa-pause' });

        props.dispatch(setPlay(!props.play));
    }

    function stop() {
        props.setState({ playBtn: 'fa-play' });
        props.dispatch(setStop());
    }

    function audio() {
        props.audio
            ? props.setState({ audioBtn: 'fa-volume-up' })
            : props.setState({ audioBtn: 'fa-volume-off' });

        props.dispatch(setAudio(!props.audio));
    }

    function volume(event) {
        const volume = event.target.value;
        props.setState({ volume }, () => {
            props.dispatch(setVolume(parseFloat(volume)));
        });
    }

    return (
        <div className='controls'>
            <progress
                id = "progressBar"
                className="progress"
                min='0'
                max='100'
                value={props.progress || 0}>
            </progress>
            <div className="buttons">
                <button
                    className='play'
                    title='play'
                    accessKey="P"
                    onClick={play}>
                    <i className={`fas ${props.state.playBtn}`}/>
                </button>
                <button
                    className='stop'
                    title='stop'
                    accessKey="X"
                    onClick={stop}>
                    <i className="fas fa-stop"/>
                </button>
                <input
                    type='range'
                    className="volume"
                    title="volume"
                    min='0'
                    max='1'
                    step='0.1'
                    onChange={volume}
                    value={props.volume}/>
                <button
                    id="audioBtn"
                    className='mute'
                    title='mute'
                    onClick={audio}>
                    <i className={`fas ${props.state.audioBtn}`}/>
                </button>
            </div>
        </div>
    )
};

function mapStateToProps (state) {
    return {
        play: state.player.play,
        duration: state.player.duration,
        currentTime: state.player.currentTime,
        audio: state.player.audio,
        progress: state.player.progress
    }
}

export default withRouter(connect(mapStateToProps)(StateProvider(controls, initialState, lifeCycleHooks)));