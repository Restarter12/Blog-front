import React, { useState } from 'react';
import Sidebar from './components/sideBar/Sidebar';
import { Header } from './components/header/Header';
import Stories from './components/Stories/Stories';
import { Main } from './components/main/Main';
import "./styles/reset.css";
import rectangle from './img/Rectangle.jpg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostPage from './components/page/Page';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      title: "Как писать код быстро и безболезненно?",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.",
      createdAt: new Date().toLocaleString(),
      image: rectangle
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort]?.localeCompare(b[sort])));
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className='content'>
        <Sidebar />
        <div className="main-content">
          <Header
            onSearch={setSearchQuery}
            onSort={sortPosts}
            selectedSort={selectedSort}
          />
          <Stories />
          <Routes>
            <Route path="/" element={<Main posts={filteredPosts} setPosts={setPosts} />} />
            <Route
              path="/post/:id"
              element={<PostPage posts={posts} setPosts={setPosts} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;