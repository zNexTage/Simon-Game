type Props = {
    audioUrl: any;
    play:boolean;
    onAudioCompleted?:()=>void;
}

function AudioEffects({ audioUrl, play, onAudioCompleted }: Props) {
    const audio = new Audio(audioUrl);

    if(play && audio.paused){
        audio.play();
    }

    audio.addEventListener("ended", ()=>{
        onAudioCompleted && onAudioCompleted();
    });
}

export default AudioEffects;