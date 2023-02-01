// == Import
import { fetchPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PostCard from './PostCard';
import banner from '../../assets/img/background/starry-sky.jpg'
import './posts.scss';

// == Composant
function Posts() {


  const { listPosts } = useSelector((state) => state.posts);
  
  return (
    <>
      <div className="posts__banner-container">
        <h2 className="posts__title">Quoi de neuf dans le ciel?</h2>
        <img className="posts__banner" src={banner} />
      </div>
      <section className="posts">

          {
          listPosts.map((posts) => (
              <PostCard {...posts} key={posts.id} />
            ))
          }
        
      </section>
    </>
  );
}

// == Export
export default Posts;

