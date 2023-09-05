import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { UpdateCardsDataService } from './update-cards-data.service';
@Controller('update-cards')
export class UpdateCardsDataController {
  constructor(
    private readonly updateCardsDataService: UpdateCardsDataService,
  ) {}

  @Get('process')
  async processBulkData() {
    try {
      const url = 'http://localhost:3000/bulk-data/bulk-data.json';
      const response = await axios.get(url);
      const jsonData = response.data;

      const newData = jsonData.map(
        ({
          object,
          id,
          oracle_id,
          multiverse_ids,
          mtgo_id,
          mtgo_foil_id,
          tcgplayer_id,
          cardmarket_id,
          uri,
          set_search_uri,
          scryfall_uri,
          related_uris,
          purchase_uris,
          promo_types,
          preview,
          security_stamp,
          tcgplayer_etched_id,
          flavor_name,
          ...rest
        }) => {
          return {
            ...rest,
          };
        },
      );
      await this.updateCardsDataService.processCardData(newData);
      return { message: 'Everything is fine' };
    } catch (error) {
      console.error('Error processing bulk data:', error);
      return { error: 'An error occurred while processing bulk data' };
    }
  }

  @Get('cards')
  async getCards() {
    return this.updateCardsDataService.getCards();
  }
}
