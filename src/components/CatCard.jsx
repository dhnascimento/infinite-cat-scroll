import { Card, CardBody, Image, Flex } from '@chakra-ui/react'


export default function CatCard({ catData }) {
    return (
        <Card align='center' justify='center'>
            <Flex align='center' justify='center'>
                <CardBody>
                    <Image src={catData.url} alt='Image of a cat' borderRadius='lg' />
                </CardBody>
            </Flex>
        </Card>
    )
}