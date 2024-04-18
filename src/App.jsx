import { useState, useEffect } from 'react'
import { Container, Heading, Text, Box, Skeleton, SimpleGrid, Image } from '@chakra-ui/react'
import PhotoAlbum from "react-photo-album";


function App() {

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const skeletonConfig = ['red', 'orange', 'purple'];
  const skeletons = skeletonConfig.map(color => (
    <Skeleton w='100%' my='2' startColor={`${color}.200`} endColor={`${color}.500`} height='20px' />
  ));

  async function fetchCats(times = 1) {
    let catData = [];

    for (let i = 0; i < times; i++) {

      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const data = await response.json();
        catData = [...catData, ...data];
      } catch (error) {
        console.log(error);
        setError(true);
      }

    }
    return catData;
  }

  const handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLoading(true);
      setTimeout(async () => {
        const moreCats = await fetchCats(2);
        setCats((prev) => [...prev, ...moreCats]);
        setLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      const initCatData = await fetchCats(4);
      setCats(prev => [...prev, ...initCatData]);
    })();
    return () => { }
  }, []);

  return (
    <Container as='main' maxW={['container.sm', null, 'container.xl']} bg='purple.50' centerContent>
      <Heading
        as='h1'
        mt={6}
        size={['2xl', null, '4xl']}
        mb={3}
        bgClip='text'
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        textShadow='rgba(243,229,229,0.35) 0px -5px 0px'
        _before={{ content: "'🐈‍⬛'", display: 'inline-block', ml: '4px', padding: '5px', fontSize: '0.7em' }}
      >
        Infinite Cat Scroll
      </Heading>
      <Text as='cite' my={3} fontSize={['sm', null, 'md']} color='pink.700'>because sometimes all you want are more cats</Text>
      <Box as='section' w='100%'>
        <PhotoAlbum
          layout='masonry'
          photos={cats}
          renderPhoto={({ photo }) => (
            <Image
              key={photo.id}
              src={photo.url}
              alt='Image of a cat'
              objectFit='cover'
              m={1}
              boxShadow='base'
              borderRadius='lg'
            />
          )}
        />
        {loading && skeletons}
      </Box>
    </Container>
  )
}

export default App
