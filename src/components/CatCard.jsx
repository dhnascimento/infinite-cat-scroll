import { Card, CardBody, Image } from '@chakra-ui/react'


export default function CatCard({ catData }) {
    return (
        <Card>
            <CardBody>
                <Image src={catData.url} alt='Image of a cat' borderRadius='lg' />
            </CardBody>
        </Card>
    )
}