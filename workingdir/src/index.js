import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import YtSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
import _ from 'lodash';

const API_KEY='AIzaSyDsUGqa3jllnU2ESKa2wL3-R79NY9J4eEE';

class App extends Component
{

  constructor(props)
  {
    super(props);

    this.state = 
    { 
      videos:[],
      selectedVideo:null 
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term)
  {
    YtSearch({key: API_KEY, term:term}, (videos)=>{
      this.setState(
      {
        videos:videos,
        selectedVideo: videos[0]
      });
    });
  }

  render()
  {
     const videoSearch = _.debounce((term)=>
    {
      this.videoSearch(term)
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
          videos={this.state.videos}/>
     </div>
    );
  }
}

ReactDom.render(<App/>, document.querySelector('.container'));