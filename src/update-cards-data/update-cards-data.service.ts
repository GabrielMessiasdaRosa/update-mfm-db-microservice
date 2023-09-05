import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UpdateCardsDataService {
  constructor(private readonly prismaService: PrismaService) {}

  private cards = [];
  async processCardData(cards: any) {
    const totalCards = cards.length;
    let processedCards = 0;
    try {
      // using promise.all with
      const promises = cards.map(async (card) => {
        processedCards++;
        const percentage = (processedCards / totalCards) * 100;
        console.log(
          `Processing cards: %${percentage.toFixed(
            2,
          )} - ${processedCards}/${totalCards}`,
        );
        await this.prismaService.card.create({
          data: {
            ...card,
          },
        });
      });
      console.log('Cards injection started. This may take a while.');
      await Promise.all(promises);
      console.log('Cards injection completed.');
      console.log('Cards injection started. This may take a while.');
      return { message: 'Cards injected' };
    } catch (error) {
      console.error('Error injecting cards:', error);
      return { error: 'An error occurred while injecting cards' };
    }
  }

  async getCards() {
    return this.prismaService.card.findMany({
      take: 100,
    });
  }
}
