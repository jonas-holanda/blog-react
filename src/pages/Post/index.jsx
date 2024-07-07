import { useEffect, useState } from "react";

import { Grid, Typography, Button } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { useParams } from "react-router-dom";

import PostContent from "../../components/PostContent";
import Loading from "../../components/Loading";

export default function Post() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [postCreator, setPostCreator] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
        );
        const data = await response.json();
        
        setPost(data.blog);
        
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      
    };

    getPost();
    
  }, [id]);

  useEffect(() => {
    const getPostCreator = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/users/${post.user_id}`
        );
        const data = await response.json();
        setPostCreator(data.user);
       
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getPostCreator();
    
  }, [post])

  const getCredits = (post, postCreator) =>
    `${postCreator.first_name} ${postCreator.last_name}, ${formatPostDate(
      post.created_at
    )}`;

  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");
 
  return (
    <Grid container direction="column">
      <Grid item>
      <Button variant="outlined" startIcon={<ReplyIcon/>} href="/" sx={{margin: '20px 0',  borderRadius: '20px'}}>
        Voltar
      </Button>
        
      </Grid>
      {isLoading && <Loading />}
      {
        (post && postCreator) && <Grid item>
        <Typography variant="h3" mb={4}>
          {post.title}
        </Typography>
        <img width="100%" src={post.photo_url} alt={post.title} />
        <PostContent content={post.content_html} />
        <Typography>
          <strong>Criado por: </strong>
          {getCredits(post, postCreator)}
        </Typography>
      </Grid>
      }
      
    </Grid>
  );
}
