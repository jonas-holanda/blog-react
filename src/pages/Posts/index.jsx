import { useEffect, useState } from "react";

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import ReplyIcon from '@mui/icons-material/Reply';
import RedoIcon from '@mui/icons-material/Redo';

import Loading from "../../components/Loading";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [postsTotal, setPostsTotal] = useState(0);
  const [offsetInput, setOffsetInput] = useState("");

  useEffect(() => {

    const getPosts = async () => {
      try {
        const response = await fetch(
          "https://api.slingacademy.com/v1/sample-data/blog-posts"
        );
        const data = await response.json();
        setPostsTotal(data.total_blogs);
        setPosts(data.blogs);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getPosts();
    
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/blog-posts?offset=${offset}`
        );
        const data = await response.json();
        setPosts(data.blogs);
        setIsLoading(false);
        setOffsetInput("");
      } catch (error) {
        setIsLoading(false);
      }
    };

    getPosts();

  }, [offset]);
  
  const getViewPostRoute = (post) => `/${post.id}/${encodeURI(post.title)}`;

  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  const nextBlogPage = () => {
    setIsLoading(true);
    setOffset((oldOffset) => oldOffset + 10);
  }

  const prevBlogPage = () => {
    setIsLoading(true);
    setOffset((oldOffset) => oldOffset - 10);
  }

  const handleChange = (event) => {
    const {value} = event.target;
    
    if ((!Number(value)) || value > 1000 || value < 0) {
      setOffsetInput(value);
      return;
    } else {
      setOffsetInput(value);
      setOffset(Number(value)-1);
    }
  }

  return (
    <Grid container rowGap={2} direction={"column"}>
      <Grid item>
        <Typography variant="h4">Publicações</Typography>
      </Grid>
      { isLoading ? <Loading /> :
      <>
        <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <CardActionArea component="a" href={getViewPostRoute(post)}>
              <Card sx={{ justifyContent: 'center', alignItems: 'center', maxWidth: '100%', maxHeight: '400px', height: '350px' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.photo_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {formatPostDate(post.created_at)}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue lendo...
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
        </Grid>
      
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
          <Button variant="outlined" startIcon={<ReplyIcon/>} onClick={prevBlogPage} size="small" sx={{margin: '20px 0', textAlign: 'center', borderRadius: '20px'}} disabled={offset <= 0}>
            Página Anterior
          </Button>
          <TextField id="standard-basic" label={"N° do Post: máx "+postsTotal } variant="standard" onChange={handleChange} value={offsetInput} sx={{margin: 'auto', textAlign: 'center', }}/>
          <Button variant="outlined" startIcon={<RedoIcon/>} onClick={nextBlogPage} size="small" sx={{margin: '20px 0', textAlign: 'center',  borderRadius: '20px'}} disabled={offset >= postsTotal-5}>
            Próxima Página
          </Button>
        </Box>
        </>
        }
    </Grid>
  );
}
