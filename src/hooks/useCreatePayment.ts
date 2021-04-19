import { useState } from "react";
import { Card } from "../@Types";

export interface CreatePaymentData {
  cards: Card[];
  addNewCard: (newCard: Card) => void;
  handlePaymentModal: () => void;
  removerCard: (cardID: number) => void;
  isPaymentModalOpen: boolean;
}

const fake: Card[] = [
  {
    id: 1,
    expires: "22/30",
    flag: "Mastercard",
    owner: "Rodrigo da Silva Vieira",
  },
  {
    id: 2,
    expires: "22/30",
    flag: "Visa",
    owner: "Rodrigo da Silva Vieira",
  },
];

export function useCreatePayment(): CreatePaymentData {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([...fake]);

  function addNewCard(newCard: Card) {
    setCards([...cards, newCard]);
  }

  function handlePaymentModal() {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  }

  function removerCard(cardID: number) {
    const newCards = cards.filter((item) => item.id !== cardID);
    setCards(newCards);
  }

  return {
    cards,
    addNewCard,
    handlePaymentModal,
    isPaymentModalOpen,
    removerCard,
  };
}
