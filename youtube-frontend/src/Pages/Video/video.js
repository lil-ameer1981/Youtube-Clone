import React, { useState, useEffect } from 'react'
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import demoVideos from '../../data/demoVideos';
const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    const fetchVedioById = async () => {
        const selectedVideo = demoVideos.find((video) => video.id === id) || demoVideos[0];
        setData(selectedVideo);
    }

    const getCommentByVideoId = async () => {
        setComments([
            {
                id: "comment-1",
                channelName: "ghost_81",
                profilePic: "https://i.pravatar.cc/80?img=12",
                message: "Wow What a wonderful videooo",
                posted: "2 hours ago"
            },
            {
                id: "comment-2",
                channelName: "GamerGirl",
                profilePic: "https://i.pravatar.cc/80?img=32",
                message: "This is really fantastic",
                posted: "1 day ago"
            }
        ]);
    }
    useEffect(() => {
        fetchVedioById();
        getCommentByVideoId();
    }, [])

    const handleComment = async()=>{
        if (!message.trim()) {
            toast.error("Write a comment first");
            return;
        }

        const newComment = {
            id: Date.now(),
            channelName: "You",
            profilePic: "https://i.pravatar.cc/80?img=5",
            message,
            posted: "Just now"
        };
        setComments([newComment,...comments]);
        setMessage("")
    }
    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && <div className="video_youtube_preview">
                        <img src={data.thumbnail} className='video_youtube_video' alt={data.title} />
                        <div className="video_preview_overlay">Preview UI</div>
                    </div>}

                </div>

                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>

                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.profilePic} alt={data?.channelName} />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName"> {data?.channelName} </div>
                                <div className="youtubePostProfileSubs">{data?.views}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>

                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">124K</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <ThumbDownAltOutlinedIcon />
                        </div>


                    </div>

                    <div className="youtube_video_About">
                        <div>{data?.views} . {data?.posted}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>

                    <div className="youtubeSelfComment">
                        <img className='video_youtubeSelfCommentProfile' src="https://i.pravatar.cc/80?img=5" alt="Your profile" />
                        <div className="addAComment">
                            <input className="addAcommentInput" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Add a comment..." />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment" onClick={()=>setMessage("")}>Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>

                    </div>

                    <div className="youtubeOthersComments">

                        {
                            comments.map((item, index) => {
                                return (
                                    <div className="youtubeSelfComment" key={item.id}>
                                        <img className='video_youtubeSelfCommentProfile' src={item?.profilePic} alt={item?.channelName} />
                                        <div className="others_commentSection">
                                            <div className="others_commentSectionHeader">
                                                <div className="channelName_comment">{item.channelName}</div>
                                                <div className="commentTimingOthers">{item.posted}</div>
                                            </div>
                                            <div className="otherCommentSectionComment">{item.message}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }




                    </div>
                </div>
            </div>

            <div className="videoSuggestions">

                {demoVideos.filter((video) => video.id !== id).slice(0, 6).map((video) => (
                    <Link to={`/watch/${video.id}`} className="videoSuggestionsBlock" key={video.id}>
                        <div className="video_suggetion_thumbnail">
                            <img src={video.thumbnail} className='video_suggetion_thumbnail_img' alt={video.title} />
                        </div>
                        <div className="video_suggetions_About">
                            <div className="video_suggetions_About_title">{video.title}</div>
                            <div className="video_suggetions_About_Profile">{video.channelName}</div>
                            <div className="video_suggetions_About_Profile">{video.views} . {video.posted}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <ToastContainer/>

        </div>
    )
}

export default Video
