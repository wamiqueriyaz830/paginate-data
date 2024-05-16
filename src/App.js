
import { useState,useEffect } from 'react';
import './App.css';

function App() {
   const [post,setPost]= useState([])
   const [loading,setLoading]=useState(false)

   const [currentPage,setCurrentPage]=useState(1)

   const postsPerPage=10

   const indexOfLastPost = currentPage*postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

   const handleNextPagination=()=>{
    const totalPages=Math.ceil(post.length/postsPerPage)
    if(currentPage<totalPages)
    setCurrentPage((prev)=>prev+1)
   }

   const handlePrevPagination=()=>{
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
   }

   const renderTable =async()=>{
    setLoading(true)
    const url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    try {
      const response=await fetch(url)
      const data=await response.json()
      console.log(data,"data")
      setPost(data)
    } catch (error) {
      console.log(error);
      alert("Failed to fetch :Please try later...")
    }
    setLoading(false)
   }
   
   useEffect(()=>{
    renderTable()
   },[])

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
     {loading && <h2>Loading...</h2>}
     <table>
     
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
        <tbody>
      {currentPosts.map((item)=>{
        const {id,name,email,role}=item
        return (
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            
          </tr>
        )
      })}
      </tbody>
      </table>
      <button  onClick={handlePrevPagination}>Previous</button>
      <button>{currentPage}</button>
      <button onClick={handleNextPagination}>Next</button>
    </div>
  );
}

export default App;
