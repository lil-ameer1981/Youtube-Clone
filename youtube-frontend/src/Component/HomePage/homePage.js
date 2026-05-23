import React, { useEffect, useState } from 'react'
import './homePage.css'
import { Link } from 'react-router-dom';
import demoVideos from '../../data/demoVideos';
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(demoVideos);
  }, [])

  const options = ["All", "MrBeast", "Football", "Gaming", "Comedy", "Tech", "Music", "Sports", "Science", "Live", "Podcasts", "Recently uploaded"];

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>

      <div className="homePage_options">
        {
          options.map((item, index) => {
            return (
              <div key={index} className="homePage_option">
                {item}
              </div>
            );
          })
        }
      </div>


      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>

        {
          data?.map((item, ind) => {
            return (
              <Link to={`/watch/${item.id}`} className="youtube_Video" key={item.id}>

                <div className="youtube_thumbnailBox">
                  <img src={item.thumbnail} className="youtube_thumbnailPic" alt={item.title} />
                  <div className="youtube_timingThumbnail">{item.duration}</div>
                </div>

                <div className="youtubeTitleBox">
                  <div className="youtubeTitleBoxProfile">
                    <img src={item.profilePic} className="youtube_thumbnail_Profile" alt={item.channelName} />
                  </div>

                  <div className="youtubeTitleBox_Title">
                    <div className="youtube_videoTitle">{item.title}</div>
                    <div className="youtube_channelName">{item.channelName}</div>
                    <div className="youtubeVideo_views">{item.views} . {item.posted}</div>
                  </div>
                </div>

              </Link>
            );
          })
        }







      </div>



    </div>
  )
}

export default HomePage
