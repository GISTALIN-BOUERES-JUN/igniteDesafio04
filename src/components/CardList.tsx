import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [imgUrl, setimgUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    onOpen();
    setimgUrl(url);
  }

  return (
    //Os cards devem ser renderizados em um grid de 3 colunas com um espaçamento de 40px
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {cards.map(card => (<Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        imgUrl={imgUrl}
        onClose={onClose}
      />
    </>
  );
}
