
const posts = (posts={Loading:false, error:false, allPosts:[], query:[], post:{}}, action)=>{
   switch (action.type) {
   case "LOADING_START":
   return {
   ...posts,
   Loading: true
   }
   case "LOADING_STOP":
   return {
   ...posts,
   Loading: false
   }
   case "CREATE_POST":
   return {
   ...posts,
   allPosts: [...posts.allPosts, action.payload]
   }
   case "GET_POSTS":
   return{
    ...posts,
    allPosts: action.payload
   } 
   case "GET_POST":
   return{
    ...posts,
    post: action.payload
   } 
   case "GET_QUERY":
   return{
    ...posts,
    query: action.payload
   } 
  
   case "UPDATE_POST":
   return {
   ...posts,
   allPosts: posts.allPosts.map((p)=> p._id === action.payload._id? action.payload : p)
   }
   case "DELETE_POST":
   return {
   ...posts,
   allPosts: posts.allPosts.filter((p)=> p._id !== action.payload)
   }
   case "ERROR":
   return {
   ...posts,
   error: action.payload
   }

   default:
   return posts
}
}

export default posts;