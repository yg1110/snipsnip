import { Module } from '@nestjs/common';

import { ToyIdeaController } from './toyidea.controller';
import { ToyIdeaService } from './toyidea.service';

@Module({
  imports: [],
  controllers: [ToyIdeaController],
  providers: [ToyIdeaService],
})
export class ToyIdeaModule {}
