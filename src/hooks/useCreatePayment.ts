import { useState } from "react";

type Card = {
  flag: string;
  name: string;
  expriesOn: Date;
};

export interface CreatePaymentData {
  cards: Card[];
  addNewCard: (newCard: Card) => void;
  handlePaymentModal: () => void;
  isPaymentModalOpen: boolean;
}

export function useCreatePayment(): CreatePaymentData {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>();

  function addNewCard(newCard: Card) {
    setCards([...cards, newCard]);
  }

  function handlePaymentModal() {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  }

  return { cards, addNewCard, handlePaymentModal, isPaymentModalOpen };
}
