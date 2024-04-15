import { useState, useEffect } from 'react'
import { Container, Heading, Text, Box, Skeleton, SimpleGrid } from '@chakra-ui/react'
import CatCard from './components/CatCard';


function App() {

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const skeletonConfig = ['red', 'orange', 'purple'];
  const skeletons = skeletonConfig.map(color => (
    <Skeleton w='100%' my='2' startColor={`${color}.200`} endColor={`${color}.500`} height='20px' />
  ));

  async function fetchCats() {

    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=8');
    const catData = await response.json();

    return catData;
  }

  const handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLoading(true);
      const moreCats = await fetchCats();

      setCats((prev) => [...prev, ...moreCats]);
      setLoading(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      const initCatData = await fetchCats();
      setCats(prev => [...prev, ...initCatData]);
    })();
    return () => { }
  }, []);

  return (
    <Container maxW={['container.sm', null, 'container.xl']} centerContent>
      <Heading mb={3}>Infinite Cat Scroll</Heading>
      <Text as='cite' fontSize='md'>because sometimes all you want are more cats</Text>
      <Box w='100%'>
        {<SimpleGrid columns={[2, null, 4]} spacing={12}>
          {cats.map((cat) => (
            <CatCard key={cat.id} catData={cat} />
          ))}
        </SimpleGrid>
        }
        {loading && skeletons}
      </Box>
    </Container>
  )
}

export default App
