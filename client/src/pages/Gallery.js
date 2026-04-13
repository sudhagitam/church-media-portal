import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(res => { setVideos(res.data.videos); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return React.createElement('p', {style: {textAlign: 'center', marginTop: '60px'}}, 'Loading videos...');
  }

  if (videos.length === 0) {
    return React.createElement('div', {style: {textAlign: 'center', marginTop: '80px'}},
      React.createElement('h3', null, 'No videos yet'),
      React.createElement('p', null, 'Login and upload your first sermon video')
    );
  }

  return React.createElement('div', {style: {padding: '32px'}},
    React.createElement('h2', {style: {marginBottom: '24px'}}, 'Sermon Gallery'),
    React.createElement('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}},
      videos.map(function(video) {
        return React.createElement('div', {key: video.id, style: {borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', background: 'white'}},
          React.createElement('div', {style: {background: '#1a237e', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center'}},
            React.createElement('span', {style: {fontSize: '24px', color: 'white'}}, 'Church Media')
          ),
          React.createElement('div', {style: {padding: '16px'}},
            React.createElement('h4', {style: {margin: '0 0 8px', fontSize: '14px'}}, video.name),
            React.createElement('p', {style: {margin: '0 0 12px', color: '#888', fontSize: '12px'}},
              new Date(video.createdTime).toLocaleDateString()
            ),
            React.createElement('a', {
              href: video.webViewLink,
              target: '_blank',
              rel: 'noreferrer',
              style: {display: 'inline-block', padding: '8px 16px', background: '#1a237e', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '13px'}
            }, 'Watch Video')
          )
        );
      })
    )
  );
}